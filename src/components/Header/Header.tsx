import React, { ChangeEvent, useEffect } from 'react';
import Image from "next/image";

import styles from './Header.module.css';
import { toggleSidebar } from '../../store/sideBarSlice';
import { useAppSelector, useDispatch } from '../../store/store';
import burgerIcon from '../../assets/icon-menu.svg';
import closeIcon from '../../assets/icon-close.svg';
import logo from '../../assets/logo.svg';
import docIcon from '../../assets/icon-document.svg';
import deleteIcon from '../../assets/icon-delete.svg';
import saveIcon from '../../assets/icon-save.svg';
import {
  updateDocument,
  setDocTitle,
  createDocument,
  resetDocument,
  saveDocument,
  setId,
  toggleModal
} from '../../store/markdownSlice';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_DOCUMENT_NAME, EMPTY_STRING } from '../../constants/shared';
import { useIsTablet } from "../../hooks/useIsTablet";
import { useIsMobile } from '../../hooks/useIsMobile';

const BurgerMenuIcon = ({isMobile}: {isMobile: boolean}) => (
  <svg
    width={isMobile ? '23' : '30'}
    height="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#FFF" fill-rule="evenodd">
      <path d="M0 0h30v2H0zM0 8h30v2H0zM0 16h30v2H0z"/>
    </g>
  </svg>);

export const Header = () => {

  const dispatch = useDispatch();
  const { sidebarOpen } = useAppSelector((state) => state.sidebar);
  const { status } = useAppSelector((state) => state.markdown);
  const { id, name, content, } = useAppSelector((state) => state.markdown);
  const { isTablet } = useIsTablet();
  const { isMobile } = useIsMobile();
  const handleSave = () => {
    if (id === 0) {
      const newId = uuidv4();
      dispatch(saveDocument({ id: newId, name: name || DEFAULT_DOCUMENT_NAME, content: content || '' }));
      dispatch(setId(newId));
      return;
    }
    if (!id) {
      dispatch(createDocument());
      dispatch(resetDocument());
      return;
    } else {
      dispatch(updateDocument({ id, name, content }));
      localStorage.setItem('title', name);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(dispatch(setDocTitle(e.target.value)));
    console.log(e.target.value);
  }

  const onDeleteHandler = () => {
    if (!id && !content) {
      return;
    }
    dispatch(toggleModal());
  }

  // useEffect(() => {
  //   dispatch(readDocument());
  // }, [dispatch]);

  const renderButtonContent = () => {
    switch (status) {
      case 'pending':
        return <><Image
          src={saveIcon}
          alt="saving"
        />Saving...</>;
      case 'fulfilled':
        return <><Image
          src={saveIcon}
          alt="save"
        />Saved!</>;
      case 'rejected':
        return <><Image
          src={saveIcon}
          alt="error"
        />Error saving</>;
      default:
        return <><Image
          src={saveIcon}
          alt="save"
        />Save Changes</>;
    }
  }

  return (
    <header className={`${styles.header} ${sidebarOpen ? styles.headerWithSidebarOpen : EMPTY_STRING}`}>
      <div className={styles.row}>
        <div className={styles.menu}>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className={styles.burger}
          >
            <BurgerMenuIcon isMobile={isMobile}/>
          </button>
        </div>

        {!isTablet && (
          <>
            <Image
              src={logo}
              alt="Markdown Editor"
            />
            <span className={styles.divider}/>
          </>
        )}

        { (  !isMobile || (!sidebarOpen && isMobile)) && (
        <div className={styles.listItem}>
          <Image
            className={styles.icon}
            src={docIcon}
            alt="document icon"
          />
          <div className={styles.documentInfo}>
            <p className={styles.documentDate}>Document Name</p>
            <input
              className={styles.titleInput}
              type="text"
              value={name}
              onChange={onInputChange}
            />
          </div>
        </div>
        )}
      </div>
      {!sidebarOpen &&
        <div className={styles.row}>
          <button
            className={styles.deleteBtn}
            onClick={() => onDeleteHandler()}
          >
            <Image
              src={deleteIcon}
              alt="delete"
            />
          </button>
          {isMobile
            ? (
              <button
                className={styles.saveButtonMobile}
                onClick={handleSave}
              >
                <Image
                  src={saveIcon}
                  alt="saving"
                />
              </button>
            )
            :
            (
              <button
                className={styles.saveButton}
                onClick={handleSave}
              >
                {renderButtonContent()}
              </button>
            )}
        </div>
      }
    </header>
  );
};
