import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { archiveTicket, getOneTicket, updateTicket } from '../../store/ticket';
import { getAllProjects } from '../../store/project';
import OpenModalButton from '../OpenModalButton';
import ConfirmArchive from './ConfirmArchive';
import EditTicketForm from './editTicket';
import './ticket.css';
import NewTicketNoteForm from '../form_newTicketNote';
import { deleteTicketNote, getAllTicketNotes } from '../../store/ticket_notes';

function TicketPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = +window.location.href.split('/')[4]

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getOneTicket(id));
    dispatch(getAllTicketNotes(id));
  }, [dispatch])

  const sessionUser = useSelector(state => state.session.user);
  const ticket = useSelector(state => state.ticket[id]);
  const userRole = useSelector(state => state.project[ticket?.project?.id])?.users?.filter(el => el.id === sessionUser.id)[0];
  const tnotes = useSelector(state => state.ticketNotes);
  const [_cd, cd, cm, cy, _ct, _cz] = ticket?.created_at?.split(' ') || [0, 1, 2, 3, 4, 5];
  const [_ud, ud, um, uy, _ut, _uz] = ticket?.updated_at?.split(' ') || [0, 1, 2, 3, 4, 5];

  const projectLink = (e) => {
    e.stopPropagation();
    history.push({ pathname: `/projects/${ticket?.project.id}` });
  }
  const userOpts = () => {
    if (userRole?.role === 'admin') {
      return (
        <span className='ticket-user-opts'>
          <OpenModalButton
            buttonText="Edit"
            modalComponent={<EditTicketForm id={id} action={updateTicket} />}
          />
          <OpenModalButton
            buttonText="Archive"
            modalComponent={<ConfirmArchive red={`/projects/${ticket?.project?.id}`} id={id} action={archiveTicket} />}
          />
        </span>
      )
    }
    return (
      <span className='ticket-user-opts'>
        <OpenModalButton
          buttonText="Archive"
          modalComponent={<ConfirmArchive red={`/projects/${ticket?.project?.id}`} id={id} action={archiveTicket} />}
        />
      </span>
    );
  }
  const deleteTicket = async (e, id) => {
    e.stopPropagation()

    await dispatch(deleteTicketNote(id))
  }

  const generateCards = () => {
    return Object.values(tnotes).map(tnote => {
      const option = sessionUser.id === tnote.creator.id ? <button className="action-button" onClick={(e) => deleteTicket(e, tnote.id)}>Delete</button>:null;

      return (
        <div className="tnote-card" key={`tnote-${tnote.id}`}>
          <h4>{`${tnote.creator.first_name} ${tnote.creator.last_name}`}</h4>
          {option}
          <p>{tnote.content}</p>
          <p className='tnc-date'>{tnote.created_at}</p>
        </div>
      )
    })
  }

  return (
    <div id='tp-container'>
      <section id='tpc-left'>
        <h2>{ticket?.name}</h2>
        <p className="tp-deet plink" onClick={projectLink}>{ticket?.project.name}</p>
        {userOpts()}
        <p className="tp-deet">{ticket?.status[0].toUpperCase()}</p>
        <p className="tp-deet">{ticket?.priority[0].toUpperCase()} Priority</p>
        <p className="tp-deet"></p>
        <p className="tp-deet">{`Created by ${ticket?.creator.first_name} ${ticket?.creator.last_name}`}</p>
        <p>{ticket?.description}</p>
        <p className="tp-deet">{`Last Updated ${cm} ${cd} ${cy}`}</p>
        <p className="tp-deet">{`Last Updated ${um} ${ud} ${uy}`}</p>
        <NewTicketNoteForm id={id}/>
      </section>
      <section id='tpc-right'>
        <h2>Notes</h2>
        {generateCards()}
      </section>
    </div>
  );

}

export default TicketPage;