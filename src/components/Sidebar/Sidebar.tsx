import React, { useEffect } from 'react';
import { useAppSelector, useDispatch } from '../../store/store';
import styles from './Sidebar.module.css';
import docIcon from '../../assets/icon-document.svg';
import { readDocument, selectDocument, createDocument } from "../../store/markdownSlice";

export const Sidebar = () => {

  const dispatch = useDispatch();
  const { sidebarOpen } = useAppSelector(( state ) => state.sidebar);
  const { documents } = useAppSelector(( state ) => state.markdown);


  useEffect(() => {
    if (sidebarOpen) {
      console.log('Sidebar rendered');
      dispatch(readDocument());
    }
  }, [sidebarOpen]);

  const handleDocClick = ( id: string ) => () => {
    console.log('clicked');
    console.log(id);
    dispatch(selectDocument(id));
  }

  const onCreateHandler = () => {
    dispatch(createDocument());
  }

  return (
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Markdown</h1>
        <h2 className={styles.header}>My Documents</h2>
        <button className={styles.button} onClick={onCreateHandler}>
          <span>+</span>
          New Document
        </button>
        {documents.length > 0 && (
          <ul className={styles.documentList}>
            {documents.map(( doc ) => (
              <li key={doc.id} className={styles.listItem} onClick={handleDocClick(doc.id)}>
                <img className={styles.icon} src={docIcon} alt="document icon" />
                <div className={styles.documentInfo}>
                  <p className={styles.documentDate}>{doc.createdAt}</p>
                  <h3 className={styles.documentTitle}>{doc.name}</h3>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

