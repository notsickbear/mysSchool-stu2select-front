import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

export class StudentPage extends Component {
    // TODO:select 的备选项查询 /*useId={this.props.useId}*/
    render() {
        return (
            <div>
                <Link to={{
                    pathname: "/student/select",
                    state: {userId: 1}
                }}>
                    <div className="link">select</div>
                </Link>
                <Link to={{
                    pathname: "/student/researchArea",
                    state: {userId: this.props.location.state.userId}
                }}>
                    <div className="link">researchArea</div>
                </Link>
                <Link to={{
                    pathname: "/student/myTutor",
                    state: {userId: this.props.location.state.userId}
                }}>
                    <div className="link">myTutor</div>
                </Link>
                <Link to="/login">
                    <div className="link">注销</div>
                </Link>
            </div>
        )
    }
}

export default withRouter(StudentPage)