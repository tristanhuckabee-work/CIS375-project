import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, getOneProject } from '../../store/project';
import { getAllTickets } from '../../store/ticket';
import './project.css';
import UserOptions from '../a_userOptions';
import TicketCard from './ticketCard';
import OpenModalButton from '../OpenModalButton';
import NewTicketForm from '../form_newTicket';

function ProjectPage() {
  const dispatch = useDispatch();
  const id = +window.location.href.split('/')[4]

  
  const sessionUser = useSelector(state => state.session.user);
  const project = useSelector(state => state.project[id]);
  const tickets = useSelector(state => state.ticket);
  useEffect(() => {
    if (sessionUser) {
      dispatch(getOneProject(id));
      dispatch(getAllTickets(id));
    }
  }, [dispatch])

  const formatUsers = () => {
    return project?.users.map(u => {
      let userClasses = "user-side-card "

      if (project?.creator_id === u.id) {
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
  const generateCards = () => {
    console.log(tickets.byPriority)
    if (tickets?.byPriority?.length) {
      return tickets.byPriority.map(ticket => {
        return <TicketCard ticket={ticket} />
      })
    }
    return null;
  }
  const createProjectInvite = (e) => {
    navigator.clipboard.writeText(`http://localhost:3000/invite/${id}`)
  }


  return (
    <section id="project-page">
      <div id="project-deets">
        <h2>{project?.name}</h2>
        <p>{project?.description}</p>
        {sessionUser.id === project?.creator_id && <UserOptions item_id={project.id} action={deleteProject} />}
        <span>
          <h3>Tickets</h3>
          <OpenModalButton
            buttonText="New Ticket"
            modalComponent={<NewTicketForm project={project?.id}/>}
          />
        </span>
        <div id="ticket-container">
          {generateCards()}
        </div>
      </div>

      <div id="project-users">
        <span>
          <h2>Users</h2>
          <button className="action-button" onClick={createProjectInvite}>Add User</button>
        </span>
        {formatUsers()}
      </div>
    </section>
  );
}

export default ProjectPage;