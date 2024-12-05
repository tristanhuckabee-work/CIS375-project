import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };
  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("yungdemo@demo.com", "6b3a55e0261b0304143f805a24924d0c1c44524821305f31d9277843b8a10f4e"));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email_
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password_
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="action-button" type="submit">Log In</button>
        <button className="action-button" onClick={demoLogin}>Demo Login</button>
      </form>
    </>
  );
}

export default LoginFormModal;
