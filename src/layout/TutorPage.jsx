import React, { Component } from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TutorMyStudentComp from '../compone/TutorMyStudentComp';
import TutorResearchAreaComp from '../compone/TutorResearchAreaComp'
export class TutorPage extends Component {
    // TODO:select 的备选项查询 /*useId={this.props.useId}*/
    render() {
        return (
            <div>
                {/*<TutorMyStudentComp
                    userId={1}/>*/}
                <TutorResearchAreaComp
                userId={2}/>
                <ToastContainer />
            </div>
        )
    }
}

export default TutorPage