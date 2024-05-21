import React from 'react';
import type { FC } from 'react';
import { useAppSelector, useDispatch } from '../../store/store';
import { deleteDocument, resetDocument, toggleModal  } from '../../store/markdownSlice';
import styles from './DeleteConfirmationModal.module.css'


export const DeleteConfirmationModal = () => {
  const dispatch = useDispatch();
  const { id, name = '', content, confirmDeleteOpen} = useAppSelector(( state ) => state.markdown);

  const onCloseModal = () => {
    dispatch(toggleModal())
  }
  const onConfirmDeleteHandler = () => {
    if (!id && !content && !name) {
      return;
    }
    dispatch(deleteDocument({ id, name }));
    dispatch(resetDocument());
    dispatch(toggleModal());
  }

  if (!confirmDeleteOpen) {
    return null;
  }

  const documentTitle = `'${name}' document` || 'document';

  return (
    <div className={styles.modal} id="deleteConfirmationModal" tabIndex={-1} aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
      <div className={styles.modalDialog}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h5 className={styles.modalTitle} id="deleteConfirmationModalLabel">Delete this document?</h5>
            <button type="button" className={styles.closeButton} data-bs-dismiss="modal" aria-label="Close" onClick={onCloseModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className={styles.modalBody}>
            Are you sure you want to delete the {documentTitle} and its contents? This action cannot be reversed.
          </div>
          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.confirmButton}
              onClick={onConfirmDeleteHandler}
            >
              Confirm & Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
