import React, {Component} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import AssignStudentComp from "../compone/AssignStudentComp";
import SetTutorNumLimitComp from "../compone/SetTutorNumLimitComp";

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
                            <Link to={{
                                pathname: "/admin/assign",
                                state: {userId: this.props.userId}
                            }}>
                                <div className="link">assign</div>
                            </Link>
                            <Link to={{
                                pathname: "/admin/setNumLimit",
                                state: {userId: this.props.userId}
                            }}>
                                <div className="link">setNumLimit</div>
                            </Link>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default StudentPage