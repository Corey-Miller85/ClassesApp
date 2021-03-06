import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class UserSignIn extends Component {
	state = {
		emailAddress: "",
		password: "",
		errors: []
	};

	render() {
		const { emailAddress, password, errors } = this.state;

		return (
			<div className='bounds'>
				<div className='grid-33 centered signin'>
					<h1>Sign In</h1>
					<Form
						cancel={this.cancel}
						errors={errors}
						submit={this.submit}
						submitButtonText='Sign In'
						elements={() => (
							<React.Fragment>
								<input
									autoFocus
									id='emailAddress'
									name='emailAddress'
									type='text'
									className=''
									onChange={this.change}
									placeholder='Email'
									value={emailAddress}
								/>
								<input
									id='password'
									name='password'
									type='password'
									className=''
									onChange={this.change}
									placeholder='Password'
									value={password}
								/>
							</React.Fragment>
						)}
					/>
					<p>
						No account? <Link to='/signup'>Click here</Link> to sign
						up!
					</p>
				</div>
			</div>
		);
	}

	change = event => {
		const name = event.target.name;
		const value = event.target.value;

		this.setState(() => {
			return {
				[name]: value
			};
		});
	};

	submit = () => {
		const { context } = this.props;
		const { from } = this.props.location.state || {
			from: { pathname: "/" }
		};
		const { emailAddress, password } = this.state;

		context.actions
			.signIn(emailAddress, password)
			.then(user => {
				if (user === null) {
					this.setState(() => {
						return {
							errors: [
								{
									message:
										"Sign-in was unsuccessful. Please enter valid credentials"
								}
							]
						};
					});
				} else {
					this.props.history.push(from);
				}
			})
			.catch(err => {
				console.error(err);
				this.props.history.push("/error");
			});
	};

	cancel = () => {
		this.props.history.push("/");
	};
}
