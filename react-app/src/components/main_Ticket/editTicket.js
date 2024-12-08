import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateProject } from "../../store/project";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import './ticket.css';
import { updateTicket } from "../../store/ticket";

function EditTicketForm({ id }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const ticket = useSelector((state) => state.ticket[id])

  const [name, setName] = useState(ticket?.name);
  const [description, setDescription] = useState(ticket?.description);
  const [priority, setPriority] = useState(ticket?.priority)
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let today = new Date();

    const data = await dispatch(updateTicket({ name, description, priority, today, id }));
    if (!data.errors) {
      history.push(`/tickets/${id}`);
      closeModal();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Edit Ticket</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Priority
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="0">LOW</option>
            <option value="1">MEDIUM</option>
            <option value="2">HIGH</option>
            <option value="3">URGENT</option>
            <option value="4">CRITICAL</option>
          </select>
        </label>

        <button className="action-button" type="submit">Edit Ticket</button>
      </form>
    </>
  );
};


export default EditTicketForm;
