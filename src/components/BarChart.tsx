import React from "react";

import { useMainContext } from "../context/MainContext";
import { dollarToFoodEmoji, FoodEmoji } from "../data";
import Gradients from "./Gradients";
import "../sass/bar_chart.scss";

import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";

type BarChartProps = {
  parentWidth: number;
  parentHeight: number;
};

const marginTop = 20;
const margin = { top: marginTop, right: 20, bottom: 20, left: 50 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};

let tooltipTimeout: number;

function max<D>(arr: D[], fn: (d: D) => number) {
  return Math.max(...arr.map(fn));
}

const BarChart: React.FC<BarChartProps> = ({ parentWidth, parentHeight }) => {
  const { state } = useMainContext();

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: false,
  });

  const handleMouseOver = (event: React.MouseEvent, datum: number) => {
    const svgElement = (event.target as SVGElement).ownerSVGElement;
    if (svgElement !== null) {
      const coords = localPoint(svgElement, event);
      if (coords !== null) {
        showTooltip({
          tooltipLeft: coords.x,
          tooltipTop: coords.y,
          tooltipData: datum,
        });
      }
    }
  };

  const width = parentWidth / 1.1;
  const height = parentHeight - 40;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const background = "#000";

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
      <svg ref={containerRef} width={width} height={height}>
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
              <React.Fragment key={`bar-${letter}`}>
                <Gradients id={letter} />
                <Bar
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={`url(#${letter})`}
                  onMouseOver={(e) => {
                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                    handleMouseOver(e, d.result);
                  }}
                  onMouseOut={() => {
                    tooltipTimeout = window.setTimeout(() => {
                      hideTooltip();
                    }, 300);
                  }}
                />
              </React.Fragment>
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

      {tooltipOpen && (
        <TooltipInPortal
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          Result : <strong>{tooltipData}</strong>
        </TooltipInPortal>
      )}
    </div>
  ) : null;
};

export default BarChart;
