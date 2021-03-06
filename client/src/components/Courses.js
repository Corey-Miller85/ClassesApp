import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Courses extends Component {
	state = {
		courses: []
	};

	// on Mount, destructure context from provider, findAll() courses, set the state of this, to the returned courses
	// catch errors and kick to error page.
	componentDidMount() {
		const { context } = this.props;
		context.data
			.getCourses()
			.then(Data => {
				this.setState({ courses: Data });
			})
			.catch(err => {
				this.props.history.push("/error");
			});
	}

	render() {
		// create cards for each course that will show up
		return (
			<div className='bounds'>
				{this.state.courses.map(course => {
					return (
						<div className='grid-33' key={`${course.id}`}>
							{/* MAKE THIS A LINK */}
							<NavLink
								to={`/courses/${course.id}`}
								className='course--module course--link'
							>
								<h4 className='course--label'>Course</h4>
								<h3 className='course--title'>{`${course.title}`}</h3>
							</NavLink>
						</div>
					);
				})}
				{/* add Create course.  */}
				<div className='grid-33'>
					<NavLink
						to='/courses/create'
						className='course--module course--add--module'
					>
						<h3 className='course--add--title'>
							<svg
								version='1.1'
								xmlns='http://www.w3.org/2000/svg'
								x='0px'
								y='0px'
								viewBox='0 0 13 13'
								className='add'
							>
								<polygon points='7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 '></polygon>
							</svg>
							New Course
						</h3>
					</NavLink>
				</div>
			</div>
		);
	}
}
