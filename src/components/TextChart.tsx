import React from "react";
import { Text } from "@visx/text";
import { foodEmojis, dollarToFoodEmoji } from "../data";
import { useMainContext } from "../context/MainContext";

import "../sass/text_chart.scss";

interface TextChartProps {
  parentWidth: number;
  parentHeight: number;
}

interface TextChartAttr {
  columnCount: number;
  chartWidth: number;
  chartHeight: number;
}

export const TextChart: React.FC<TextChartProps> = ({
  parentWidth,
  parentHeight,
}) => {
  const { state } = useMainContext();

  const getColumnCountAndWidth = (data: object[]): TextChartAttr => {
    let columnCount = data.length > 25 ? 7 : data.length > 9 ? 5 : 3;

    return {
      columnCount: columnCount,
      chartWidth: parentWidth / columnCount,
      chartHeight: parentHeight / columnCount,
    };
  };

  const { columnCount, chartWidth, chartHeight } = getColumnCountAndWidth(
    foodEmojis
  );

  return (
    <div id="price-text-chart-layout" data-column-count={columnCount}>
      {dollarToFoodEmoji(state.dollar).map((item, index) => {
        return (
          <div className="price-layout" key={index}>
            <span role="img" aria-label={item.label}>
              {item.emoji}
            </span>
            <Text
              width={chartWidth / 4}
              x={(chartWidth * 3) / 8}
              y={chartHeight / 2}
              style={{ fontWeight: 800 }}
              scaleToFit
            >
              {item.result.toString().toLocaleString()}
            </Text>
          </div>
        );
      })}
    </div>
  );
};
