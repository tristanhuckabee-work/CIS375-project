import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, getOneProject } from '../../store/project';
import './project.css';
import UserOptions from '../a_userOptions';

function ProjectPage() {
  const dispatch = useDispatch();
  const id = +window.location.href.split('/')[4]

  useEffect(() => {
    if (sessionUser) {
      dispatch(getOneProject(id));
    }
  }, [dispatch])

  const sessionUser = useSelector(state => state.session.user);
  const project = useSelector(state => state.project[id]);

  const formatUsers = () => {
    return project?.users.map(u => {
      let userClasses = "user-side-card "
      if (project?.creator_id === sessionUser.id) {
        userClasses += "creator "
      }
      if (u.id === sessionUser.id) {
        userClasses += "currUser"
      }

      return (
        <div className={`${userClasses}`} key={`user${u.id}`}>
          <p>{`${u.first_name} ${u.last_name}`}</p>
        </div>
      );
    })
  }
  

  return (
    <section id="project-page">
      <div id="project-deets">
        <h2>{project?.name}</h2>
        <p>{project?.description}</p>
        {sessionUser.id === project?.creator_id && <UserOptions item_id={project.id} action={deleteProject}/>}
        TICKET LIST HERE
      </div>
      <div id="project-users">
        <span>
          <h2>Users</h2>
          <button className="action-button">Add User</button>
        </span>
        {formatUsers()}
      </div>
    </section>
  );
}

export default ProjectPage;