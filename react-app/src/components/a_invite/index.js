import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './invites.css';
import { addUser, getOneProject } from '../../store/project';

function Invites() {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = +window.location.href.split('/')[4]

  useEffect(() => {
    dispatch(getOneProject(id));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);
  const project = useSelector(state => state.project[id]);

  //for Strangers
  //for Logged In

  const handleStranger = () => { console.log('wow') }
  const handleLoggedIn = (e) => {
    e.stopPropagation();
    let response = e.target.value;
    
    if (response == 'yes') {
      dispatch(addUser([sessionUser.id, id]));
      history.push(`/projects/${id}`)
    } else {
      history.push('/');
    }
  }

  if (sessionUser) {
    return (
      <div id="invite-page-a">
        <h2>You've been invited to</h2>
        <h3 className='project-name-wow'>{project?.name}</h3>
        <p>Would you like to accept?</p>
        <span>
          <button className='action-button' value='yes' onClick={handleLoggedIn}>YES</button>
          <button className='action-button' value='no' onClick={handleLoggedIn}>NO</button>
        </span>
      </div>
    )
  }

  return (
    <div id="invite-page-b">
      You've been Invited to ...

      Please Login or SignUp to Join!
    </div>
  );
}

export default Invites;