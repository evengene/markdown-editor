import React, { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setText } from '../../store/markdownSlice';
import commonStyles from './MarkdownInput.module.css';
import styles from '../common.module.css';
import { RootState } from '../../store/store';

export const MarkdownInput: FC = () => {
  const dispatch = useDispatch();
  const { content, theme } = useSelector(( state: RootState ) => state.markdown);

  const onTextAreaChange = ( event: ChangeEvent<HTMLTextAreaElement> ) => {
    dispatch(setText(event.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.title} ${theme === 'light' ? styles.titleLight : styles.title}`}>
        <h1>Markdown</h1>
      </div>
      <textarea
        className={commonStyles.textarea}
        onChange={onTextAreaChange}
        value={content}
      >
    </textarea>
    </div>
  );
};
