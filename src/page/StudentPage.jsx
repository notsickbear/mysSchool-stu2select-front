import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import {Button,} from 'antd'
import 'antd/dist/antd.css'

export class StudentPage extends Component {
    // TODO:select 的备选项查询 /*useId={this.props.useId}*/
    render() {
        let userId = 0
        if (this.props.userId !== null) userId = parseInt(this.props.userId)
        else if (this.props.location.state.userId !== null) userId = parseInt(this.props.location.state.userId)
        return (
            <div>
                <Link to={{
                    pathname: "/student/select",
                    state: {userId: userId}
                }}>
                    <Button type="primary">select</Button>
                </Link>
                <Link to={{
                    pathname: "/student/researchArea",
                    state: {userId: userId}
                }}>
                    <Button type="primary">researchArea</Button>
                </Link>
                <Link to={{
                    pathname: "/student/myTutor",
                    state: {userId: userId}
                }}>
                    <Button type="primary">myTutor</Button>
                </Link>
                <Link to="/login">
                <Button type="primary">注销</Button>
                </Link>
            </div>
        )
    }
}

export default withRouter(StudentPage)