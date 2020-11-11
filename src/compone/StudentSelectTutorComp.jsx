import React, {Component} from 'react'
import StudentPage from '../page/StudentPage'
import StudentApi from '../api/StudentApi'
import SelectStateApi from '../api/SelectStateApi'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from "react-router-dom";
import { Table, Space, Button } from 'antd'
import 'antd/dist/antd.css'

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
                title: '职工号',
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
            "tholdhead": [
                ...head,
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => {
                        if (record.selectState === 0) return (
                            <Space size="middle">
                                <Button type="primary" onClick={() => this.dropFromStatic(parseInt(record.id))}>移除</Button>
                            </Space>
                        )
                        else return (
                            <Space size="middle">
                                <b>该导师选择了你</b>
                            </Space>
                        )
                    },
                },
            ],
            "thead": [
                ...head,
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
            'tholdpag': {hideOnSinglePage:true,  onChange: this.getStaticData},
            'pagination': {total: 1, hideOnSinglePage:true, onChange: this.getTableData},
            'numLimit': 3,
            'loading': false,
        }
    }

    // 添加到已选择的内容（thold），点击保存以前数据仅保存在当前页面
    addToStatic = (item) => {
        console.log(this.state.thold.findIndex(item => item.props.itemID === item.id))
        if (this.state.thold.findIndex(item => item.props.itemID === item.id) === -1) {
            if (this.state.thold.length < this.state.numLimit) {
                this.setState({ thold: [...this.state.thold, item] })
            } else {
                toast("导师已滿，如果需要增添新的导师，請移除一些舊的且没有保存的导师")
            }
        } else {
            toast("导师不能重复添加")
        }
    }
    // 从已选择的内容中移除，点击保存以前数据仅保存在当前页面
    dropFromStatic = (id) => {
        let data = this.state.thold
        data.splice(data.findIndex(item => item.id === id), 1)
        this.setState({thold: data})
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

    // 初始化已选择的内容
    getStaticData = () => {
        SelectStateApi.getSelectStateByStuIdAndPeriod(this.props.location.state.userId, this.state.period).then((res) => {
            let areas = [res.tutor1, res.tutor2, res.tutor3]
            this.setState({ thold:areas})
        })
    }
    //  保存已选择的内容
    saveStaticData = () => {
        let data = this.state.thold
        data.map((item) => {
            let param = {
                student: {"id": parseInt(item.id)},
                selectState: 1,
                finalTutor: {"id": parseInt(this.props.location.state.userId)}
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
            return 1
        })
    }
    // es6 使用箭头函数定义函数时可以省略 function 关键字
    getTableData = (page) => {
        StudentApi.getSmartSortTutor(this.props.location.state.userId, page).then((res) => {
            this.formatData(res.content)
            this.setState({ tbody: res.content, pagination:{total:res.totalElements} })
        })
    }

    componentDidMount() {
        this.getStaticData()
        this.getTableData(0)
    }

    render() {
        const { thead, tbody, loading, tholdhead, thold, tholdpag, pagination } = this.state
        return (
            <div>
                <StudentPage userId={this.props.location.state.userId} />
                <h1>预览已选项</h1>
                <Table columns={tholdhead} dataSource={thold} loading={loading} pagination={tholdpag} />
                <h1>可选项</h1>
                <Table columns={thead} dataSource={tbody} loading={loading} pagination={pagination} />
                <ToastContainer />
            </div>
        )
    }
}

export default withRouter(Comp)