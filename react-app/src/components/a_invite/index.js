import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addUser, getAllProjects, getOneProject } from '../../store/project';
import { login, signUp } from '../../store/session';
import './invites.css';

function Invites() {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = +window.location.href.split('/')[4]

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getOneProject(id));
  }, [dispatch, id]);

  const sessionUser = useSelector(state => state.session.user);
  const project = useSelector(state => state.project[id]);


  const [lEmail, setLEmail] = useState("");
  const [lPassword, setLPassword] = useState("");
  const [lErrors, setLErrors] = useState([]);
  const [sEmail, setSEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [sPassword, setSPassword] = useState("");
  const [sConfirm, setSConfirm] = useState("");
  const [sErrors, setSErrors] = useState([]);

  const handleStranger = async (e, type) => {
    e.preventDefault();
    e.stopPropagation();

    if (type === 'login') {
      const data = await dispatch(login(lEmail, lPassword));
      if (data) setLErrors(data);
    } else if (type === 'demo') {
      const data = await dispatch(login("yungdemo@demo.com", "6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e"));
      if (data) setLErrors(data);
    } else {
      if (sPassword === sConfirm) {
        const formData = new FormData();
        formData.append('first', first);
        formData.append('last', last);
        formData.append('email', sEmail);
        formData.append('password', sPassword);

        const data = await dispatch(signUp(formData));
        if (data) {
          setSErrors(data);
        }
      } else {
        setSErrors(['Confirm Password field must be the same as the Password field']);
      }
    }
  }

  const handleLoggedIn = (e) => {
    e.stopPropagation();
    let response = e.target.value;

    if (response === 'yes') {
      dispatch(addUser([sessionUser.id, id]));
      history.push(`/projects/${id}`)
    } else {
      history.push('/');
    }
  }

  if (sessionUser) {
    return (
      <div id="invite-page-a">
        <h2>You've been invited to</h2>
        <h3 className='project-name-wow'>{project?.name}</h3>
        <p>Would you like to accept?</p>
        <span>
          <button className='action-button' value='yes' onClick={handleLoggedIn}>YES</button>
          <button className='action-button' value='no' onClick={handleLoggedIn}>NO</button>
        </span>
      </div>
    )
  }

  return (
    <div id="invite-page-b">
      <h2>You've been invited to</h2>
      <h3 className='project-name-wow'>{project?.name}</h3>
      <p>Please Login or SignUp to Join!</p>
      <span>
        <div className="ipb-a">
          <form onSubmit={(e) => handleStranger(e, 'login')}>
            <h4>Log In</h4>
            <ul>
              {lErrors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              Email
              <input
                type="text"
                value={lEmail}
                onChange={(e) => setLEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={lPassword}
                onChange={(e) => setLPassword(e.target.value)}
                required
              />
            </label>
            <button className="action-button" type="submit">Log In</button>
            <button className="action-button" onClick={(e) => handleStranger(e, 'demo')}>Demo Log In</button>
          </form>
        </div>
        <div className="ipb-b">
          <form onSubmit={(e) => handleStranger(e, 'signup')}>
            <h4>SignUp</h4>
            <ul>
              {sErrors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
              Email
              <input
                type="text"
                value={sEmail}
                onChange={(e) => setSEmail(e.target.value)}
                required
              />
            </label>
            <label>
              First Name
              <input
                type="text"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                required
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                value={last}
                onChange={(e) => setLast(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={sPassword}
                onChange={(e) => setSPassword(e.target.value)}
                required
              />
            </label>
            <label>
              Confirm Password
              <input
                type="password"
                value={sConfirm}
                onChange={(e) => setSConfirm(e.target.value)}
                required
              />
            </label>
            <button className="action-button" type="submit">Sign Up</button>
          </form>
        </div>
      </span>
    </div>
  );
}

export default Invites;