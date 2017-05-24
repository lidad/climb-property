import '../scss/home.scss';
import echarts from 'echarts';
import request from 'superagent';

const chartsEle = document.querySelector('.hangzhou .charts');

new Promise((resolve, reject) => {
  request.get('/home/hangzhouMeter').end((err, res) => {
    err
      ? reject(err)
      : resolve(res.body)
  })
}).then((res) => {
  const {perMeter} = res;

  const myChart = echarts.init(chartsEle);

  const option = {
    title: {
      text: '杭州滨江',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a}： {b} <br/>交易量： {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: perMeter.map(item => item.name)
    },
    series: [
      {
        name: '每平米',
        type: 'pie',
        radius: '55%',
        center: [
          '50%', '60%'
        ],
        data: perMeter,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  myChart.setOption(option);
})
