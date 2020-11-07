import './css/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React from "react";
import TutorPage from "./page/TutorPage";
import StudentPage from "./page/StudentPage";
import AdminPage from "./page/AdminPage";
import LoginComp from "./page/LoginPage";
import TutorMyStudentComp from "./compone/TutorMyStudentComp";
import TutorResearchAreaComp from "./compone/TutorResearchAreaComp";
import TutorSelectStudentComp from "./compone/TutorSelectStudentComp";
import StudentMyTutorComp from "./compone/StudentMyTutorComp";
import StudentResearchAreaComp from "./compone/StudentResearchAreaComp";
import StudentSelectTutorComp from "./compone/StudentSelectTutorComp";
import AssignStudentComp from "./compone/AssignStudentComp";
import SetTutorNumLimitComp from "./compone/SetTutorNumLimitComp";


export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/tutor/myStudent">
                            <TutorMyStudentComp/>
                        </Route>
                        <Route path="/tutor/researchArea">
                            <TutorResearchAreaComp/>
                        </Route>
                        <Route path="/tutor/select">
                            <TutorSelectStudentComp/>
                        </Route>
                        <Route path="/tutor">
                            <TutorPage/>
                        </Route>
                        <Route path="/student/myTutor">
                            <StudentMyTutorComp/>
                        </Route>
                        <Route path="/student/researchArea">
                            <StudentResearchAreaComp/>
                        </Route>
                        <Route path="/student/select">
                            <StudentSelectTutorComp/>
                        </Route>
                        <Route path="/student">
                            <StudentPage/>
                        </Route>
                        <Route path="/admin/assign">
                            <AssignStudentComp/>
                        </Route>
                        <Route path="/admin/setNumLimit">
                            <SetTutorNumLimitComp/>
                        </Route>
                        <Route path="/admin">
                            <AdminPage/>
                        </Route>
                        <Route path="/login">
                            <LoginComp/>
                        </Route>
                        <LoginComp/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

