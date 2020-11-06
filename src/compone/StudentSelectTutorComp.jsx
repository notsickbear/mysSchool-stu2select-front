import React, {Component} from 'react'
import StaticTableAsset from '../assets/StaticTableAsset'
import TableAsset from '../assets/TableAsset'
import StudentApi from '../api/StudentApi'
import SelectStateApi from "../api/SelectStateApi";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import StudentMyTutorComp from "./StudentMyTutorComp";

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
                    <th colSpan="3">志愿方向</th>
                    <th>操作</th>
                </tr>
            )],
            'tbody': [(
                <tr key={-1}>
                    <td/>
                </tr>
            )],
            'totalPage': 1,
            'thold': [(
                <tr key={-1}>
                    <td/>
                </tr>
            )],
            'tholdHead': (
                <tr>
                    <th colSpan={8} className="link" onClick={() => this.saveStaticData()}>保存学生选择</th>
                </tr>
            ),
            'numLimit': 3
        }
    }

    // 添加到已选择的内容（thold），点击保存以前数据仅保存在当前页面
    addToStatic = (item) => {
        if (this.state.thold.findIndex(item => item.props.itemID === item.id) === -1) {
            if (this.state.thold.length < this.state.numLimit) {
                if (item.major === null) item.major = {"name": ""}
                if (item.area1 === null) item.area1 = {"name": ""}
                if (item.area2 === null) item.area2 = {"name": ""}
                if (item.area3 === null) item.area3 = {"name": ""}
                this.setState({
                    thold: [...this.state.thold, (
                        <tr key={item.id} itemID={item.id}>
                            <td>{item.id}</td>
                            <td>{item.no}</td>
                            <td>{item.name}</td>
                            <td>{item.major.name}</td>
                            <td>{item.area1.name}</td>
                            <td>{item.area2.name}</td>
                            <td>{item.area3.name}</td>
                            <td className="link" onClick={() => this.dropFromStatic(item.id)}>移除</td>
                        </tr>
                    )]
                })
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
        data.splice(data.findIndex(item => item.props.itemID === id), 1)
        this.setState({thold: data})
    }
    // 初始化已选择的内容
    getStaticData = () => {
        SelectStateApi.getSelectStateByStuIdAndPeriod(this.props.userId, this.state.period).then((res) => {
            if (res.selectState === 1) {
                let tholdHead = <tr>
                    <td><Router><Switch>
                        <Route path="/student/myTutor"><StudentMyTutorComp userId={this.props.userId}/></Route>
                        <Route path="/student">
                            <Link to="/student/myTutor"><p className="link">你已经被导师选中了，快来查看你的导师</p></Link>
                        </Route></Switch></Router></td>
                </tr>
                this.setState({tholdHead: tholdHead})
            } else {
                let areas = [res.tutor1, res.tutor2, res.tutor3]
                let thold = areas.map((area) => {
                    if (area.major === null) area.major = {"name": ""}
                    if (area.area1 === null) area.area1 = {"name": ""}
                    if (area.area2 === null) area.area2 = {"name": ""}
                    if (area.area3 === null) area.area3 = {"name": ""}
                    return (
                        <tr key={area.id} itemID={area.id}>
                            <td>{area.id}</td>
                            <td>{area.no}</td>
                            <td>{area.name}</td>
                            <td>{area.major.name}</td>
                            <td>{area.area1.name}</td>
                            <td>{area.area2.name}</td>
                            <td>{area.area3.name}</td>
                            <td className="link" onClick={() => this.dropFromStatic(area.id)}>移除</td>
                        </tr>
                    )
                })
                this.setState({thold: thold})
            }
        })
    }
    //  保存已选择的内容
    saveStaticData = () => {
        let data = this.state.thold
        data.map((item) => {
            let param = {
                student: {"id": parseInt(item.props.itemID)},
                selectState: 1,
                finalTutor: {"id": parseInt(this.props.userId)}
            }
            SelectStateApi.getSelectStateByStuIdAndPeriod(
                parseInt(item.props.itemID), this.state.period).then((res) => {
                param["id"] = res.id
                console.log(param)
                SelectStateApi.saveSelectState(param).then((ret) => {
                    toast(ret)
                    this.getStaticData()
                    this.getTableData(0)
                })
            })
            return
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
                        <td className="link" onClick={() => this.addToStatic(item)}>添加</td>
                    </tr>
                )
            });
            this.setState({tbody: tbody, totalPage: res.totalPages})
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