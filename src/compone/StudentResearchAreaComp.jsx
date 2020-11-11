import React, {Component} from 'react'
import StudentPage from '../page/StudentPage'
import StudentApi from '../api/StudentApi'
import ResearchAreaApi from '../api/ResearchAreaApi'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from "react-router-dom";
import { Table, Space, Button } from 'antd'
import 'antd/dist/antd.css'

export class ResearchAreaComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
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
            'tholdhead': [
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
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => this.dropFromStatic(parseInt(record.id))}>移除</Button>
                        </Space>
                    ),
                },
            ],
            'tholdpag': {hideOnSinglePage:true},
            'pagination': {total: 1, hideOnSinglePage:true, onChange:this.getTableData},
            'numLimit': 3,
            'loading': false,
        }
    }

    // 添加到已选择的内容（thold），点击保存以前数据仅保存在当前页面
    addToStatic = (item) => {
        if (this.state.thold.findIndex(itemx => itemx.id === item.id) === -1) {
            if (this.state.thold.length < this.state.numLimit) {
                this.setState({ thold: [...this.state.thold, item] })
            } else {
                toast("研究方向已滿，如果需要增添新的研究方向，請移除一些舊的研究方向")
            }
        } else {
            toast("研究方向不能重复添加")
        }
    }

    // 从已选择的内容中移除，点击保存以前数据仅保存在当前页面(移除以后不对自动更新页面)
    dropFromStatic = (id) => {
        let data = this.state.thold
        console.log(data)
        data.splice(data.findIndex(item => item.id === id), 1)
        this.setState({ thold: data })
        console.log(this.state.thold)
    }

    // 初始化已选择的内容
    getStaticData = () => {
        StudentApi.getStudentById(parseInt(this.props.location.state.userId)).then((res) => {
            let thold = [res.area1, res.area2, res.area3]
            console.log(res)
            this.setState({ thold: thold })
        })
    }
    // 保存已选择的内容
    saveStaticData = () => {
        let data = this.state.thold
        let ids = data.map((item) => {
            return parseInt(item.id)
        })
        let param = {"id": parseInt(this.props.location.state.userId)}
        if (ids.length > 0) param["area1"] = {"id": ids[0]}
        if (ids.length > 1) param["area1"] = {"id": ids[1]}
        if (ids.length > 2) param["area1"] = {"id": ids[2]}
        StudentApi.saveStudent(param).then((res) => {
            toast(res)
        })
    }
    // es6 使用箭头函数定义函数时可以省略 function 关键字
    getTableData = (page) => {
        // api的async和await使得then能获得res
        ResearchAreaApi.getAllResearchArea(page).then((res) => {
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

export default withRouter(ResearchAreaComp)