import React from 'react'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom'
import App from "../App"
import TutorPage from "../layout/TutorPage";
import StudentPage from "../layout/StudentPage";
import AdminPage from "../layout/AdminPage";
import LoginComp from "../compone/LoginComp";
import AssignStudentComp from "../compone/AssignStudentComp";
import SetTutorNumLimitComp from "../compone/SetTutorNumLimitComp";
import StudentMyTutorComp from "../compone/StudentMyTutorComp";
import StudentResearchAreaComp from "../compone/StudentResearchAreaComp";
import StudentSelectTutorComp from "../compone/StudentSelectTutorComp";
import TutorMyStudentComp from "../compone/TutorMyStudentComp";
import TutorResearchAreaComp from "../compone/TutorResearchAreaComp";
import TutorSelectStudentComp from "../compone/TutorSelectStudentComp";

export default class MyRoute extends React.Component{
    const routeConfig = [
        { path: '/',
        component: App,
        indexRoute: { component: LoginComp},
            childRoutes:[
                {path:'tutor',
                    component:{TutorPage},
                childRoutes:[
                    {path:'myStudent', component:{TutorMyStudentComp}},
                    {path:'researchArea', component: {TutorResearchAreaComp}}
                ]}
            ]
        }
    ]
    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/" component={App}>
                        <IndexRoute component={LoginComp} />
                        <Route path="tutor">
                            <TutorPage
                                userId={this.props.userId}/>
                            <Route path="myStudent">
                                <TutorMyStudentComp
                                    userId={this.props.userId}/>
                            </Route>
                            <Route path="researchArea">
                                <TutorResearchAreaComp
                                    userId={this.props.userId}/>
                            </Route>
                            <Route path="select">
                                <TutorSelectStudentComp
                                    userId={this.props.userId}/>
                            </Route>
                        </Route>
                        <Route path="student">
                            <StudentPage
                                userId={this.props.userId}/>
                            <Route path="myTutor">
                                <StudentMyTutorComp
                                    userId={this.props.userId}/>
                            </Route>
                            <Route path="researchArea">
                                <StudentResearchAreaComp
                                    userId={this.props.userId}/>
                            </Route>
                            <Route path="select">
                                <StudentSelectTutorComp
                                    userId={this.props.userId}/>
                            </Route>
                        </Route>
                        <Route path="admin">
                            <AdminPage
                                userId={this.props.userId}/>
                            <Route path="assign">
                                <AssignStudentComp
                                    userId={this.props.userId}/>
                            </Route>
                            <Route path="setNumLimit">
                                <SetTutorNumLimitComp
                                    userId={this.props.userId}/>
                            </Route>
                        </Route>
                    </Route>
                </Switch>
            </Router>
        )
    }
}
