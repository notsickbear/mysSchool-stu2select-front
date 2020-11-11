import React, { Component } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserApi from "../api/UserApi";
import { withRouter } from 'react-router-dom'
import { Form, Input, Button} from 'antd'
import 'antd/dist/antd.css'

export class Comp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "id": 0,
            "idError": "",
            "idState": 0,
            "pw": 0,
            "pwError": "",
            "pwState": 0,
        }
    }
    submit = () => {
        if (this.state.idState === 1 && this.state.pwState === 1) {
            let param = { "id": parseInt(this.state.id), "pw": this.state.pw }
            UserApi.isCorrectLogin(param).then((res) => {
                let userId = parseInt(res)
                if (userId === -1) {
                    toast("登录失败，账号密码不匹配")
                } else {
                    UserApi.getUserById(param.id).then((ret) => {
                        let type = parseInt(ret.type);
                        if (1 === type)
                            this.props.history.push({ pathname: "/student/select", state: { userId: userId }, })
                        if (2 === type)
                            this.props.history.push({ pathname: "/tutor/select", state: { userId: userId }, })
                        if (3 === type || 4 === type)
                            this.props.history.push({ pathname: "/admin/assign", state: { userId: userId }, })
                    })
                }
            })
        }
    }
    checkId = () => {
        let re = /^[0-9][0-9]*/
        let value = document.getElementById("uid").value;
        console.log(value)
        console.log(re.test(value))
        if (value.length === 0 || parseInt(value) === 0)
            this.setState({ idError: "账号必须有内容(只有0也不行)", idState: 0 })
        else if (!re.test(value))
            this.setState({ idError: "您的输入有误，账号只应该包含数字", idState: 0 })
        else if (parseInt(value).toString().length > 8)
            this.setState({ idError: "您的输入有误，账号最多8位数(开头的0不会计入)", idState: 0 })
        else this.setState({ idError: "", idState: 1 })
    }
    checkPw = () => {
        let re = /^[1-9a-zA-Z][1-9a-zA-Z]*/
        let value = document.getElementById("pw").value;
        if (!re.test(value))
            this.setState({ pwError: "您的输入有误，密码只应该包含数字和英文字母", pwState: 0 })
        else if (value.length === 0)
            this.setState({ pwError: "必须输入密码)", pwState: 0 })
        else if (value.length > 20)
            this.setState({ pwError: "您的输入有误，密码最多20位数", pwState: 0 })
        else this.setState({ pwError: "", pwState: 1 })
    }
    saveId = () => {
        let value = parseInt(document.getElementById("uid").value);
        if ("" === this.state.idError) this.setState({ id: value })
    }
    savePw = () => {
        let value = parseInt(document.getElementById("pw").value);
        if ("" === this.state.pwError) this.setState({ pw: value })
    }
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 8 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };     
        return (
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            id="uid"
                            type="text"
                            placeholder="在这里输入纯数字账号"
                            onChange={() => this.checkId()}
                            onBlur={() => this.saveId()}
                        />
                    </Form.Item>
                    <p className="errorText">{this.state.idError}</p>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            id="pw"
                            type="password"
                            placeholder="在这里输入密码"
                            onChange={() => this.checkPw()}
                            onBlur={() => this.savePw()}
                        />
                    </Form.Item>
                    <p className="errorText">{this.state.pwError}</p>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" onClick={() => this.submit()}>登录</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default withRouter(Comp)