import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";
import UserSignOut from "./components/UserSignOut";
import NotFound from "./components/NotFound";

//With Context Block
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);

export default () => (
	<BrowserRouter>
		<div>
			<HeaderWithContext />

			<Switch>
				<Route exact path='/' component={CoursesWithContext} />
				{/* User Routes */}
				<Route path='/signin' component={UserSignInWithContext} />
				<Route path='/signup' component={UserSignUpWithContext} />
				<Route path='/signout' component={UserSignOutWithContext} />
				{/* PrivateRoutes */}
				<PrivateRoute
					path='/courses/create'
					component={CreateCourseWithContext}
				/>
				<PrivateRoute
					path='/courses/:id/update'
					component={UpdateCourseWithContext}
				/>
				<Route
					path='/courses/:id'
					component={CourseDetailWithContext}
				/>
				<Route component={NotFound} />
			</Switch>
		</div>
	</BrowserRouter>
);
