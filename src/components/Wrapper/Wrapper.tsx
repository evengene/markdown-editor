import React from 'react';
import styles from './Wrapper.module.css';
import { useAppSelector, useDispatch } from '../../store/store';
import { EMPTY_STRING } from '../../constants/shared';
import Image from "next/image";
import previewIcon from '../../assets/icon-show-preview.svg';
import { togglePagePreview } from "../../store/markdownSlice";

export const Wrapper = (props: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const { sidebarOpen } = useAppSelector(( state ) => state.sidebar);

  const onPreviewClick = () => {
    dispatch(togglePagePreview());
  }
  return (
    <div className={`${styles.wrapper} ${sidebarOpen ? styles.sidebarOpen : EMPTY_STRING}`}>
      <Image src={previewIcon} alt="preview" className={styles.previewIcon} onClick={onPreviewClick} />
      {props.children}
    </div>
  );
}
