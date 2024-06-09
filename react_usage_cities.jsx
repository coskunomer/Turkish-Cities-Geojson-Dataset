import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CityMap = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const createChart = async () => {
      if (!svgRef.current) return;

      const cityMapData = await d3.json("./cities/bursa.geojson");

      const svg = d3.select(svgRef.current);

      // Remove any existing content
      svg.selectAll("*").remove();

      const projection = d3
        .geoIdentity()
        .reflectY(true)
        .fitSize([900, 500], cityMapData);

      const path = d3.geoPath().projection(projection);

      svg
        .selectAll("path.district")
        .data(cityMapData.features)
        .enter()
        .append("path")
        .attr("class", "district")
        .attr("d", path)
        .attr("fill", "#222222")
        .attr("stroke", "#e6e4e0")
        .attr("stroke-width", 0.5)
        .style("cursor", "pointer")
        .on("mouseover", function (event, d) {
          d3.select(this).attr("fill-opacity", 0.6);
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill-opacity", 1);
        })
        .on("click", (event, d) => {
          //console.log('Clicked :', d.properties.name);
        });
    };

    createChart();
  }, []);

  return (
    <div style={{ position: "relative", margin: "30px" }}>
      <svg ref={svgRef} width="100%" height="500px"></svg>
    </div>
  );
};

export default CityMap;
