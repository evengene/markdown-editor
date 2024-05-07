import React from 'react';
import styles from './Wrapper.module.css';
import { useAppSelector } from '../../store/store';
import { EMPTY_STRING } from '../../constants/shared';

export const Wrapper = (props: { children: React.ReactNode }) => {
  const { sidebarOpen } = useAppSelector((state) => state.sidebar);
  return <div className={`${styles.wrapper} ${sidebarOpen ? styles.sidebarOpen : EMPTY_STRING}`}>{props.children}</div>;
}