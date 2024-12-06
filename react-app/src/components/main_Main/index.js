import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjectsById } from '../../store/project';
import { reset_tickets } from '../../store/ticket';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from '../OpenModalButton';
import NewProjectForm from '../form_newProject';
import './main.css';

function Main() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const projects = useSelector(state => state.project);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getAllProjectsById(sessionUser.id));
      dispatch(reset_tickets())
    }
  }, [dispatch])

  const handleProjectClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let click_id = e.target.classList[e.target.classList.length - 1];

    if (sessionUser) {
      history.push({ pathname: `/projects/${click_id}` })
    }
  }
  const formatProjects = () => {
    let res = [];
    for (let i in projects) {
      let project = projects[i]
      const [_d, d, m, y, _t, _z] = project.updated_at.split(' ');

      res.push(
        <div
          className={`project-card ${project.id}`}
          key={`${project.id}`}
          onClick={handleProjectClick}
        >
          <span className={`${project.id}`}>
            <h3 className={`${project.id}`}>{project.name}</h3>
            <p className={`pc-desc ${project.id}`}>{project.description}</p>
          </span>
          <p className={`pc-date ${project.id}`}>{`Last Updated ${m} ${d} ${y}`}</p>
        </div>
      );
    }
    return res.length ? res : "You have no Projects..."
  }

  if (sessionUser) {
    return (
      <>
        <span className="project-header">
          <h1>Your Projects</h1>
          <OpenModalButton
            buttonText="+ New Project"
            modalComponent={<NewProjectForm />}
          />
        </span>
        <section id="project-container">
          {formatProjects()}
        </section>
      </>
    );
  } else {
    return (
      <>
        <h1>HELLO STRANGER</h1>
      </>
    );
  }

}

export default Main;