import React, { ChangeEvent, useEffect, useMemo } from 'react';
import styles from './Header.module.css';
import { toggleSidebar } from "../../store/sideBarSlice";
import { useAppSelector, useDispatch } from "../../store/store";
import burgerIcon from '../../assets/icon-menu.svg';
import closeIcon from '../../assets/icon-close.svg';
import logo from '../../assets/logo.svg';
import docIcon from "../../assets/icon-document.svg";
import deleteIcon from "../../assets/icon-delete.svg";
import saveIcon from "../../assets/icon-save.svg";
import {
  deleteDocument,
  updateDocument,
  setDocTitle,
  createDocument,
  resetDocument,
  saveDocument, readDocument, setId
} from "../../store/markdownSlice";
import { v4 as uuidv4 } from "uuid";


export const Header = () => {

  const dispatch = useDispatch();
  const { sidebarOpen } = useAppSelector(( state ) => state.sidebar);
  const { status } = useAppSelector(( state ) => state.markdown);
  const { id, name, content,  } = useAppSelector(( state ) => state.markdown);

  const handleSave = () => {
    debugger;
    if (id === 0) {
      const newId = uuidv4();
      dispatch(saveDocument({ id: newId, name, content: content || "" }));
      dispatch(setId(newId));
      return;
    }
    if(!id) {
      dispatch(createDocument());
      dispatch(resetDocument());
      return;
    } else {
      dispatch(updateDocument({ id, name, content }));
      localStorage.setItem('title', name);
    }
  };

  const savedTitle = useMemo(() => localStorage.getItem('title') || '', []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(dispatch(setDocTitle(e.target.value)));
    console.log(e.target.value);
  }

  const onDeleteHandler = () => {
    debugger;
    if (!id && !content) {
      return;
    }
    dispatch(deleteDocument({ id, name }));
    dispatch(resetDocument());
  }

  useEffect(() => {
    dispatch(readDocument());
  }, []);

  const renderButtonContent = () => {
    switch (status) {
      case 'pending':
        return <><img src={saveIcon} alt="saving" />Saving...</>;
      case 'fulfilled':
        return <><img src={saveIcon} alt="save" />Saved!</>;
      case 'rejected':
        return <><img src={saveIcon} alt="error" />Error saving</>;
      default:
        return <><img src={saveIcon} alt="save" />Save Changes</>;
    }
  }

  return (
    <header className={`${styles.header} ${sidebarOpen ? styles.headerWithSidebarOpen : ''}`}>
      <div className={styles.row}>
        <div className={styles.menu}>
          <button onClick={() => dispatch(toggleSidebar())} className={styles.burger}>
            <img src={sidebarOpen ? closeIcon : burgerIcon} alt="menu" />
          </button>
        </div>
        <img src={logo} alt="Markdown Editor" />
        <span className={styles.divider} />
        <div className={styles.listItem}>
          <img className={styles.icon} src={docIcon} alt="document icon" />
          <div className={styles.documentInfo}>
            <p className={styles.documentDate}>Document Name</p>
            <input className={styles.titleInput} type="text" value={name} onChange={onInputChange} />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <button className={styles.deleteBtn} onClick={()=> onDeleteHandler()}>
          <img src={deleteIcon} alt="delete" />
        </button>
        <button className={styles.saveButton} onClick={handleSave}>
          {renderButtonContent()}
        </button>
      </div>
    </header>
  );
};