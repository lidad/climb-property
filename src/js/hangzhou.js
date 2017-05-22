import '../scss/hangzhou.scss';
import echarts from 'echarts';
import request from 'superagent';

new Promise((resolve, reject) => {
  request.get('/hangzhou/getdata').end((err, res) => {
    err
      ? reject(err)
      : resolve(res.body)
  })
}).then((result) => {
  const {datas} = result;
  const myChart = echarts.init(document.getElementById('charts'));
  const schema = [
  {
    name: 'dealAmount',
    index: 0,
    text: '成交价'
  }, {
    name: 'area',
    index: 1,
    text: '面积'
  }, {
    name: 'homeModel',
    index: 2,
    text: ''
  }, {
    name: 'dealDate',
    index: 3,
    text: '成交日期'
  }, {
    name: 'perMeter',
    index: 4,
    text: '每平米'
  }, {
    name: 'info',
    index: 5,
    text: ''
  }
];

  const itemStyle = {
    normal: {
      opacity: 0.8,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
  };

  const option = {
    backgroundColor: '#404a59',
    color: [
      '#dd4444', '#fec42c', '#80F1BE'
    ],
    legend: {
      y: 'top',
      data: ['杭州滨江'],
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    grid: {
      x: '10%',
      x2: 150,
      y: '18%',
      y2: '10%'
    },
    tooltip: {
      padding: 10,
      backgroundColor: '#222',
      borderColor: '#777',
      borderWidth: 1,
      formatter: function(obj) {
        var value = obj.value;
        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
        + value[2] + '</div>'
        + schema[1].text + '：' + value[1]
        + '<br>'
        + schema[3].text + '：' + value[3]
        + '<br>'
        + schema[0].text + '：' + value[0]
        + '<br>'
        + schema[4].text + '：' + value[4]
        + '<br>'
        + value[5]
        + '<br>';
      }
    },
    xAxis: {
      type: 'value',
      name: '成交价',
      nameGap: 16,
      nameTextStyle: {
        color: '#fff',
        fontSize: 14
      },
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#eee'
        }
      }
    },
    toolbox: {
        feature: {
            dataZoom: {},
            brush: {
                type: ['rect', 'polygon', 'clear']
            }
        }
    },
    yAxis: {
      type: 'value',
      name: '面积',
      nameLocation: 'end',
      nameGap: 20,
      nameTextStyle: {
        color: '#fff',
        fontSize: 16
      },
      axisLine: {
        lineStyle: {
          color: '#eee'
        }
      },
      splitLine: {
        show: false
      }
    },visualMap: [
        {
            left: 'right',
            top: '10%',
            dimension: 4,
            min: 0,
            max: 6,
            itemWidth: 30,
            itemHeight: 120,
            calculable: true,
            precision: 0.1,
            text: ['圆形大小：每平米价'],
            textGap: 30,
            textStyle: {
                color: '#fff'
            },
            inRange: {
                symbolSize: [10, 70]
            },
            outOfRange: {
                symbolSize: [10, 70],
                color: ['rgba(255,255,255,.2)']
            },
            controller: {
                inRange: {
                    color: ['#c23531']
                },
                outOfRange: {
                    color: ['#444']
                }
            }
        }
    ],
    series: [
      {
        name: '杭州滨江',
        type: 'scatter',
        itemStyle: itemStyle,
        data: datas
      }
    ]
  };

  myChart.setOption(option);
})
