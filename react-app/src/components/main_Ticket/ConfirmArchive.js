import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './ticket.css';

function ConfirmArchive({red, id, action}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const handleConfirm = async () => {
    await dispatch(action(id));
    history.push(red);
    closeModal();
  }

  return (
    <div className='confirm-delete'>
      <p>Are you sure?</p>
      <span>
        <button className='action-button' onClick={handleConfirm}>yes</button>
        <button className='action-button' onClick={closeModal}>no</button>
      </span>
    </div>
  )
}

export default ConfirmArchive;