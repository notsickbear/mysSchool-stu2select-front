import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import {Button,} from 'antd'
import 'antd/dist/antd.css'

export class TutorPage extends Component {
    // TODO:select 的备选项查询 /*useId={this.props.useId}*/
    render() {
        let userId = 0
        if (this.props.userId !== null) userId = parseInt(this.props.userId)
        else if (this.props.location.state.userId !== null) userId = parseInt(this.props.location.state.userId)
        return (
            <div>
                <Link to={{
                    pathname: "/tutor/select",
                    state: {userId: userId}
                }}>
                    <Button type="primary">select</Button>
                </Link>
                <Link to={{
                    pathname: "/tutor/researchArea",
                    state: {userId: userId}
                }}>
                    <Button type="primary">researchArea</Button>
                </Link>
                <Link to={{
                    pathname: "/tutor/myStudent",
                    state: {userId: userId}
                }}>
                    <Button type="primary">myStudent</Button>
                </Link>
                <Link to="/login">
                <Button type="primary">注销</Button>
                </Link>
            </div>
        )
    }
}

export default withRouter(TutorPage)