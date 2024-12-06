import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './project.css';

function TicketCard({ ticket }) {
  const [_cd, cd, cm, cy, _ct, _cz] = ticket.created_at.split(' ');
  const [_ud, ud, um, uy, _ut, _uz] = ticket.updated_at.split(' ');
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    history.push({ pathname: `/tickets/${ticket.id}` });
    return;
  }

  return (
    <div
      className="ticket-card"
      key={`ticketCard-${ticket.id}`}
      onClick={handleClick}
    >
      <span className={`tc-header ${ticket.priority[1]}`}>
        <h4>{ticket.name}</h4>
        <span className="tch-right">
          <p>{`Priority: ${ticket.priority[0]}`}</p>
          <p>{`Status: ${ticket.status[0]}`}</p>
        </span>
      </span>
      <p className={`tc-date`}>{`Created ${cm} ${cd} ${cy} | Last Updated ${um} ${ud} ${uy}`}</p>
    </div>
  );
}

export default TicketCard;