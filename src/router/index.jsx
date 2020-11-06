// eslint-disable-next-line no-unused-vars
import React from 'react'
import App from "../App"
import TutorPage from "../page/TutorPage";
import StudentPage from "../page/StudentPage";
import AdminPage from "../page/AdminPage";
import LoginComp from "../page/LoginPage";
import AssignStudentComp from "../compone/AssignStudentComp";
import SetTutorNumLimitComp from "../compone/SetTutorNumLimitComp";
import StudentMyTutorComp from "../compone/StudentMyTutorComp";
import StudentResearchAreaComp from "../compone/StudentResearchAreaComp";
import StudentSelectTutorComp from "../compone/StudentSelectTutorComp";
import TutorMyStudentComp from "../compone/TutorMyStudentComp";
import TutorResearchAreaComp from "../compone/TutorResearchAreaComp";
import TutorSelectStudentComp from "../compone/TutorSelectStudentComp";

let routeConfig = [{
    path: '/',
    component: App,
    indexRoute: {component: LoginComp},
    childRoutes: [
        {
            path: 'tutor',
            component: TutorPage,
            childRoutes: [
                {path: 'myStudent', component: TutorMyStudentComp},
                {path: 'researchArea', component: TutorResearchAreaComp},
                {path: 'select', component: TutorSelectStudentComp}
            ]
        },
        {
            path: 'student',
            component: StudentPage,
            childRoutes: [
                {path: 'myTutor', component: StudentMyTutorComp},
                {path: 'researchArea', component: StudentResearchAreaComp},
                {path: 'select', component: StudentSelectTutorComp}
            ]
        },
        {
            path: "admin", component: AdminPage,
            childRoutes: [
                {path: "assign", component: AssignStudentComp},
                {path: "setNumLimit", component: SetTutorNumLimitComp}
            ]
        }
    ]
}]
export default routeConfig