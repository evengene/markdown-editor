import React from 'react';
import type { FC } from 'react';
import { marked } from 'marked';
import { RootState, useDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import commonStyles from './MarkdownPreview.module.css';
import styles from '../common.module.css';
import Image from "next/image";
import previewIcon from "../../assets/icon-show-preview.svg";
import { togglePagePreview } from "../../store/markdownSlice";

interface MarkdownPreviewProps {}

export const MarkdownPreview: FC<MarkdownPreviewProps> = ( props ) => {

  const dispatch = useDispatch();

  const { theme, content = "" } = useSelector(( state: RootState ) => state.markdown);
  const html = (marked as any)(content);

  const onPreviewClick = () => {
    dispatch(togglePagePreview());
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.title} ${theme === 'light' ? styles.titleLight : styles.title}`}>
        <h1>Preview</h1>
        <Image src={previewIcon} alt="preview" className={styles.icon} onClick={onPreviewClick} />
      </div>
      <div
        className={commonStyles.textPreview}
        dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
