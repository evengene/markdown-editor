import React from 'react';
import styles from './Wrapper.module.css';
import { RootState, useAppSelector } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { MarkdownInput } from '../MarkdownInput/MarkdownInput';
import { MarkdownPreview } from '../MarkdownPreview/MarkdownPreview';
import { useIsMobile } from '../../hooks/useIsMobile';
import Image from 'next/image';
import previewIcon from '../../assets/icon-show-preview.svg';
import previewIconHide from '../../assets/icon-hide-preview.svg';
import { togglePagePreview } from '../../store/markdownSlice';

export const Wrapper = () => {

  const dispatch = useDispatch();

  const { sidebarOpen } = useAppSelector((state) => state.sidebar);
  const { theme, showPagePreview } = useSelector((state: RootState) => state.markdown);
  const { isMobile } = useIsMobile();

  const onPreviewClick = () => {
    dispatch(togglePagePreview());
  }

  const eyeIcon = showPagePreview ? previewIconHide : previewIcon;

  const renderPreview = () => {
    if (showPagePreview) {
      return <MarkdownPreview/>;
    } else if (isMobile) {
      return null;
    } else {
      return <MarkdownInput/>;
    }
  }

  return (
    <div
      className={`${styles.wrapper} ${theme === 'light' && styles.wrapperLight} ${sidebarOpen && styles.sidebarOpen}`}>
      {!showPagePreview && <MarkdownInput/>}
      {renderPreview()}

      {(!isMobile || (!sidebarOpen && isMobile)) && (
        <Image src={eyeIcon} alt="preview" className={styles.icon} onClick={onPreviewClick}/>
      )}


    </div>
  );
}
