import React, {Component} from 'react'
import StudentPage from '../page/StudentPage'
import StudentApi from '../api/StudentApi'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from "react-router-dom";
import { Table, } from 'antd'
import 'antd/dist/antd.css'

export class Comp extends Component {
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
            ],
            'tbody': [],
            'tholdpag': {hideOnSinglePage:true},
            'pagination': {total: 1, hideOnSinglePage:true},
            'loading': false,
        }
    }
 // 整理数据
 formatData = (item) => {
        if (item.major === null) item.major = { name: "/" }
        if (item.area1 === null) item.area1 = { name: "/" }
        if (item.area2 === null) item.area2 = { name: "/" }
        if (item.area3 === null) item.area3 = { name: "/" }
}

    // 使用箭头函数定义函数时可以省略 function 关键字
    getTableData = () => {
        // api的async和await使得then能获得res
        StudentApi.getStudentById(this.props.location.state.userId).then((res) => {
            console.log(res)
            this.formatData(res.tutor)
            this.setState({ tbody: [res.tutor], pagination:{total:res.totalElements} })
        })
    }

    componentDidMount() {
        this.getTableData(0)
    }

    render() {
        const { thead, tbody, loading, pagination } = this.state
        return (
            <div>
                <StudentPage userId={this.props.location.state.userId} />
                <Table columns={thead} dataSource={tbody} loading={loading} pagination={pagination} />
                <ToastContainer />
            </div>
        )
    }
}

export default withRouter(Comp)