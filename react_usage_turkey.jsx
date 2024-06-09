import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

const TurkeyMap = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const createChart = async () => {
      if (!svgRef.current) return;

      const turkey = await d3.json("./turkey.topojson");

      const projection = d3.geoMercator().scale(2000).center([38, 38]);
      const path = d3.geoPath().projection(projection);
      const svg = d3.select(svgRef.current);

      svg.selectAll("*").remove();

      svg.attr("viewBox", `0 0 775 370`);
      svg.append("g").attr("transform", "translate(610,20)");

      svg
        .append("g")
        .selectAll("path")
        .data(topojson.feature(turkey, turkey.objects.collection).features)
        .join("path")
        .attr("d", path)
        .style("cursor", "pointer")
        .on("mouseover", function (event, d) {
          d3.select(this).attr("fill-opacity", 0.6);
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill-opacity", 1);
        })
        .on("click", (event, d) => {
          //console.log('Clicked city:', d.properties.name);
        });

      svg
        .append("path")
        .datum(
          topojson.mesh(turkey, turkey.objects.collection, (a, b) => a !== b)
        )
        .attr("fill", "none")
        .attr("stroke", "#777777")
        .attr("stroke-linejoin", "round")
        .attr("d", path);
    };

    createChart();
  }, [rerender]);

  return (
    <div style={{ position: "relative" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default TurkeyMap;
