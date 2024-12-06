import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './ticket.css';
import { getOneTicket } from '../../store/ticket';

function TicketPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = +window.location.href.split('/')[4]
  
  useEffect(() => {
    dispatch(getOneTicket(id));
  }, [dispatch])
  
  const sessionUser = useSelector(state => state.session.user);
  const ticket = useSelector(state => state.ticket[id]);
  const [_cd, cd, cm, cy, _ct, _cz] = ticket?.created_at?.split(' ') || [0,1,2,3,4,5];
  const [_ud, ud, um, uy, _ut, _uz] = ticket?.updated_at?.split(' ') || [0,1,2,3,4,5];

  const projectLink = (e) => {
    e.stopPropagation();
    history.push({pathname: `/projects/${ticket?.project.id}`});
  }

  return (
    <div id='tp-container'>
      <section id='tpc-left'>
        <h2>{ticket?.name}</h2>
        <p className="tp-deet plink" onClick={projectLink}>{ticket?.project.name}</p>
        <p className="tp-deet">{ticket?.status[0].toUpperCase()}</p>
        <p className="tp-deet">{ticket?.priority[0].toUpperCase()} Priority</p>
        <p className="tp-deet"></p>
        <p className="tp-deet">{`Created by ${ticket?.creator.first_name} ${ticket?.creator.last_name}`}</p>
        <p>{ticket?.description}</p>
        <p className="tp-deet">{`Last Updated ${cm} ${cd} ${cy}`}</p>
        <p className="tp-deet">{`Last Updated ${um} ${ud} ${uy}`}</p>
      </section>
      <section id='tpc-right'>
        <h2>Notes</h2>
      </section>
    </div>
  );

}

export default TicketPage;