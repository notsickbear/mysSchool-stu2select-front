import React, {Component} from 'react'
import StaticTableAsset from '../assets/StaticTableAsset'
import TableAsset from '../assets/TableAsset'
import StudentApi from '../api/StudentApi'
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
                    <th>职工号</th>
                    <th>姓名</th>
                    <th>专业</th>
                    <th colSpan="3">研究方向</th>
                    <th>数量限制</th>
                </tr>
            )],
            'tbody': [(
                <tr key={-1}>
                    <td/>
                </tr>
            )],
            'totalPage': 1,
            'thold': [(<tr key={-1}>
                <td/>
            </tr>)],
            'tholdHead': (<tr>
                <th colSpan={4}>该页面会在选择框失去焦点以后自动保存</th>
            </tr>),
            'numLimit': 3
        }
    }

    //  todo 修改后导师没了 保存已选择的内容
    saveTutorData = (id, value) => {
        let param = {
            "id": parseInt(id),
            "numLimit": parseInt(value)
        }
        TutorApi.saveTutor(param).then((res) => {
            toast(res)
            this.getTableData(0)
        })
    }
    // es6 使用箭头函数定义函数时可以省略 function 关键字
    getTableData = (page) => {
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
                        <td><select onBlur={() => this.saveTutorData(item.id, this.value)}>
                            <option value={item.numLimit} defaultValue>{item.numLimit}</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select></td>
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

export default Comp