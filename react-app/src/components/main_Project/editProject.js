import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateProject } from "../../store/project";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import './project.css';

function EditProjectForm({id}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const project = useSelector((state) => state.project[id])

  const [name, setName] = useState(project?.name);
  const [description, setDescription] = useState(project?.description);
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let today = new Date();

    const data = await dispatch(updateProject({name, description, today, id}));
    if (!data.errors) {
      history.push(`/projects/${data}`);
      closeModal();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Edit Project</h1>
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


export default EditProjectForm;
