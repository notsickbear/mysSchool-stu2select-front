import React, {Component} from 'react'
import TableAsset from '../assets/TableAsset'
import StudentApi from '../api/StudentApi'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from "react-router-dom";

export class TutorMyStudentComp extends Component {
    constructor(props) {
        super(props)
        let date = new Date()
        let nowYear = date.getFullYear()
        this.state = {
            'period': nowYear,
            'period_list': (
                <select>
                    <option value={nowYear} defaultValue>{nowYear}</option>
                </select>),
            "thead": [(
                <tr key={0}>
                    <th>id</th>
                    <th>职工号</th>
                    <th>姓名</th>
                    <th>专业</th>
                    <th colSpan="3">研究方向</th>
                </tr>
            )],
            'tbody': [(
                <tr key={-1}>
                    <td/>
                </tr>
            )],
            'totalPages': 1
        }
    }

    // 使用箭头函数定义函数时可以省略 function 关键字
    getTableData = () => {
        console.log(this.props.location.state.userId)
        // api的async和await使得then能获得res
        StudentApi.getStudentById(this.props.location.state.userId).then((res) => {
            let item = res.tutor
            let tbody
            if (item === null){
                tbody = (<tr><td  colSpan="7">你还没有导师</td></tr>)
            }else{
                if (item.major === null) item.major = {"name": ""}
                if (item.area1 === null) item.area1 = {"name": ""}
                if (item.area2 === null) item.area2 = {"name": ""}
                if (item.area3 === null) item.area3 = {"name": ""}
                tbody = (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.no}</td>
                        <td>{item.name}</td>
                        <td>{item.major.name}</td>
                        <td>{item.area1.name}</td>
                        <td>{item.area2.name}</td>
                        <td>{item.area3.name}</td>
                    </tr>
                )
            }
            
            this.setState({tbody: tbody, totalPage: 1})
        })
    }

    componentDidMount() {
        this.getTableData(0)
    }

    render() {
        return (
            <div>
                <TableAsset
                    thead={this.state.thead}
                    tbody={this.state.tbody}
                    totalPages={this.state.totalPage}
                    getTableDate={this.getTableData}/>
                <ToastContainer/>
            </div>
        )
    }
}

export default withRouter(TutorMyStudentComp)