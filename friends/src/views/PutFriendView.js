// React
import React from 'react';
import { Link } from 'react-router-dom';

// Dependencies
import axios from 'axios';
import { connect } from 'react-redux';

// Actions
import { deleteFriend, getFriendsList } from '../store/actions';

class PutFriendView extends React.Component {
	state = {};

	handleDeleteFriend = e => {
		e.preventDefault();

		new Promise(() => {
			this.props.deleteFriend(this.state.id);
		})
			.then(this.props.getFriendsList())
			.then(this.props.history.push('/friendslist'));
	}

	componentDidMount() {
		axios
			.get(`http://localhost:5000/api/friends/${ this.props.match.params.id }`)
			.then(res => this.setState(res.data))
			.catch(err => console.log(err));
	}

	render() {
		return(
			<div>
				<p>Name: { this.state.name }</p>
				<p>Age: { this.state.age }</p>
				<p>Email: { this.state.email }</p>

				<Link to = { `/friendslist/${this.state.id}/edit` }>Edit</Link>

				<button onClick = { this.handleDeleteFriend }>Delete</button>
			</div>
		);
	}
}

const mapStateToProps = state => ({});

export default connect (mapStateToProps, { deleteFriend, getFriendsList })(PutFriendView);
