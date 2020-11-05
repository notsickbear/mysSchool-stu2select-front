// import logo from './logo.svg';
import './css/App.css';
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom'
import TutorPage from './layout/TutorPage';
import React from "react";
import StudentPage from "./layout/StudentPage";

function App() {
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
                    <Route path="/">
                        <div className="link">
                            <Link to="/tutor">
                                <h1>tutor</h1>
                            </Link>
                        </div>
                        <div className="link">
                            <Link to="/student">
                                <h1>student</h1>
                            </Link>
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
