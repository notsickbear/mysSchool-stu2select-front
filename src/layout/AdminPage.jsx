import React, {Component} from 'react'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import AssignStudentComp from "../compone/AssignStudentComp"
import SetTutorNumLimitComp from "../compone/SetTutorNumLimitComp"


export class StudentPage extends Component {
    // TODO:select 的备选项查询 /*useId={this.props.useId}*/
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/admin/assign">
                            <AssignStudentComp
                                userId={this.props.userId}/>
                        </Route>
                        <Route path="/admin/setNumLimit">
                            <SetTutorNumLimitComp
                                userId={this.props.userId}/>
                        </Route>
                        <Route path="/admin">
                            <div className="link">
                                <Link to="/admin/assign">
                                    <h1>assign</h1>
                                </Link>
                            </div>
                            <div className="link">
                                <Link to="/admin/setNumLimit">
                                    <h1>setNumLimit</h1>
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