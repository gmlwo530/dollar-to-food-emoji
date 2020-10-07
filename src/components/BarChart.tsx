import React from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { dollarToFoodEmoji, FoodEmoji } from "../data";
import {
  GradientTealBlue,
  GradientPinkRed,
  GradientLightgreenGreen,
} from "@visx/gradient";
import { AxisLeft } from "@visx/axis";

import { scaleBand, scaleLinear } from "@visx/scale";

import "../sass/bar_chart.scss";
import { useMainContext } from "../context/MainContext";

interface BarChartProps {
  parentWidth: number;
  parentHeight: number;
}

function max<D>(arr: D[], fn: (d: D) => number) {
  return Math.max(...arr.map(fn));
}

export const BarChart: React.FC<BarChartProps> = ({
  parentWidth,
  parentHeight,
}) => {
  const { state } = useMainContext();

  const width = parentWidth / 1.1;
  const height = parentHeight - 40;
  const marginTop = 20;
  const margin = { top: marginTop, right: 20, bottom: 20, left: 50 };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const background = "#612efb";

  const data = dollarToFoodEmoji(state.dollar);
  const getEmoji = (d: FoodEmoji) => d.emoji;

  // scales
  const emojiScale = scaleBand<string>({
    domain: data.map(getEmoji),
    padding: 0.5,
  });

  const countScale = scaleLinear<number>({
    domain: [0, max(data, (d) => d.result)],
  });

  // update scale output dimensions
  emojiScale.rangeRound([0, yMax]);
  countScale.rangeRound([xMax, 0]);

  return width > 0 && height > 0 ? (
    <div id="price-bar-chart-layout">
      <svg width={width} height={height}>
        <GradientTealBlue id="lemon" />
        <GradientLightgreenGreen id="banana" />
        <GradientPinkRed id="apple" />
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
          ry={14}
        />
        <Group top={margin.top} left={margin.left}>
          {data.map((d) => {
            const letter = d.label;

            const barWidth = xMax - (countScale(d.result) as number);
            const barHeight = emojiScale.bandwidth();
            const barX = 0;
            const barY = emojiScale(d.emoji);

            return (
              <Bar
                key={`bar-${letter}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={`url(#${letter})`}
              />
            );
          })}
          <AxisLeft
            scale={emojiScale}
            stroke={"#e5fd3d"}
            tickStroke={"#e5fd3d"}
            hideAxisLine
            tickLabelProps={() => ({
              fontSize: 16,
              textAnchor: "end",
              dy: "0.33em",
            })}
          />
        </Group>
      </svg>
    </div>
  ) : null;
};
