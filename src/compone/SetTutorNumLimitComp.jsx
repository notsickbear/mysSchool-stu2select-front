import React, {Component} from 'react'
import AdminPage from '../page/AdminPage'
import StudentApi from '../api/StudentApi'
import TutorApi from "../api/TutorApi";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table,Space } from 'antd'
import 'antd/dist/antd.css'
import {withRouter} from "react-router-dom";

export class Comp extends Component {
    constructor(props) {
        super(props)
        let date = new Date()
        let nowYear = date.getFullYear()
        this.state = {
            'period': nowYear,
            "thead": [
                {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '编号',
                dataIndex: 'no',
                key: 'no',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '专业',
                dataIndex: 'major',
                render: major => `${major.name}`,
                key: 'major',
            },
            {
                title: '志愿方向1',
                dataIndex: 'area1',
                render: area1 => `${area1.name}`,
                key: 'area1',
            },
            {
                title: '志愿方向2',
                dataIndex: 'area2',
                render: area2 => `${area2.name}`,
                key: 'area2',
            },
            {
                title: '志愿方向3',
                dataIndex: 'area3',
                render: area3 => `${area3.name}`,
                key: 'area3',
            },
            {
                title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <select onBlur={() => this.saveTutorData(record.id, this.value)}>
                            <option value={record.numLimit} defaultValue>{record.numLimit}</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                </Space>
            ),
            },
        ],
            'tbody': [],
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
            this.formatData(res.content)
            this.setState({tbody: res.content, pagination:{total:res.totalElements}})
        })
    }

        // 整理数据
        formatData = (data) => {
            for (let i = 0; i < data.length; i++){
                if (data[i] === null) data.splice(i--, 1)
            }
            data.map((item) => {
                if (item.major === null) item.major = { name: "/" }
                if (item.area1 === null) item.area1 = { name: "/" }
                if (item.area2 === null) item.area2 = { name: "/" }
                if (item.area3 === null) item.area3 = { name: "/" }
                return 1
            })
        }

    componentDidMount() {
        this.getTableData(0)
    }

    render() {
        const { thead, tbody, loading, pagination } = this.state
        return (
            <div>
                <AdminPage userId={this.props.location.state.userId} />
                <h1>该页面会在选择框失去焦点以后自动保存</h1>
                <Table columns={thead} dataSource={tbody} loading={loading} pagination={pagination} />
                <ToastContainer/>
            </div>
        )
    }
}

export default withRouter(Comp)