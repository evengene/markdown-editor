import React, { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setText } from '../../store/markdownSlice';
import styles from './MarkdownInput.module.css';
import commonStyles from '../common.module.css';
import { RootState } from '../../store/store';

export const MarkdownInput: FC = () => {
  const dispatch = useDispatch();
  const { content } = useSelector((state: RootState) => state.markdown);

  // const savedText = useMemo(() => localStorage.getItem('content') || '', []);

  const onTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setText(event.target.value));
    // localStorage.setItem('content', event.target.value);
  };

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.title}>
        <h1>Markdown</h1>
      </div>
      <textarea className={styles.textarea} onChange={onTextAreaChange} value={content}>
      {/*{text || savedText}*/}
    </textarea>
    </div>
  );
};