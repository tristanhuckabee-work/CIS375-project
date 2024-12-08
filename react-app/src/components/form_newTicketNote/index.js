import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createTicketNote } from "../../store/ticket_notes";
import './ticketNote.css';

function NewTicketNoteForm({ id }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = await dispatch(createTicketNote({content, creator_id:sessionUser.id}, id));
    if (data.errors) {
      setErrors(data.errors);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            id="wide"
            value={content}
            placeholder="Your Note (Update on this Ticket)..."
            maxLength={1000}
            rows={12}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <button className="action-button" type="submit">Add Note</button>
      </form >
    </>
  );
};


export default NewTicketNoteForm;
