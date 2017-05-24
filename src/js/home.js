import '../scss/home.scss';
import echarts from 'echarts';
import request from 'superagent';

const echartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: "{a}： {b} <br/>交易量： {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: []
  },
  series: [
    {
      name: '每平米',
      type: 'pie',
      radius: '55%',
      center: [
        '50%', '60%'
      ],
      data: [],
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

function requsetData(url) {
  return new Promise((resolve, reject) => {
    request.get(url).end((err, res) => {
      err
        ? reject(err)
        : resolve(res.body)
    })
  })
}

const hangzhouChartsEle = document.querySelector('.hangzhou .charts');
const shanghaiChartsEle = document.querySelector('.shanghai .charts');

Promise.all([requsetData('/home/hangzhouMeter'), requsetData('/home/shanghaiMeter')]).then((resultes) => {
  const hangzhouPerMeter = resultes[0].perMeter;
  const hangzhouOptins = Object.assign({}, echartsOption, {
    title: {
      text: '杭州滨江',
      x: 'center'
    }
  });
  hangzhouOptins.legend.data = hangzhouPerMeter.map(item => item.name);
  hangzhouOptins.series[0].data = hangzhouPerMeter;
  const hangzhouChart = echarts.init(hangzhouChartsEle);
  hangzhouChart.setOption(hangzhouOptins);

  const shanghaiPerMeter = resultes[1].perMeter;
  const shanghaiOptins = Object.assign({}, echartsOption, {
    title: {
      text: '上海',
      x: 'center'
    }
  });
  shanghaiOptins.legend.data = shanghaiPerMeter.map(item => item.name);
  shanghaiOptins.series[0].data = shanghaiPerMeter;
  const shanghaiChart = echarts.init(shanghaiChartsEle);
  shanghaiChart.setOption(shanghaiOptins);
})
