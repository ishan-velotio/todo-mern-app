import React, { useState } from "react";
import Auth from "./Auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "./App.css";
import TaskPage from "./Task/TaskPage";



const initilizeState = {
	user: null,
	isLogin: false,
	permissions: {
		readAccess: false,
		writeAccess: false,
		deleteAccess: false
	}
}
const App = () => {
	const [user, setUser] = useState(initilizeState);

	return (
		<BrowserRouter>
			<Routes>
				{
					user.isLogin
						? <Route path="/" element={<TaskPage user={user} />} />
						: (<Route path="" element={<Navigate to="/login" />} />)
				}

				<Route path="/login" element={<Auth setUser={setUser} />} />


			</Routes>
		</BrowserRouter>
	)
}

export default App;
