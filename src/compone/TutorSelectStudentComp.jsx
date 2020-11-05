import React, { Component } from 'react'
import StaticTableAsset from '../assets/StaticTableAsset'
import TableAsset from '../assets/TableAsset'
import TutorApi from '../api/TutorApi'
import ResearchAreaApi from '../api/ResearchAreaApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                    <th>学号</th>
                    <th>姓名</th>
                    <th>专业</th>
                    <th colSpan="3">研究方向</th>
                    <th>操作</th>
                </tr>
            )],
            'tbody': [(
                <tr key={-1}><td/></tr>
            )],
            'totalPage': 1,
            'thold': [(
                <tr key={-1}><td/></tr>
            )],
            'tholdHead': (
                <tr><th colSpan={4} className="link" onClick={()=>this.saveStaticData()}>保存研究志愿</th></tr>
            ),
            'numLimit':2
        }
    }
    // 添加到已选择的内容（thold），点击保存以前数据仅保存在当前页面
    addToStatic = (item) => {
        if (this.state.thold.findIndex(item => item.props.itemID === item.id) === -1){
            if (this.state.thold.length < this.state.numLimit) {
                this.setState({
                    thold: [...this.state.thold, (
                        <tr key={item.id} itemID={item.id}>
                            <td>{item.id}</td>
                            <td>{item.no}</td>
                            <td>{item.name}</td>
                            <td>{item.period}</td>
                            <td>{item.major.name}</td>
                            <td>{item.area1.name}</td>
                            <td>{item.area2.name}</td>
                            <td>{item.area3.name}</td>
                            <td className="link" onClick={() => this.dropStatic(item.id)}>移除</td>
                        </tr>
                    )]
                })
            } else {
                toast("学生已滿，如果需要增添新的学生，請移除一些舊的且没有保存的学生")
            }
        } else {
            toast("学生不能重复添加")
        }
    }
    // 从已选择的内容中移除，点击保存以前数据仅保存在当前页面
    dropFromStatic = (id) => {
        let data = this.state.thold
        data.splice(data.findIndex(item => item.props.itemID === id), 1)
        this.setState({ thold: data })
    }
    // 初始化已选择的内容
    getStaticData = () => {
        TutorApi.getAllStudentByTutorIdAndPeriod(this.props.userId, this.state.period).then((res) => {
            let thold = res.content.map((student) => {
                return (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.no}</td>
                        <td>{student.name}</td>
                        <td>{student.major.name}</td>
                        <td>{student.area1.name}</td>
                        <td>{student.area2.name}</td>
                        <td>{student.area3.name}</td>
                        <td>已保存，无法移除</td>
                    </tr>
                )
            })
            this.setState({ thold: thold })
            console.log(this.state.thold)
        })
    }
    // todo 沒寫具體方法
    // 保存已选择的内容
    saveStaticData = () => {
        let data = this.state.thold
        let ids = data.map((item)=>{
            return parseInt(item.props.itemID)
        })
        let param = {"id":parseInt(this.props.userId)}
        if (ids.length > 0) param["area1"] = {"id":ids[0]}
        if (ids.length > 1) param["area1"] = {"id":ids[1]}
        if (ids.length > 2) param["area1"] = {"id":ids[2]}
        TutorApi.saveTutor(param).then((res)=>{
            toast(res)
        })
    }
    // es6 使用箭头函数定义函数时可以省略 function 关键字
    getTableData = (page) => {
        // api的async和await使得then能获得res
        ResearchAreaApi.getAllResearchArea(page).then((res) => {
            let tbody = res.content.map((data) => {
                return (
                    <tr key={data.id} itemID={data.id}>
                        <td>{data.id}</td>
                        <td>{data.no}</td>
                        <td>{data.name}</td>
                        <td className="link" onClick={() => this.addToStatic(data.id, data.no, data.name)}>添加</td>
                    </tr>
                )
            })
            this.setState({ tbody: tbody, totalPage: res.totalPages })
        })
    }
    componentDidMount() {
        this.getStaticData()
        this.getTableData(0)
    }
    render() {
        return (
            <div>
                <div>
                <StaticTableAsset
                    thead={this.state.tholdHead}
                    tbody={this.state.thold} />
                </div>
                <br/>
                <div>
                <TableAsset
                    thead={this.state.thead}
                    tbody={this.state.tbody}
                    totalPages={this.state.totalPage}
                    getTableDate={this.getTableData} />
                </div>
                <ToastContainer />
            </div>
        )
    }
}

export default Comp