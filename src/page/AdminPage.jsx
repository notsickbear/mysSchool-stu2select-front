import React, {Component} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {Link, withRouter} from 'react-router-dom'
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
                    pathname: "/admin/assign",
                    state: {userId: userId}
                }}>
                    <Button type="primary">assign</Button>
                </Link>
                <Link to={{
                    pathname: "/admin/setNumLimit",
                    state: {userId: userId}
                }}>
                    <Button type="primary">setNumLimit</Button>
                </Link>
                <Link to="/login">
                <Button type="primary">注销</Button>
                </Link>
            </div>
        )
    }
}

export default withRouter(StudentPage)