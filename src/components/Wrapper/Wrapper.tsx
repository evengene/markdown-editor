import React from 'react';
import styles from './Wrapper.module.css';
import { RootState, useAppSelector } from '../../store/store';
import { useSelector } from 'react-redux';
import { MarkdownInput } from '../MarkdownInput/MarkdownInput';
import { MarkdownPreview } from '../MarkdownPreview/MarkdownPreview';

export const Wrapper = () => {

  const { sidebarOpen } = useAppSelector(( state ) => state.sidebar);
  const { theme} = useSelector(( state: RootState ) => state.markdown);
  return (
    <div className={`${styles.wrapper} ${theme === 'light' && styles.wrapperLight} ${sidebarOpen && styles.sidebarOpen}`}>
      <MarkdownInput />
      <MarkdownPreview />
    </div>
  );
}
