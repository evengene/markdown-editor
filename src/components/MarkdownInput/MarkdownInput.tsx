import React, { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setText } from '../../store/markdownSlice';
import styles from './MarkdownInput.module.css';
import commonStyles from '../common.module.css';
import { RootState } from '../../store/store';

export const MarkdownInput: FC = () => {
  const dispatch = useDispatch();
  const { content, theme, showPagePreview } = useSelector((state: RootState) => state.markdown);

  const onTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setText(event.target.value));
  };

  if (showPagePreview) {
    return null;
  }

  return (
    <div className={`${commonStyles.container} ${styles.inputContainer} 
    ${theme === 'light' && styles.inputContainerLight}
    `}>
      <div className={`${commonStyles.title} ${theme === 'light' && commonStyles.titleLight}`}>
        <h1>Markdown</h1>
      </div>
      <textarea
        className={`${styles.textarea} ${theme === 'light' && styles.textareaLight}`}
        onChange={onTextAreaChange}
        value={content}
      >
    </textarea>
    </div>
  );
};
