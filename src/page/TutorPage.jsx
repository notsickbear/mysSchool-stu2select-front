import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import TutorMyStudentComp from "../compone/TutorMyStudentComp";
import TutorResearchAreaComp from "../compone/TutorResearchAreaComp";
import TutorSelectStudentComp from "../compone/TutorSelectStudentComp";

export class TutorPage extends Component {
    // TODO:select 的备选项查询 /*useId={this.props.useId}*/
    render() {
        return (
            <div>
                <Router><Switch>
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
                        <Link to={{
                            pathname: "/tutor/select",
                            state: {userId: this.props.userId}
                        }}>
                            <div className="link">select</div>
                        </Link>
                        <Link to={{
                            pathname: "/tutor/researchArea",
                            state: {userId: this.props.userId}
                        }}>
                            <div className="link">researchArea</div>
                        </Link>
                        <Link to={{
                            pathname: "/tutor/myStudent",
                            state: {userId: this.props.userId}
                        }}>
                            <div className="link">myStudent</div>
                        </Link>
                    </Route>
                </Switch></Router>
            </div>
        )
    }
}

export default TutorPage