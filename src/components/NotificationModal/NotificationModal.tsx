import React from 'react';
import { useAppSelector, useDispatch } from '../../store/store';
import { toggleNotificationModal } from '../../store/markdownSlice';
import styles from './NotificationModal.module.css'


export const NotificationModal = () => {
  const dispatch = useDispatch();
  const { notificationModalOpen } = useAppSelector(( state ) => state.markdown);

  const onConfirmHandler = () => {
    dispatch(toggleNotificationModal())

  }

  if (!notificationModalOpen) {
    return null;
  }

  return (
    <div
      className={styles.modal}
      id="deleteConfirmationModal"
      aria-hidden="true"
    >
      <div className={styles.modalDialog}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h5 className={styles.modalTitle}>
              Max amount of documents exceeded
            </h5>
          </div>
          <div className={styles.modalBody}>
            You are currently in explore mode, which allows you to create only up to 5 documents.
          </div>
          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.confirmButton}
              onClick={onConfirmHandler}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
