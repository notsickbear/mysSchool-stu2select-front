import React, { Component } from 'react'
import ReactEcharts from '../assets/ReactEcharts'
import proTypeApi from '../api/ProTypeApi'

export class ProTypePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            res: "",
            option: {
                title: {
                    text: '畅销商品种类TOP10'
                },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: [],
                    axisLabel: {
                        interval: 0,
                        rotate: -15
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: []
                }]
            }
        }
    }
 /*   getchartData = (num) => {
        // api的async和await使得then能获得res
        proApi.getSaltedPro(num).then((res) => {
            //var data = JSON.parse(res)
            this.setState({ res: res })
            console.log(res)
        })
    }*/
    //数据发生变化后更新option，由state管理
    getOption = (num) => {
        proTypeApi.getSaltedType(num).then((res) => {
            console.log(res)
            var data = Object.values(res)
            for (let index = 0; index < data.length; index++) {
                data[index] = parseInt(data[index])
            }
            let option = {
                title: {
                    text: '畅销商品种类TOP10'
                },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: Object.keys(res),
                    axisLabel: {
                        interval: 0,
                        rotate: -15
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: data
                }]
            }
            this.setState({ option: option })
            //return option
        })
    }

    componentDidMount() {
        //this.getchartData(10)
        //this.getOption()
        this.getOption(10)
    }
    render() {
        
        return (
            <div>
                <ReactEcharts option={this.state.option}></ReactEcharts>
            </div>
        )
    }
}

export default ProTypePage
