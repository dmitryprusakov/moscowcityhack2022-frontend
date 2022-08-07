/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { AnalyzisData } from 'types';

import moment from 'moment';

// const fakeData = [
//   {
//     week: '09.05 - 15.05',
//     validMediaCount: 1,
//     invalidMediaCount: 3,
//   },
//   {
//     week: '16.05 - 22.05',
//     validMediaCount: 3,
//     invalidMediaCount: 5,
//   },
//   {
//     week: '23.05 - 29.05',
//     validMediaCount: 2,
//     invalidMediaCount: 4,
//   },
//   {
//     week: '30.05 - 05.06',
//     // validMediaCount: 0,
//     invalidMediaCount: 3,
//   },
// ];

interface MakeSeries {
  chart: am5xy.XYChart;
  xAxis: am5xy.CategoryAxis<am5xy.AxisRenderer>;
  yAxis: am5xy.ValueAxis<am5xy.AxisRenderer>;
  legend: am5.Legend;
  color: am5.Color | undefined;
  name: string;
  fieldName: string;
  data: any[];
}

const makeSeries = ({ chart, xAxis, yAxis, legend, color, name, fieldName, data }: MakeSeries) => {
  const series = chart.series.push(
    am5xy.ColumnSeries.new(chart.root, {
      name: name,
      stacked: true,
      xAxis: xAxis,
      yAxis: yAxis,
      fill: color,
      stroke: color,
      valueYField: fieldName,
      categoryXField: 'week',
    })
  );

  series.columns.template.setAll({
    tooltipText: `[#fff]{name}, {categoryX}: {valueY}`,
    tooltipY: am5.percent(10),
  });
  series.data.setAll(data);

  series.bullets.push(function () {
    return am5.Bullet.new(chart.root, {
      sprite: am5.Label.new(chart.root, {
        text: `{valueY}`,
        fill: chart.root.interfaceColors.get('alternativeText'),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true,
      }),
    });
  });

  legend.data.push(series);
};

type Point = {
  date: string;
  is_valid: boolean;
};

export const createChart = (root: am5.Root, data: AnalyzisData) => {
  if (!data.diagram_data) return;
  const chartData = JSON.parse(data.diagram_data);
  console.log('chartData', chartData);

  const numberedData = chartData.map((point: Point) => ({
    is_valid: point.is_valid,
    date: new Date(point.date).getTime(),
  }));

  const sortedByDateData = numberedData.sort((a, b) => a.date - b.date);

  const calculatedData = sortedByDateData
    .reduce((acc: any[], value: Point) => {
      const weekOfPoint = moment(value.date).isoWeeks();

      if (value.is_valid) {
        acc[weekOfPoint] = {
          ...acc[weekOfPoint],
          week: weekOfPoint,
          validMediaCount: (acc[weekOfPoint]?.validMediaCount || 0) + 1,
        };
      }

      if (!value.is_valid) {
        acc[weekOfPoint] = {
          ...acc[weekOfPoint],
          week: weekOfPoint,
          invalidMediaCount: (acc[weekOfPoint]?.invalidMediaCount || 0) + 1,
        };
      }

      return acc;
    }, [])
    .filter(Boolean);

  console.log('calculatedData', calculatedData);

  // const root = am5.Root.new(id);

  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: 'none',
      wheelY: 'none',
      layout: root.verticalLayout,
    })
  );
  chart.plotContainer.get('background')?.setAll({
    stroke: am5.color('#d9d9d9'),
    strokeWidth: 1,
    strokeOpacity: 0.5,
  });

  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: 'week',
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 80,
      }),
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  xAxis.data.setAll(calculatedData);

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  const legend = chart.children.push(
    am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50,
    })
  );

  const positiveColor = am5.color('#0cce6a');
  const negativeColor = am5.color('#ffa400');

  makeSeries({
    chart,
    xAxis,
    yAxis,
    legend,
    color: negativeColor,
    name: 'Количество недостоверных СМИ',
    fieldName: 'invalidMediaCount',
    data: calculatedData,
  });
  makeSeries({
    chart,
    xAxis,
    yAxis,
    legend,
    color: positiveColor,
    name: 'Количество достоверных СМИ',
    fieldName: 'validMediaCount',
    data: calculatedData,
  });
};
