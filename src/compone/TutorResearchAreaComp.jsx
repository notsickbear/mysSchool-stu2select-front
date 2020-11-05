import React, { Component } from 'react'
import StaticTableAsset from '../assets/StaticTableAsset'
import TableAsset from '../assets/TableAsset'
import TutorApi from '../api/TutorApi'
import ResearchAreaApi from '../api/ResearchAreaApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class ResearchAreaComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "thead": [(
                <tr key={0}>
                    <th>id</th>
                    <th>编号</th>
                    <th>名称</th>
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
            )
        }
    }
    // 添加到已选择的内容（thold），点击保存以前数据仅保存在当前页面
    addToStatic = (id, no, name) => {
        if (this.state.thold.findIndex(item => item.props.itemID === id) === -1){
            if (this.state.thold.length < 3) {
                this.setState({
                    thold: [...this.state.thold, (
                        <tr key={id} itemID={id}>
                            <td>{id}</td>
                            <td>{no}</td>
                            <td>{name}</td>
                            <td className="link" onClick={() => this.dropStatic(id)}>移除</td>
                        </tr>
                    )]
                })
            } else {
                toast("研究方向已滿，如果需要增添新的研究方向，請移除一些舊的研究方向")
            }
        } else {
            toast("研究方向不能重复添加")
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
        TutorApi.getTutorById(this.props.userId).then((res) => {
            let areas = [res.area1, res.area2, res.area3]
            let thold = areas.map((area) => {
                    return (
                        <tr key={area.id} itemID={area.id}>
                            <td>{area.id}</td>
                            <td>{area.no}</td>
                            <td>{area.name}</td>
                            <td className="link" onClick={() => this.dropFromStatic(area.id)}>移除</td>
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
        let param = {"id":parseInt(this.props.userId),
            "area1":{"id":parseInt(data[0].props.itemID)},
            "area2":{"id":parseInt(data[1].props.itemID)},
            "area3":{"id":parseInt(data[2].props.itemID)}}
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

export default ResearchAreaComp