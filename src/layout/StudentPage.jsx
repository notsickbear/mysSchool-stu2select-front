import React, {Component} from 'react'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import StudentSelectTutorComp from "../compone/StudentSelectTutorComp"
import StudentMyTutorComp from "../compone/StudentMyTutorComp";
import StudentResearchAreaComp from "../compone/StudentResearchAreaComp"


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
                            <div className="link">
                                <Link to="/student/select">
                                    <h1>select</h1>
                                </Link>
                            </div>
                            <div className="link">
                                <Link to="/student/researchArea">
                                    <h1>researchArea</h1>
                                </Link>
                            </div>
                            <div className="link">
                                <Link to="/student/myTutor">
                                    <h1>myStudent</h1>
                                </Link>
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default StudentPage