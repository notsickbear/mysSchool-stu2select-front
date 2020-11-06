import React, {Component} from 'react'
import TableAsset from '../assets/TableAsset'
import StudentApi from '../api/StudentApi'
import SelectStateApi from "../api/SelectStateApi";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TutorApi from "../api/TutorApi";

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
                    <th>编号</th>
                    <th>姓名</th>
                    <th>专业</th>
                    <th colSpan="3">志愿/研究方向</th>
                    <th>操作</th>
                </tr>
            )],
            'tbody': [(
                <tr key={-1}>
                    <td/>
                </tr>
            )],
            'totalPage': 1
        }
    }

    //  保存已选择的内容
    saveSelectData = (stuId, turId) => {
        let param = {
            student: {"id": parseInt(stuId)},
            selectState: 1,
            finalTutor: {"id": parseInt(turId)}
        }
        SelectStateApi.getSelectStateByStuIdAndPeriod(
            parseInt(stuId), this.state.period).then((res) => {
            param["id"] = res.id
            SelectStateApi.saveSelectState(param).then((ret) => {
                toast(ret)
                this.getTableData(0)
            })
        })
    }
    // es6 使用箭头函数定义函数时可以省略 function 关键字
    getTutorTableData = (stuId, page) => {
        StudentApi.getAllEnableTutor(page).then((res) => {
            const tbody = res.content.map((item) => {
                if (item.major === null) item.major = {"name": ""}
                if (item.area1 === null) item.area1 = {"name": ""}
                if (item.area2 === null) item.area2 = {"name": ""}
                if (item.area3 === null) item.area3 = {"name": ""}
                return (
                    <tr key={item.id} itemID={item.id}>
                        <td>{item.id}</td>
                        <td>{item.no}</td>
                        <td>{item.name}</td>
                        <td>{item.major.name}</td>
                        <td>{item.area1.name}</td>
                        <td>{item.area2.name}</td>
                        <td>{item.area3.name}</td>
                        <td className="link" onClick={() => this.saveSelectData(stuId, item.id)}>选择该导师</td>
                    </tr>
                )
            });
            this.setState({tbody: tbody, totalPage: res.totalPages})
        })
    }
    getTableData = (page) => {
        TutorApi.getAllEnableStudent(this.state.period, page).then((res) => {
            const tbody = res.content.map((student) => {
                if (student.major === null) student.major = {"name": ""}
                if (student.area1 === null) student.area1 = {"name": ""}
                if (student.area2 === null) student.area2 = {"name": ""}
                if (student.area3 === null) student.area3 = {"name": ""}
                return (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.no}</td>
                        <td>{student.name}</td>
                        <td>{student.major.name}</td>
                        <td>{student.area1.name}</td>
                        <td>{student.area2.name}</td>
                        <td>{student.area3.name}</td>
                        <td className="link" onClick={() => this.getTutorTableData(student.id, 0)}>为该学生分配导师</td>
                    </tr>
                )
            });
            this.setState({tbody: tbody, totalPage: res.totalPages})
        })
    }

    componentDidMount() {
        this.getTableData(0)
    }

    render() {
        return (
            <div>
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

export default Comp