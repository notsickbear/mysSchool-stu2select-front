import React, {Component} from 'react'
import TableAsset from '../assets/TableAsset'
import TutorApi from '../api/TutorApi'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                    <th>学号</th>
                    <th>姓名</th>
                    <th>专业</th>
                    <th colSpan="3">志愿方向</th>
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
    getTableData = (page) => {
        // api的async和await使得then能获得res
        TutorApi.getAllStudentByTutorIdAndPeriod(this.props.userId, this.state.period, page).then((res) => {
            const tbody = res.content.map((student) => {
                return (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.no}</td>
                        <td>{student.name}</td>
                        <td>{student.major.name}</td>
                        <td>{student.area1.name}</td>
                        <td>{student.area2.name}</td>
                        <td>{student.area3.name}</td>
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
                <label>选择要查看的届数</label>
                {this.state.period_list}
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

export default TutorMyStudentComp