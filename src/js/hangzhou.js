import '../scss/hangzhou.scss';
import echarts from 'echarts';

const myChart = echarts.init(document.getElementById('charts'));
const schema = [
  {
    name: 'homeModel',
    index: 0,
    text: ''
  }, {
    name: 'area',
    index: 1,
    text: '面积'
  }, {
    name: 'dealDate',
    index: 2,
    text: '成交日期'
  }, {
    name: 'dealAmount',
    index: 3,
    text: '成交价'
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
      return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' + value[0] + '</div>' + schema[1].text + '：' + value[1] + '<br>' + schema[2].text + '：' + value[2] + '<br>' + schema[3].text + '：' + value[3] + '<br>' + schema[4].text + '：' + value[4] + '<br>' + schema[5].text + '：' + value[5] + '<br>' + value[6] + '<br>';
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
  },
  series: [
    {
      name: '北京',
      type: 'scatter',
      itemStyle: itemStyle,
      data: []
    }
  ]
};

myChart.setOption(option);
