import React, {Component} from 'react'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserApi from "../api/UserApi";
import {withRouter} from 'react-router-dom'

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
            "comp": (
                <p>正在为您跳转到登录界面</p>
            )
        }
    }

    submit = () => {
        if (this.state.idState === 1 && this.state.pwState === 1) {
            let param = {"id": parseInt(this.state.id), "pw": this.state.pw}
            UserApi.isCorrectLogin(param).then((res) => {
                let userId = parseInt(res)
                if (userId === -1) {
                    toast("登录失败，账号密码不匹配")
                } else {
                    UserApi.getUserById(param.id).then((ret) => {
                        let type = parseInt(ret.type);
                        console.log(type)
                        console.log(1 === type)
                        if (1 === type)
                            this.props.history.push({pathname: "/student", state: {userId: userId},})
                        if (2 === type)
                            this.props.history.push({pathname: "/tutor", state: {userId: userId},})
                        if (3 === type || 4 === type)
                            this.props.history.push({pathname: "/admin", state: {userId: userId},})
                    })
                }
            })
        }
    }
    checkId = () => {
        let re = /^[0-9][0-9]*/
        let value = parseInt(document.getElementById("uid").value).toString();
        if (!re.test(value))
            this.setState({idError: "您的输入有误，账号只应该包含数字", idState: 0})
        else if (value.length === 0 || parseInt(value) === 0)
            this.setState({idError: "账号必须有内容(只有0也不行)", idState: 0})
        else if (value.length > 8)
            this.setState({idError: "您的输入有误，账号最多8位数(开头的0不会计入)", idState: 0})
        else this.setState({idError: "", idState: 1})
    }
    checkPw = () => {
        let re = /^[1-9a-zA-Z][1-9a-zA-Z]*/
        let value = document.getElementById("pw").value;
        if (!re.test(value))
            this.setState({pwError: "您的输入有误，密码只应该包含数字和英文字母", pwState: 0})
        else if (value.length === 0)
            this.setState({pwError: "必须输入密码)", pwState: 0})
        else if (value.length > 20)
            this.setState({pwError: "您的输入有误，密码最多20位数", pwState: 0})
        else this.setState({pwError: "", pwState: 1})
    }
    saveId = () => {
        let value = parseInt(document.getElementById("uid").value);
        if ("" === this.state.idError) this.setState({id: value})
    }
    savePw = () => {
        let value = parseInt(document.getElementById("pw").value);
        if ("" === this.state.pwError) this.setState({pw: value})
    }

    componentDidMount() {
        this.setState({
            comp: (
                <div>
                    <label>账号:</label>
                    <input
                        id="uid"
                        type="text"
                        placeholder="在这里输入纯数字账号"
                        onChange={() => this.checkId()}
                        onBlur={() => this.saveId()}
                    />
                    <p className="errorText">{this.state.idError}</p>
                    <label>密码:</label>
                    <input
                        id="pw"
                        type="password"
                        placeholder="在这里输入密码"
                        onChange={() => this.checkPw()}
                        onBlur={() => this.savePw()}
                    />
                    <p className="errorText">{this.state.pwError}</p>
                    <button onClick={() => this.submit()}>登录</button>
                </div>)
        })
    }

    render() {
        return (
            <div>{this.state.comp}</div>
        )
    }
}

export default withRouter(Comp)