import React, { Component } from 'react'
import TutorApi from '../api/TutorApi'
import TutorPage from '../page/TutorPage'
import SelectStateApi from "../api/SelectStateApi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from "react-router-dom";
import { Table, Space, Button } from 'antd'
import 'antd/dist/antd.css'

export class Comp extends Component {
    constructor(props) {
        super(props)
        let date = new Date()
        let nowYear = date.getFullYear()
        this.state = {
            'period': nowYear,
            "tholdhead": [
                {
                    title: 'id',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '学号',
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
                    render: (text, record) => {
                        if (record.selectState === 0) return (
                            <Space size="middle">
                                <Button type="primary" onClick={() => this.dropFromStatic(record.id)}>移除</Button>
                            </Space>
                        )
                        else return (
                            <Space size="middle">
                                <b>已保存不可移除</b>
                            </Space>
                        )
                    },
                },
            ],
            "thead": [
                {
                    title: 'id',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '学号',
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
                            <Button type="primary" onClick={() => this.addToStatic(record)}>添加</Button>
                        </Space>
                    ),
                },
            ],
            'tbody': [],
            'thold': [],
            'totalElements': 1,
            'numLimit': 2,
            loading: false,
        }
    }

    // 添加到已选择的内容（thold），点击保存以前数据仅保存在当前页面
    addToStatic = (item) => {
        if (this.state.thold.findIndex(itemx => itemx.id === item.id) === -1) {
            if (this.state.thold.length < this.state.numLimit) {
                this.setState({ thold: [...this.state.thold, item] })
            } else {
                toast("学生已滿，如果需要增添新的学生，請移除一些舊的且没有保存的学生")
            }
        } else {
            toast("学生不能重复添加")
        }
    }

    leapTo = () => {
        this.props.history.push({ pathname: "/tutor/myStudent", state: { userId: this.props.location.state.userId }, })
    }

    // 从已选择的内容中移除，点击保存以前数据仅保存在当前页面
    dropFromStatic = (id) => {
        let data = this.state.thold
        data.splice(data.findIndex(itemx => itemx.id === id), 1)
        this.setState({ thold: data })
    }

    // 整理数据
    formatData = (data) => {
        data.map((item) => {
            if (item.major === null) item.major = { name: "/" }
            if (item.area1 === null) item.area1 = { name: "/" }
            if (item.area2 === null) item.area2 = { name: "/" }
            if (item.area3 === null) item.area3 = { name: "/" }
            return 1
        })
    }

    // 初始化已选择的内容
    getStaticData = () => {
        TutorApi.getAllStudentByTutorIdAndPeriod(this.props.location.state.userId, this.state.period).then((res) => {
            this.formatData(res.content)
            this.setState({ thold: res.content })
        })
    }

    //  保存已选择的内容
    saveStaticData = () => {
        let data = this.state.thold
        // eslint-disable-next-line array-callback-return
        data.map((item) => {
            if (item.selectState === 0) {
                let param = {
                    student: { id: item.id },
                    selectState: 1,
                    finalTutor: { "id": parseInt(this.props.location.state.userId) }
                }
                SelectStateApi.getSelectStateByStuIdAndPeriod(
                    parseInt(item.id), this.state.period).then((res) => {
                        param["id"] = res.id
                        console.log(param)
                        SelectStateApi.saveSelectState(param).then((ret) => {
                            toast(ret)
                            this.getStaticData()
                            this.getTableData(0)
                        })
                    })
            }
        })
    }
    
    // 獲取可選的學生數據
    getTableData = (page) => {
        TutorApi.getSmartSortStudent(this.props.location.state.userId, this.state.period, page).then((res) => {
            console.log(res)
            this.formatData(res.content)
            this.setState({ tbody: res.content, totalElements: res.totalPages })
        })
    }

    componentDidMount() {
        TutorApi.getTutorById(this.props.location.state.userId).then((res) => {
            console.log(res)
            this.setState({ numLimit: res.numLimit })
            this.getStaticData()
            this.getTableData(0)
        })
    }

    render() {
        const { thead, tbody, loading, tholdhead, thold, totalElements } = this.state
        return (
            <div>
                <TutorPage userId={this.props.location.state.userId} />
                <Button type="primary" onClick={() => this.saveStaticData()}>保存学生选择</Button>
                <Table columns={tholdhead} dataSource={thold} loading={loading} pagination={totalElements} />
                <Table columns={thead} dataSource={tbody} loading={loading} />
                <ToastContainer />
            </div>
        )
    }
}

export default withRouter(Comp)