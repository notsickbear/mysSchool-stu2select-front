import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { Button, PageHeader } from 'antd'
import 'antd/dist/antd.css'

export class StudentPage extends Component {
    leapTo = (path, userId=0) => {
        this.props.history.push({ pathname: path, state: { userId: userId }, })
    }
    render() {
        let userId = 0
        if (this.props.userId !== null) userId = parseInt(this.props.userId)
        else if (this.props.location.state.userId !== null) userId = parseInt(this.props.location.state.userId)
        return (
            <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Title"
                    extra={[
                        <Button
                            type="primary"
                            key="1"
                            onClick={() => this.leapTo("/student/select", userId)}>
                            选择导师</Button>,
                        <Button
                        type="primary"
                        key="2"
                        onClick={() => this.leapTo("/student/researchArea", userId)}>
                        研究方向</Button>,
                        <Button
                        type="primary"
                        key="3"
                        onClick={() => this.leapTo("/student/myTutor", userId)}>
                        我的导师</Button>,
                        <Button
                        type="primary"
                        key="4"
                        onClick={() => this.leapTo("/login")}>
                        退出</Button>,
                    ]}
                />
            </div>
        )
    }
}

export default withRouter(StudentPage)