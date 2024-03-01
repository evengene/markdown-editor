import React from 'react';
import styles from './Wrapper.module.css';
import { useAppSelector } from "../../store/store";
export const Wrapper = (props: { children: React.ReactNode }) => {
  const { sidebarOpen } = useAppSelector(( state ) => state.sidebar);
  return <div className={`${styles.wrapper} ${sidebarOpen ? styles.sidebarOpen : ''}`}>{props.children}</div>;
}