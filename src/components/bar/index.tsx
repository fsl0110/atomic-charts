import React, { FC, useRef, useEffect, SVGAttributes } from "react";
import classNames from "classnames";
import * as d3 from "d3";
import { Dimensions } from "../types";

export interface BarProps extends SVGAttributes<SVGGElement> {
  /** Pass Data for calculations. */
  data: any; // TODO: Replace by generic

  /** Pass Scales for calculations. */
  scales: { x: any; y: any }; // TODO: Replace by generic

  /** Pass Dimensions for calculations. */
  dim: Dimensions;

  /** No Childrens allowed */
  children?: never;
}

export const Bar: FC<BarProps> = ({ data, scales, dim }) => {
  const el = useRef<any>(null);

  useEffect(() => {
    const bar = d3
      .select(el.current)
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => scales.x(d[0]))
      .attr("y", dim.height - dim.margin.bottom)
      .attr("width", scales.x.bandwidth())
      .style("fill", "aqua")
      .transition()
      .duration(300)
      .ease(d3.easePolyInOut)
      .attr("y", (d: any) => scales.y(d[1]))
      .attr(
        "height",
        (d: any) => dim.height - scales.y(d[1]) - dim.margin.bottom
      );

    d3.select(el.current)
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d: any) => scales.x(d[0]) + dim.margin.left)
      .attr("y", dim.height - dim.margin.bottom - 5)
      .transition()
      .duration(300)
      .ease(d3.easePolyInOut)
      .text((d: any) => d[1].toString())
      .attr("y", (d: any) => scales.y(d[1]) - 5)
      .style("fill", "red")
      .style("font-size", "14px")
      .style("font-family", "arial")
      .attr("text-anchor", "middle");
  }, []);

  return <g className={classNames("bar", classNames)} ref={el} />;
};
