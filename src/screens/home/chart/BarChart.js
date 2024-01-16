import React, { PureComponent } from 'react';
import { Svg, G, Line, Rect, Text } from 'react-native-svg';
import * as d3 from 'd3';
import { Dimensions } from 'react-native';

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 9;
const colors = {
  axis: '#E4E4E4',
  bars: '#4EE48D',
  newbars: '#000',
  background: '#F5F5F5', // Pink background color
  grid: 'black', // Grid line color
};

export default class BarChart extends PureComponent {
  render() {
    // Dimensions
    const SVGHeight = 190;
    const SVGWidth = Dimensions.get('window').width * 0.92;
    const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
    const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;
    const data = this.props.data;

    // X scale point
    const xDomain = data.map(item => item.label);
    const xRange = [0, graphWidth];
    const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

    // Y scale linear
    const maxValue = d3.max(data, d => d.value);
    const topValue = Math.ceil(maxValue / this.props.round) * this.props.round;
    const yDomain = [0, topValue];
    const yRange = [0, graphHeight];
    const y = d3.scaleLinear().domain(yDomain).range(yRange);

    // top axis and middle axis
    const middleValue = topValue / 2;

    // Calculate the positions of the background grid lines
    const gridLines = Array.from({ length: 5 }, (_, index) => {
      const gridY = y((topValue / 4) * index);
      return {
        y: gridY * -1,
        gridY,
      };
    });

    return (
      <Svg width={SVGWidth} height={SVGHeight}>
        <G y={graphHeight + GRAPH_MARGIN}>
          {/* Pink background */}
          <Rect x={0} y={y(topValue) * -1} width={graphWidth} height={graphHeight} fill={colors.background} />

          {/* Grid lines */}
          {gridLines.map(({ y: lineY, gridY }, index) => (
            <G key={`gridGroup${index}`}>
              <Line
                x1="0"
                y1={lineY}
                x2={graphWidth}
                y2={lineY}
                stroke={colors.grid}
                strokeWidth="0.5"
                strokeDasharray={[3, 3]}
              />
              {/* Optional: Display grid values on the chart */}
              <Text x={0} y={lineY +3} fontSize="8" fill={colors.grid}>
                {gridY.toFixed(2)} {/* Adjust the formatting as needed */}
              </Text>
            </G>
          ))}

          {/* Top axis */}
          <Line x1="0" y1={y(topValue) * -1} x2={graphWidth} y2={y(topValue) * -1} stroke={colors.axis} strokeWidth="0.5" />

          {/* Middle axis */}
          <Line x1="0" y1={y(middleValue) * -1} x2={graphWidth} y2={y(middleValue) * -1} stroke={colors.axis} strokeWidth="0.5" />

          {/* Bottom axis */}
          <Line x1="0" y1="2" x2={graphWidth} y2="2" stroke={colors.axis} strokeWidth="0.5" />

          {/* Bars */}
          {data.map(item => (
            <Rect
              key={'bar' + item.label}
              x={x(item.label) - GRAPH_BAR_WIDTH + 15 }
              y={y(item.value) * -1}
              rx={6.5}
              width={GRAPH_BAR_WIDTH}
              height={y(item.value)}
              fill={item?.value >= 500 ? colors?.newbars : colors.bars}
            />
          ))}

          {/* Labels */}
          {data.map(item => (
            <Text key={'label' + item.label} fontSize="8" fontFamily="Inter-Bold" fontWeight="500" x={x(item.label) +10} y="17" textAnchor="middle">
              {item.label}
            </Text>
          ))}
        </G>
      </Svg>
    );
  }
}
