var elasticsearch = require('elasticsearch');
var echarts = require('echarts');

// burada es sunucusuna istemci olunur
var client = new elasticsearch.Client({
  host: 'http://localhost:9200',
  // es sunucusuna gönderilen istek ve cevabın konsolda görülür
  // 'trace' yerine 'error' yazıldığında istek ya da cevapta bir hata olduğunda konsolda ilgili hata görüntülenir
  log: 'error'
});

var phone, store, app, web;

// es, sunucusuna ping göndererek etkin olup olmadığına bakılır
client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch etkin değil');
  } else {
    console.log('Herşey yolunda');
  }
});

// pie chart için search api 
client.search({
  index: 'mockdata',
  type: '_doc',
  body: {
    "size": 0,
    "aggs": {
      "queryName": {
        "terms": {
          "field": "sales_channel.keyword",
          "order": {
            "_term": "asc"
          }
        }
      }
    }
  }
}).then(resp => {
  var result = resp.aggregations.queryName.buckets;

  app = result[0].doc_count;
  phone = result[1].doc_count;
  store = result[2].doc_count;
  web = result[3].doc_count;

  console.log(app + " " + phone + " " + store + " " + web);

  var myChart = echarts.init(document.getElementById('pieChart'));
  //grafiğin özellikleri ayarlanır
  var chartOption = {
    title: {
      text: 'Ürünlerin Satıldığı Kanallar',
      subtext: 'Ürünlerin hangi kanal üzerinden satıldığına dair oranları görülmektedir.',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      right: 'right',
      top: '50%',
      data: ['Application', 'Phone', 'Store', 'Web']
    },
    series: [
      {
        name: 'Kanal Adı:',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: app, name: 'Application' },
          { value: phone, name: 'Phone' },
          { value: store, name: 'Store' },
          { value: web, name: 'Web' }
        ],
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

  myChart.setOption(chartOption);

}, function (error) {
  console.trace(error.message)
});

var dateInfo = [];
var totalSales = [];

// line chart için search api 
client.search({
  index: 'mockdata',
  type: '_doc',
  body: {
    "size": 0,
    "aggs": {
      "dateRangeSearch": {
        "date_range": {
          "field": "purchased_at",
          "ranges": [
            {
              "from": "now-6d",
              "to": "now"
            }
          ]
        },
        "aggs": {
          "dateHistogramSearch": {
            "date_histogram": {
              "field": "purchased_at",
              "interval": "day",
              "order": {
                "_key": "desc"
              },
              "format": "dd-MM-yyyy"

            }
          }
        }
      }
    }
  }
}).then(resp => {
  var lineResult = resp.aggregations.dateRangeSearch.buckets[0].dateHistogramSearch.buckets;

  // for (var i = 0; i < resp.aggregations.dateRangeSearch.buckets[0].dateHistogramSearch.buckets.length; i++) {
  //   dateInfo = lineResult[i].key;
  //   totalSales = lineResult[i].doc_count;

  //   console.log("dateInfo " + dateInfo[i] + " totalSales " + totalSales[i]);
  // }

  dateInfo = [lineResult[0].key_as_string, lineResult[1].key_as_string, lineResult[2].key_as_string, lineResult[3].key_as_string, lineResult[4].key_as_string, lineResult[5].key_as_string, lineResult[6].key_as_string]
  totalSales = [lineResult[0].doc_count, lineResult[1].doc_count, lineResult[2].doc_count, lineResult[3].doc_count, lineResult[4].doc_count, lineResult[5].doc_count, lineResult[6].doc_count]


  console.log(lineResult.length);
  console.log(dateInfo);
  console.log(totalSales);

  var myLineChart = echarts.init(document.getElementById('lineChart'));

  // grafiğin özellikleri ayarlanır
  var lineChartOption = {
    title: {
      text: 'Son 1 Haftanın Satış Grafiği ',
      subtext: 'Son 7 günde ne kadar ürün satıldığı görülmektedir.',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    xAxis: {
      type: 'category',
      data: dateInfo
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: totalSales,
      type: 'line'
    }]
  };

  myLineChart.setOption(lineChartOption);
}, function (error) {
  console.trace(error.message)
});
