import React, {Component} from 'react'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import TutorSelectStudentComp from "../compone/TutorSelectStudentComp"
import TutorMyStudentComp from "../compone/TutorMyStudentComp";
import TutorResearchAreaComp from "../compone/TutorResearchAreaComp"


export class TutorPage extends Component {
    // TODO:select 的备选项查询 /*useId={this.props.useId}*/
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/tutor/myStudent">
                            <TutorMyStudentComp
                                userId={this.props.userId}/>
                        </Route>
                        <Route path="/tutor/researchArea">
                            <TutorResearchAreaComp
                                userId={this.props.userId}/>
                        </Route>
                        <Route path="/tutor/select">
                            <TutorSelectStudentComp
                                userId={this.props.userId}/>
                        </Route>
                        <Route path="/tutor">
                            <div className="link">
                                <Link to="/tutor/select">
                                    <h1>select</h1>
                                </Link>
                            </div>
                            <div className="link">
                                <Link to="/tutor/researchArea">
                                    <h1>researchArea</h1>
                                </Link>
                            </div>
                            <div className="link">
                                <Link to="/tutor/myStudent">
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

export default TutorPage