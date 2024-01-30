import { Component } from "react";
import {getCurrentInstance} from '@tarojs/taro'
import { View } from "@tarojs/components";
import * as echarts from "../../components/ec-canvas/echarts"
import geoJson from '../../components/ec-canvas/china.json'
import './index.less'
import Fetch from '../../../Service/fetch'

// let pieDataA = null;
export default class Index extends Component {

 
  constructor(props) {
    super(props)
    const params = getCurrentInstance()
    const param = params.router.params
    console.log(param)
    const areadata=  JSON.parse(param.area)
    const yearData = JSON.parse(param.yeardata)
    this.state = {
      /* ec1: {
        onInit: function (canvas, width, height) {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(chart);
          const option = {
            title: {
              text: '被救助人诉求分类',
              left: 'right'
             },
        
            tooltip: {
              trigger: 'item'
            },
            legend: {
              top: 'bottom',
              left: 'center'
            },
            series: [
              {
                name: '诉求分类',
                type: 'pie',
                bottom:'7%',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: 'transparent',
                  borderWidth: 2,
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 35,
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [
                  { value: 1048, name: '工作压力' },
                  { value: 735, name: '家庭矛盾' },
                  { value: 580, name: '产后抑郁' },
                  { value: 484, name: '学业压力' },
                  { value: 300, name: '情感受挫' }
                ]
              }
            ]
          };
          chart.setOption(option)
          return chart;
        }
      }, */
      ec2:{
        onInit: function (canvas, width, height) {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
        /*  chart.showLoading();
          chart.hideLoading(); */
          echarts.registerMap('china', geoJson);
          canvas.setChart(chart);
          const  data = areadata.map((item)=>{return ( {name:item.name ,value: item.rescue_frequency})})
             
         /*  const  data=[
              {name:'北京市',value:1234},
              {name: '天津市',value: 231},
              {name: '上海市',value: 892},
              {name: '重庆市',value: 2342},
              {name: '河北省',value: 121},
              {name: '河南省',value: 234},
              {name: '云南省',value: 977},
              {name: '辽宁省',value: 1453},
              {name: '黑龙江省',value: 438},
              {name: '湖南省',value: 1865},
              {name: '安徽省',value: Math.round(Math.random()*1000)},
              {name: '山东省',value: Math.round(Math.random()*1000)},
              {name: '新疆维吾尔自治区',value: 453},
              {name: '江苏省',value: Math.round(Math.random()*1000)},
              {name: '浙江省',value: Math.round(Math.random()*1000)},
              {name: '江西省',value: Math.round(Math.random()*1000)},
              {name: '湖北省',value: Math.round(Math.random()*1000)},
              {name: '广西壮族自治区',value: Math.round(Math.random()*1000)},
              {name: '甘肃省',value: Math.round(Math.random()*1000)},
              {name: '山西省',value: Math.round(Math.random()*1000)},
              {name: '内蒙古自治区',value:493},
              {name: '陕西省',value: Math.round(Math.random()*1000)},
              {name: '吉林省',value: Math.round(Math.random()*1000)},
              {name: '福建省',value: Math.round(Math.random()*1000)},
              {name: '贵州省',value: Math.round(Math.random()*1000)},
              {name: '广东省',value: Math.round(Math.random()*1000)},
              {name: '青海省',value: Math.round(Math.random()*1000)},
              {name: '西藏自治区',value: Math.round(Math.random()*1000)},
              {name: '四川省',value: Math.round(Math.random()*1000)},
              {name: '宁夏回族自治区',value: Math.round(Math.random()*1000)},
              {name: '海南省',value: Math.round(Math.random()*1000)},
              {name: '台湾省',value: Math.round(Math.random()*1000)},
              {name: '香港特别行政区',value: Math.round(Math.random()*1000)},
              {name: '澳门特别行政区',value: Math.round(Math.random()*1000)}
            ] */
          const mapOption = {
          /*  backgroundColor: '#c3d9ff', */
          title: {
            text: '各地报警次数统计',
            left: 'right'
          },
          tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2
          },
            visualMap: {
              left: 'right',
              min:0,
              max:1000,
            /*  splitNumber: 6, */
              inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
                
              },
            /*  pieces: [      // 自定义每一段的范围，以及每一段的文字
              { gte: 10000, label: '10000人以上', color: '#035cf5' }, // 不指定 max，表示 max 为无限大（Infinity）。
              { gte: 1000, lte: 9999, label: '1000-9999人', color: '#3375e4' },
              { gte: 500, lte: 999, label: '500-999人', color: '#6797ef' },
              { gte: 100, lte: 499, label: '100-499人', color: '#96b5ef' },
              { gte: 10, lte: 99, label: '10-99人', color: '#bacae8' },
              { lte: 9, label: '1-9人', color: '#d1d4da' }          // 不指定 min，表示 min 为无限大（-Infinity）。
            ], */
            /* itemWidth: 20, // 每个图元的宽度 */
            /* itemGap: 2,  */
              text: ['High', 'Low'],
              calculable: true,    
              realtime:true,               
            },
           /*  toolbox: {
              show: true,
              //orient: 'vertical',
              left: 'left',
              top: 'top',
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
              }
            }, */
            series: [
              {
                name: '各地报警次数',
              /*  id: 'population', */
                type: 'map',
                roam: true,
                mapType: 'china',
                animationDurationUpdate: 1000,
                universalTransition: true,
                data:data,
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 30,
                    color:'black'
                  }
                },
              
                labelLine: {
                  show: false
                },
              
              }
            ]
          };
          chart.setOption(mapOption);
          return chart;
        }
      },

      ec3:{
        onInit: function (canvas, width, height) {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(chart);
          const option = {
            title: {
              text: '年度被救助人次',
              left: 'right'
             },
            xAxis: {
              type: 'category',
              data: yearData.map((item)=>{
                return (item.name)
              }),
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: yearData.map((item)=>{
                  return (item.rescue_frequency)
                }),
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
                }
              }
            ]
          };
          chart.setOption(option)
          return chart;
      }
    }

  }
}


  componentWillMount(){
    
    const params = getCurrentInstance()
    const param = params.router.params
    console.log(param)

      this.getData()
      
  }
  componentDidMount(){
    this.getData()
  }


  getData = () =>{
    Fetch(
      '/rescue/arearescuefrequency',
      {},
      'POST'
    ).then(
      res=>{
        console.log(res)
        setTimeout(() => {
        this.setState({
          ec2:{
            onInit: function (canvas, width, height) {
              const chart = echarts.init(canvas, null, {
                width: width,
                height: height
              });
             /*  chart.showLoading();
              chart.hideLoading(); */
              echarts.registerMap('china', geoJson);
              canvas.setChart(chart);
              const  data = res.data.list.map((item)=>{return ( {name:item.name ,value: item.rescue_frequency})})
                
              const mapOption = {
               /*  backgroundColor: '#c3d9ff', */
               title: {
                text: '各地报警次数统计',
                left: 'right'
               },
               tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2
              },
                visualMap: {
                  left: 'right',
                  min:0,
                  max:1000,
                 /*  splitNumber: 6, */
                  inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
                    
                  },
                 /*  pieces: [      // 自定义每一段的范围，以及每一段的文字
                  { gte: 10000, label: '10000人以上', color: '#035cf5' }, // 不指定 max，表示 max 为无限大（Infinity）。
                  { gte: 1000, lte: 9999, label: '1000-9999人', color: '#3375e4' },
                  { gte: 500, lte: 999, label: '500-999人', color: '#6797ef' },
                  { gte: 100, lte: 499, label: '100-499人', color: '#96b5ef' },
                  { gte: 10, lte: 99, label: '10-99人', color: '#bacae8' },
                  { lte: 9, label: '1-9人', color: '#d1d4da' }          // 不指定 min，表示 min 为无限大（-Infinity）。
                ], */
                /* itemWidth: 20, // 每个图元的宽度 */
                /* itemGap: 2,  */
                  text: ['High', 'Low'],
                  calculable: true,    
                  realtime:true,               
                },
               /*  toolbox: {
                  show: true,
                  //orient: 'vertical',
                  left: 'left',
                  top: 'top',
                  feature: {
                    dataView: { readOnly: false },
                    restore: {},
                    saveAsImage: {}
                  }
                }, */
                series: [
                  {
                    name: '各地报警次数',
                   /*  id: 'population', */
                    type: 'map',
                    roam: true,
                    mapType: 'china',
                    animationDurationUpdate: 1000,
                    universalTransition: true,
                    data:data,
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: 30,
                        color:'black'
                      }
                    },
                   
                    labelLine: {
                      show: false
                    },
                   
                  }
                ]
              };
              chart.setOption(mapOption);
              return chart;
            }}
          
        })
      },0)
      }
    )

    Fetch(
      '/rescue/yearrescuefrequency',
      {},
      'POST'
          ).then(
      res=>{
        console.log(res)
        this.setState({
          ec3:{
            onInit: function (canvas, width, height) {
              const chart = echarts.init(canvas, null, {
                width: width,
                height: height
              });
              canvas.setChart(chart);
              const option = {
                title: {
                  text: '年度被救助人次',
                  left: 'right'
                 },
                xAxis: {
                  type: 'category',
                  data: res.data.list.map((item)=>{
                    return (item.name)
                  })
                },
                yAxis: {
                  type: 'value'
                },
                series: [
                  {
                    data: res.data.list.map((item)=>{
                      return (item.rescue_frequency)
                    }),
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                      color: 'rgba(180, 180, 180, 0.2)'
                    }
                  }
                ]
              };
              chart.setOption(option)
              return chart;
          }
        }
        })
      }
    )
  }
  render() {
    return (
      <>
       {/*  <View className='canvas-container'>
          <ec-canvas id='mychart-dom-bar' canvas-id='mychart-bar' ec={this.state.ec1}></ec-canvas>
        </View> */}
        <View className='canvas-container'>
        <ec-canvas id='mychart-dom-bar' canvas-id='mychart-bar' ec={this.state.ec2}></ec-canvas>
        </View>
          <View className='blank'></View>
        <View className='canvas-container'>
        <ec-canvas id='mychart-dom-bar' canvas-id='mychart-bar' ec={this.state.ec3}></ec-canvas>
        </View>
        </>
    )
  }
}
