import React from 'react';
import type { FC } from 'react';
import { marked } from 'marked';
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import styles from './MarkdownPreview.module.css';
import commonStyles from '../common.module.css';

interface MarkdownPreviewProps {}

export const MarkdownPreview: FC<MarkdownPreviewProps> = ( props ) => {

  const markdown = useSelector(( state: RootState ) => state.markdown.content);
  const html = (marked as any)(markdown);


  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.title}>
        <h1>Preview</h1>
      </div>
      <div
      className={styles.textPreview}
        dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
