import React, { Component } from 'react'

/**
 * 第一个import echarts是必须的
 * 第二个是引入的具体的一个图表类型 （可选）
 * 第三个是表的title(可选)
 * 第四个是表的工具栏组件相关的行为（可选，
   内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具）
 */
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'

class ReactEcharts extends Component {
   
    componentDidMount() {
        //初始化图表
        this.initChart();
    }
    componentWillReceiveProps(nextProps) {
        //更新图表
        this.initChart(nextProps);
    }
    /*生成图表，做了判断，如果不去判断dom有没有生成，
      每次更新图表都要生成一个dom节点*/
    initChart(props) {
        let option = props === undefined ? this.props.option : props.option;
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.getInstanceByDom(document.getElementById('main'));
        if( myChart === undefined){
            myChart = echarts.init(document.getElementById('main'));
        }
        // 绘制图表，option设置图表格式及源数据
        myChart.setOption(option);
    }

    render() {
        return (
        //width和height可由属性值传入
            <div id="main" style={{ width: 800, height: 400 }}></div>
        );
    }
};

export {ReactEcharts as default};