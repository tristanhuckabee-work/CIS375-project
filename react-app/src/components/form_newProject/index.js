import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './newProject.css';
import { createProject } from "../../store/project";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";

function NewProjectForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('creator_id', sessionUser.id);

    const data = await dispatch(createProject(formData));
    if (!data.errors) {
      history.push(`/projects/${data}`);
      closeModal();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>New Project</h1>
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
        <button className="action-button" type="submit">Create Project</button>
      </form>
    </>
  );
};


export default NewProjectForm;
