import React, { useEffect } from 'react';
import { useAppSelector, useDispatch } from '../../store/store';
import styles from './Sidebar.module.css';
import docIcon from '../../assets/icon-document.svg';
import { readDocument, selectDocument, createDocument, toggleTheme } from '../../store/markdownSlice';
import { EMPTY_STRING } from '../../constants/shared';

const SvgIconDark = ( { theme }: { theme: string } ) => (
  <svg
    width="18"
    height="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.141 8.804a.823.823 0 0 0-.864-.115 6.622 6.622 0 0 1-2.772.6A6.704 6.704 0 0 1 5.81 2.626 7.066 7.066 0 0 1 6.015.981a.823.823 0 0 0-1.094-.93 8.341 8.341 0 1 0 11.516 9.617.823.823 0 0 0-.296-.864Zm-7.814 5.503A6.696 6.696 0 0 1 4.164 2.404v.222a8.35 8.35 0 0 0 10.069 8.16 6.671 6.671 0 0 1-5.906 3.554v-.033Z"
      fill={theme === 'dark' ? '#fff' : '#5a6069'}
    />
  </svg>
)

const SvgIconLight = ( { theme }: { theme: string } ) => (
  <svg
    width="18"
    height="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.7 9a.9.9 0 0 0-.9-.9H.9a.9.9 0 0 0 0 1.8h.9a.9.9 0 0 0 .9-.9Zm.576 4.5-.639.639a.9.9 0 0 0 0 1.269.9.9 0 0 0 1.269 0l.639-.639A.9.9 0 0 0 3.276 13.5ZM9 2.7a.9.9 0 0 0 .9-.9V.9a.9.9 0 0 0-1.8 0v.9a.9.9 0 0 0 .9.9Zm5.094 2.106a.9.9 0 0 0 .63-.261l.639-.639a.9.9 0 1 0-1.269-1.269l-.594.639a.9.9 0 0 0 0 1.269.9.9 0 0 0 .594.261Zm-10.8-.261a.9.9 0 0 0 1.269 0 .9.9 0 0 0 0-1.269l-.639-.639a.904.904 0 1 0-1.287 1.269l.657.639ZM17.1 8.1h-.9a.9.9 0 1 0 0 1.8h.9a.9.9 0 1 0 0-1.8Zm-2.376 5.4a.9.9 0 0 0-1.224 1.224l.639.639a.9.9 0 0 0 1.269 0 .9.9 0 0 0 0-1.269l-.684-.594ZM9 4.05A4.95 4.95 0 1 0 13.95 9 4.959 4.959 0 0 0 9 4.05Zm0 8.1a3.15 3.15 0 1 1 0-6.3 3.15 3.15 0 0 1 0 6.3Zm0 3.15a.9.9 0 0 0-.9.9v.9a.9.9 0 1 0 1.8 0v-.9a.9.9 0 0 0-.9-.9Z"
      fill={theme === 'dark' ? '#5a6069' : '#fff'}
    />
  </svg>
)
export const Sidebar = () => {

  const dispatch = useDispatch();
  const { sidebarOpen } = useAppSelector(( state ) => state.sidebar);
  const { documents, theme } = useAppSelector(( state ) => state.markdown);


  useEffect(() => {
    if (sidebarOpen) {
      console.log('Sidebar rendered');
      dispatch(readDocument());
    }
  }, [dispatch, sidebarOpen]);

  const handleDocClick = ( id: string ) => () => {
    console.log('clicked');
    console.log(id);
    dispatch(selectDocument(id));
  }

  const onCreateHandler = () => {
    dispatch(createDocument());
  }

  const onThemeToggleHandler = () => {
    dispatch(toggleTheme());
  }

  return (
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : EMPTY_STRING}`}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Markdown</h1>
          <h2 className={styles.header}>My Documents</h2>
          <button
            className={styles.button}
            onClick={onCreateHandler}
          >
            <span>+</span>
            New Document
          </button>
          {documents.length > 0 && (
            <ul className={styles.documentList}>
              {documents.map(( doc ) => (
                <li
                  key={doc.id}
                  className={styles.listItem}
                  onClick={handleDocClick(doc.id)}
                >
                  <img
                    className={styles.icon}
                    src={docIcon}
                    alt="document icon"
                  />
                  <div className={styles.documentInfo}>
                    <p className={styles.documentDate}>{doc.createdAt}</p>
                    <h3 className={styles.documentTitle}>{doc.name}</h3>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.toggleWrapper}>
          <SvgIconDark theme={theme} />
          <label className={styles.themeToggle}>
            <input
              type="checkbox"
              checked={theme === 'light'}
              onChange={onThemeToggleHandler}
            />
            <span className={styles.themeToggleSlider}></span>
          </label>
          <SvgIconLight theme={theme} />
        </div>
      </div>
    </aside>
  );
};

