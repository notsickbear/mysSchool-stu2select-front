import React, { Component } from 'react'
import AdminPage from '../page/AdminPage'
import StudentApi from '../api/StudentApi'
import TutorApi from "../api/TutorApi";
import SelectStateApi from "../api/SelectStateApi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table,Space,Button } from 'antd'
import 'antd/dist/antd.css'
import {withRouter} from "react-router-dom";

export class Comp extends Component {
    constructor(props) {
        super(props)
        let date = new Date()
        let nowYear = date.getFullYear()
        let head = [
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
        ]
        this.state = {
            'period': nowYear,
            "thead": [...head],
            'head':[...head],
            'tbody': [],
            'pagination': {total: 1, hideOnSinglePage:true, onChange: this.getTableData},
        }
    }

    //  保存已选择的内容
    saveSelectData = (stuId, turId) => {
        let param = {
            student: { "id": parseInt(stuId) },
            selectState: 1,
            finalTutor: { "id": parseInt(turId) }
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
            this.formatData(res.content)
            this.setState({
                tbody: res.content, 
                pagination:{total:res.totalElements},
                thead: [
                    ...this.state.head,
                    {
                        title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => this.saveSelectData(stuId, record.id)}>选择该导师</Button>
                        </Space>
                    ),
                    }
                ]
            })
        })
    }

    getTableData = (page) => {
        TutorApi.getAllEnableStudent(this.state.period, page).then((res) => {
            this.formatData(res.content)
            this.setState({
                tbody: res.content, 
                pagination:{total:res.totalElements},
                thead: [
                    ...this.state.head,
                    {
                        title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => this.getTutorTableData(record.id, 0)}>为该学生分配导师</Button>
                        </Space>
                    ),
                    }
                ]
            })
        })
    }

    componentDidMount() {
        this.getTableData(0)
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

    render() {
        const { thead, tbody, loading, pagination } = this.state
        return (
            <div>
                <AdminPage userId={this.props.location.state.userId} />
                <Table columns={thead} dataSource={tbody} loading={loading} pagination={pagination} />
                <ToastContainer />
            </div>
        )
    }
}

export default withRouter(Comp)