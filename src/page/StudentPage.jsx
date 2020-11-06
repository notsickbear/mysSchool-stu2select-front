import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import StudentMyTutorComp from "../compone/StudentMyTutorComp";
import StudentResearchAreaComp from "../compone/StudentResearchAreaComp";
import StudentSelectTutorComp from "../compone/StudentSelectTutorComp";

export class StudentPage extends Component {
    // TODO:select 的备选项查询 /*useId={this.props.useId}*/
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/student/myTutor">
                            <StudentMyTutorComp
                                userId={this.props.userId}/>
                        </Route>
                        <Route path="/student/researchArea">
                            <StudentResearchAreaComp
                                userId={this.props.userId}/>
                        </Route>
                        <Route path="/student/select">
                            <StudentSelectTutorComp
                                userId={this.props.userId}/>
                        </Route>
                        <Route path="/student">
                            <Link to={{
                                pathname: "/student/select",
                                state: {userId: 1}
                            }}>
                                <div className="link">select</div>
                            </Link>
                            <Link to={{
                                pathname: "/student/researchArea",
                                state: {userId: this.props.userId}
                            }}>
                                <div className="link">researchArea</div>
                            </Link>
                            <Link to={{
                                pathname: "/student/myTutor",
                                state: {userId: this.props.userId}
                            }}>
                                <div className="link">myTutor</div>
                            </Link>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default StudentPage