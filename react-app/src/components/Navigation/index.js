import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';

function Navigation() {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => { setShowMenu(!showMenu) }
	// useEffect(() => {
	// 	if (!showMenu) return;
	// 	toggleMenu();
	// }, [showMenu]);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	}


	return (
		<header>
			<NavLink exact to="/"><h2>Home</h2></NavLink>
			{(sessionUser && (
				<span className="nav-right">
					<h2>{`Hello ${sessionUser.first_name} ${sessionUser.last_name}`}</h2>
					<button className="action-button" onClick={handleLogout}>
						logout
					</button>
				</span>
			)) || (
					<span className="nav-right">
						<OpenModalButton
							buttonText="Log In"
							onItemClick={toggleMenu}
							modalComponent={<LoginFormModal />}
						/>
						<OpenModalButton
							buttonText="Sign Up"
							onItemClick={toggleMenu}
							modalComponent={<SignupFormModal />}
						/>
					</span>
				)}
		</header>
	);
}

export default Navigation;