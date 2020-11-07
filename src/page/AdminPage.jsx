import React, {Component} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {Link, withRouter} from 'react-router-dom'

export class StudentPage extends Component {
    // TODO:select 的备选项查询 /*useId={this.props.useId}*/
    render() {
        return (
            <div>
                <Link to={{
                    pathname: "/admin/assign",
                    state: {userId: this.props.location.state.userId}
                }}>
                    <div className="link">assign</div>
                </Link>
                <Link to={{
                    pathname: "/admin/setNumLimit",
                    state: {userId: this.props.location.state.userId}
                }}>
                    <div className="link">setNumLimit</div>
                </Link>
                <Link to="/login">
                    <div className="link">注销</div>
                </Link>
            </div>
        )
    }
}

export default withRouter(StudentPage)