import './css/App.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import React from "react";
import TutorPage from "./page/TutorPage";
import StudentPage from "./page/StudentPage";
import AdminPage from "./page/AdminPage";
import LoginComp from "./page/LoginPage";


export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/tutor">
                            <TutorPage
                                userId={1}/>
                        </Route>
                        <Route path="/student">
                            <StudentPage
                                userId={1}/>
                        </Route>
                        <Route path="/admin">
                            <AdminPage
                                userId={1}/>
                        </Route>
                        <Route path="/login">
                            <LoginComp/>
                        </Route>
                        <Route path="/">
                            <Link to="/tutor">
                                <div className="link">tutor</div>
                            </Link>
                            <Link to="/student">
                                <div className="link">student</div>
                            </Link>
                            <Link to="/admin">
                                <div className="link">admin</div>
                            </Link>
                            <Link to="/login">
                                <div className="link">login</div>
                            </Link>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

