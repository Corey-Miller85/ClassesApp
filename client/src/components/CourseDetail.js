import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
export default class CourseDetail extends Component {
	state = {
		course: {
			User: {}
		},
		id: this.props.match.params.id
	};
	componentDidMount() {
		const { context } = this.props;
		context.data
			.getCourseDetail(this.state.id)
			.then(course => {
				this.setState({ course });
			})
			.catch(err => {
				this.props.history.push("/error");
			});
	}
	render() {
		const { context } = this.props;
		const { course } = this.state;
		const teacher = this.state.course.User;
		const authUser = context.authenticatedUser;
		const description = `${course.description}`;
		const materials = `${course.materialsNeeded}`;

		return (
			<div className='bounds'>
				<div className='grid-100'>
					<h1>Courses</h1>
					<div>
						<div className='actions--bar'>
							<div className='bounds'>
								{authUser === null ||
								authUser.id !== teacher.id ? (
									<div className='grid-100'>
										<NavLink
											to='/'
											className='button button-secondary'
										>
											Return to List
										</NavLink>
									</div>
								) : (
									<div className='grid-100'>
										<span>
											<NavLink
												to={`/courses/${course.id}/update`}
												className='button'
											>
												Update Course
											</NavLink>
											<NavLink
												to='/'
												className='button'
												onClick={this.delete}
											>
												Delete Course
											</NavLink>
										</span>
										<NavLink
											to='/'
											className='button button-secondary'
										>
											Return to List
										</NavLink>
									</div>
								)}
							</div>
						</div>

						<div className='bounds course--detail'>
							<div className='grid-66'>
								<div className='course--header'>
									<h4 className='course--label'>Course</h4>
									<h3 className='course--title'>{`${course.title}`}</h3>
									<p>
										By
										{` ${teacher.firstName} ${teacher.lastName}`}
									</p>
								</div>

								<div className='course--description'>
									<ReactMarkdown source={description} />
								</div>
							</div>
							<div className='grid-25 grid-right'>
								<div className='course--stats'>
									<ul className='course--stats--list'>
										<li className='course--stats--list--item'>
											<h4>Estimated Time</h4>
											<h3>{course.estimatedTime}</h3>
										</li>
										<li className='course--stats--list--item'>
											<h4>Materials Needed</h4>
											<ul>
												<ReactMarkdown
													source={materials}
												/>
											</ul>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	delete = () => {
		const { context } = this.props;
		const id = this.props.match.params.id;
		const user = context.authenticatedUser;
		const password = context.authenticatedUser.password;

		context.data
			.deleteCourse(user.emailAddress, password, id)
			.then(errors => {
				if (errors.length > 0) {
					this.setState({ errors });
				} else {
					window.location.href = "/";
				}
			})
			.catch(err => {
				console.log(err);
				this.props.history.push("/error");
			});
	};
}
