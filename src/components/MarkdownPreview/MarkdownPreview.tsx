import React from 'react';
import type { FC } from 'react';
import { marked } from 'marked';
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import commonStyles from './MarkdownPreview.module.css';
import styles from '../common.module.css';

interface MarkdownPreviewProps {}

export const MarkdownPreview: FC<MarkdownPreviewProps> = ( props ) => {

  const { theme } = useSelector(( state: RootState ) => state.markdown);
  const markdown = useSelector(( state: RootState ) => state.markdown.content);
  const html = (marked as any)(markdown);


  return (
    <div className={styles.container}>
      <div className={`${styles.title} ${theme === 'light' ? styles.titleLight : styles.title}`}>
        <h1>Preview</h1>
      </div>
      <div
        className={commonStyles.textPreview}
        dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
