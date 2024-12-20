import React from 'react';
import { useDispatch } from 'react-redux';
import './userOpts.css';
import OpenModalButton from '../OpenModalButton';
import EditProjectForm from '../main_Project/editProject';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ConfirmDelete({id, action}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const handleConfirm = async () => {
    await dispatch(action(id));
    history.push("/");
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

function UserOptions({ item_id, action }) {
  return (
    <div className="user-options">
      <OpenModalButton
        buttonText="Edit"
        modalComponent={<EditProjectForm id={item_id} action={action} />}
      />
      <OpenModalButton
        buttonText="Delete"
        modalComponent={<ConfirmDelete id={item_id} action={action} />}
      />
    </div>
  );
}

export default UserOptions;