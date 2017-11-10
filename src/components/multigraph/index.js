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
        colors: [
          '#274C77',
          '#6096BA',
          '#ADF7B6',
          '#FFEE93',
          '#D9534F',
          '#FFC09F'
        ],
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
        legend: { enabled: false },
        credits: { enabled: false },
        series: yValues
      }}
    />
  </div>
)

export default Multigraph
