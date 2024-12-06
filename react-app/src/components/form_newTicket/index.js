import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import './TicketForm.css';
import { createTicket } from "../../store/ticket";

function NewTicketForm({ project }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('creator_id', sessionUser.id);
    formData.append('project_id', project);
    formData.append('priority', priority);
    formData.append('status', 1);


    const data = await dispatch(createTicket(formData));
    if (!data.errors) {
      history.push(`/tickets/${data}`);
      closeModal();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>New Ticket</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Name_
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description_
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Priority_
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
      <button className="action-button" type="submit">Create Ticket</button>
    </form >
    </>
  );
};


export default NewTicketForm;