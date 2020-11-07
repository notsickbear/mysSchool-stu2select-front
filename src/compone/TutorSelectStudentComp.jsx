import React, {Component} from 'react'
import StaticTableAsset from '../assets/StaticTableAsset'
import TableAsset from '../assets/TableAsset'
import TutorApi from '../api/TutorApi'
import SelectStateApi from "../api/SelectStateApi";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from "react-router-dom";

export class Comp extends Component {
    constructor(props) {
        super(props)
        let date = new Date()
        let nowYear = date.getFullYear()
        this.state = {
            'period': nowYear,
            "thead": [(
                <tr key={0}>
                    <th>id</th>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>专业</th>
                    <th colSpan="3">志愿方向</th>
                    <th>操作</th>
                </tr>
            )],
            'tbody': [(
                <tr key={-1}>
                    <td/>
                </tr>
            )],
            'totalPage': 1,
            'thold': [(
                <tr key={-1}>
                    <td/>
                </tr>
            )],
            'tholdHead': (
                <tr>
                    <th colSpan={8} className="link" onClick={() => this.saveStaticData()}>保存学生选择</th>
                </tr>
            ),
            'numLimit': 2
        }
    }

    // 添加到已选择的内容（thold），点击保存以前数据仅保存在当前页面
    addToStatic = (item) => {
        if (this.state.thold.findIndex(item => item.props.itemID === item.id) === -1) {
            if (this.state.thold.length < this.state.numLimit) {
                if (item.major === null) item.major = {"name": ""}
                if (item.area1 === null) item.area1 = {"name": ""}
                if (item.area2 === null) item.area2 = {"name": ""}
                if (item.area3 === null) item.area3 = {"name": ""}
                this.setState({
                    thold: [...this.state.thold, (
                        <tr key={item.id} itemID={item.id}>
                            <td>{item.id}</td>
                            <td>{item.no}</td>
                            <td>{item.name}</td>
                            <td>{item.major.name}</td>
                            <td>{item.area1.name}</td>
                            <td>{item.area2.name}</td>
                            <td>{item.area3.name}</td>
                            <td className="link" onClick={() => this.dropFromStatic(item.id)}>移除</td>
                        </tr>
                    )]
                })
            } else {
                toast("学生已滿，如果需要增添新的学生，請移除一些舊的且没有保存的学生")
            }
        } else {
            toast("学生不能重复添加")
        }
    }
    leapTo=()=>{
        this.props.history.push({pathname: "/tutor/myStudent", state: {userId: this.props.location.state.userId},})
    }
    // 从已选择的内容中移除，点击保存以前数据仅保存在当前页面
    dropFromStatic = (id) => {
        let data = this.state.thold
        data.splice(data.findIndex(item => item.props.itemID === id), 1)
        this.setState({thold: data})
    }
    // 初始化已选择的内容
    getStaticData = () => {
        TutorApi.getAllStudentByTutorIdAndPeriod(this.props.location.state.userId, this.state.period).then((res) => {
            let thold = res.content.map((student) => {
                if (student.major === null) student.major = {"name": ""}
                if (student.area1 === null) student.area1 = {"name": ""}
                if (student.area2 === null) student.area2 = {"name": ""}
                if (student.area3 === null) student.area3 = {"name": ""}
                return (
                    <tr key={student.id} itemID={student.id}>
                        <td>{student.id}</td>
                        <td>{student.no}</td>
                        <td>{student.name}</td>
                        <td>{student.major.name}</td>
                        <td>{student.area1.name}</td>
                        <td>{student.area2.name}</td>
                        <td>{student.area3.name}</td>
                        <td>已保存，无法移除</td>
                    </tr>
                )
            })
            this.setState({thold: thold})
        })
    }
    //  保存已选择的内容
    saveStaticData = () => {
        let data = this.state.thold
        // eslint-disable-next-line array-callback-return
        data.map((item) => {
            let param = {
                student: {"id": parseInt(item.props.itemID)},
                selectState: 1,
                finalTutor: {"id": parseInt(this.props.location.state.userId)}
            }
            SelectStateApi.getSelectStateByStuIdAndPeriod(
                parseInt(item.props.itemID), this.state.period).then((res) => {
                param["id"] = res.id
                console.log(param)
                SelectStateApi.saveSelectState(param).then((ret) => {
                    toast(ret)
                    this.getStaticData()
                    this.getTableData(0)
                })
            })
        })
    }
    // es6 使用箭头函数定义函数时可以省略 function 关键字
    getTableData = (page) => {
        TutorApi.getSmartSortStudent(this.props.location.state.userId, this.state.period, page).then((res) => {
            const tbody = res.content.map((student, index) => {
                if (student.major === null) student.major = {"name": ""}
                if (student.area1 === null) student.area1 = {"name": ""}
                if (student.area2 === null) student.area2 = {"name": ""}
                if (student.area3 === null) student.area3 = {"name": ""}
                return (
                    <tr key={index} itemID={student.id}>
                        <td>{student.id}</td>
                        <td>{student.no}</td>
                        <td>{student.name}</td>
                        <td>{student.major.name}</td>
                        <td>{student.area1.name}</td>
                        <td>{student.area2.name}</td>
                        <td>{student.area3.name}</td>
                        <td className="link" onClick={() => this.addToStatic(student)}>添加</td>
                    </tr>
                )
            });
            this.setState({tbody: tbody, totalPage: res.totalPages})
        })
    }

    componentDidMount() {
        TutorApi.getTutorById(this.props.location.state.userId).then((res) => {
            this.setState({numLimit: res.numLimit})
            this.getStaticData()
            this.getTableData(0)
        })
    }

    render() {
        return (
            <div>
                <div>
                    <StaticTableAsset
                        thead={this.state.tholdHead}
                        tbody={this.state.thold}
                        numLimit={this.state.numLimit}
                    />
                </div>
                <br/>
                <div>
                    <TableAsset
                        thead={this.state.thead}
                        tbody={this.state.tbody}
                        totalPages={this.state.totalPage}
                        getTableDate={this.getTableData}/>
                </div>
                <ToastContainer/>
            </div>
        )
    }
}

export default withRouter(Comp)