import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';


export class StudentPage extends Component {
    // TODO:select 的备选项查询 /*useId={this.props.useId}*/
    render() {
        return (
            <div>
                {this.props.children}
                <div className="link">
                    <Link to={{
                        pathname: "/student/select",
                        state: {userId: 1}
                    }}>select</Link>
                </div>
                <div className="link">
                    <Link to={{
                        pathname: "/student/researchArea",
                        state: {userId: this.props.userId}
                    }}>researchArea </Link>
                </div>
                <div className="link">
                    <Link to={{
                        pathname: "/student/myTutor",
                        state: {userId: this.props.userId}
                    }}>myTutor</Link>
                </div>
            </div>
        )
    }
}

export default StudentPage