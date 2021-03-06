import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import { login as loginTool } from '../../Redux';
import { useSelector, useDispatch } from 'react-redux';

/**
 * Page to change the username and password of your account
 */
const Settings = () => {
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const dispatch = useDispatch();

	//Uses local redux storage to get the info of the current user
	const login = useSelector(state => {
		return {
			username: state.username,
			password: state.password,
			email: state.email
		}
	});

	function changeUsername() {
		if (username.localeCompare(login.username) !== 0) {
			const body = {
				password: login.password,
				email: login.email
			};
			fetch(`https://forum-database232.herokuapp.com/users/username/${username}`, {
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(body)
			}).then(res => res.json())
			.then(data => {
				const state = {
					username: username,
					password: login.password,
					email: login.email
				}
				dispatch(loginTool(state));
			});
		}
	}

	function changePassword() {
		if (password.localeCompare(login.password) !== 0) {
			const body = {
				username: login.username,
				email: login.email
			};
			fetch(`https://forum-database232.herokuapp.com/users/password/${password}`, {
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(body)
			}).then(res => res.json())
			.then(data => {
				const state = {
					username: login.username,
					password: password,
					email: login.email
				}
				dispatch(loginTool(state));
			});
		}
	}
	return (
		<div className="settings">
			<h4 className="page-title"> Settings </h4>
			<div>
				<h4 className="settings-title"> Change Username</h4>
				<p className="settings-body"> Username must be different from old one </p>
				<input className="settings-input" placeholder="New Username" onChange={event => setUsername(event.target.value)}/>
				<Button className="settings-button" onClick={changeUsername}> Submit </Button>
			</div>
			<div>
				<h4 className="settings-title"> Change Password </h4>
				<p className="settings-body"> Password must be different from old one </p>
				<input className="settings-input" placeholder="New Password" onChange={event => setPassword(event.target.value)}/>
				<Button className="settings-button" onClick={changePassword}> Submit </Button>
			</div>
		</div>
		);
}

export default Settings;