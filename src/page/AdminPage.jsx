import React, { Component } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom'
import { Button, PageHeader } from 'antd'
import 'antd/dist/antd.css'

export class StudentPage extends Component {
    leapTo = (path, userId = 0) => {
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
                            onClick={() => this.leapTo("/admin/assign", userId)}>
                            调剂学生</Button>,
                        <Button
                            type="primary"
                            key="2"
                            onClick={() => this.leapTo("/admin/setNumLimit", userId)}>
                            设置导师名额</Button>,
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