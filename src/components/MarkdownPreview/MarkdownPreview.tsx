import React from 'react';
import type { FC } from 'react';
import { marked } from 'marked';
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import commonStyles from './MarkdownPreview.module.css';
import styles from '../common.module.css';

interface MarkdownPreviewProps {}

export const MarkdownPreview: FC<MarkdownPreviewProps> = ( props ) => {

  const { theme, content = "" } = useSelector(( state: RootState ) => state.markdown);
  const html = (marked as any)(content);

  return (
    <div className={`${styles.container} ${theme === 'light' ? styles.containerLight : styles.container}`}>
      <div className={`${styles.title} ${theme === 'light' ? styles.titleLight : styles.title}`}>
        <h1>Preview</h1>
      </div>
      <div
        className={`${commonStyles.textPreview} ${theme === 'light' ? commonStyles.textPreviewLight : commonStyles.textPreview}`}
        dangerouslySetInnerHTML={{ __html: html }}/>
    </div>
  );
}
