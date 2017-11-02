import React from  'react'
import ReactHighcharts from 'react-highcharts'

const Multigraph = ({
  type,
  title,
  xValues,
  xTitle,
  yValues,
  yTitle,
  tooltipSuffix
}) => (
  <div>
    <ReactHighcharts
      config={{
        chart: { type: type },
        title: { text: title },
        xAxis: {
          categories: xValues,
          title: { text: xTitle}
        },
        yAxis: {
          min: 0,
          title: {
            text: yTitle,
            align: 'high'
          },
          labels: { overflow: 'justify' }
        },
        tooltip: { valueSuffix: tooltipSuffix },
        plotOptions: {
          bar: { dataLabels: { enabled: true } }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor: '#FFFFFF',
          shadow: true
        },
        credits: { enabled: false },
        series: yValues
      }}
    />
  </div>
)

export default Multigraph
