import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PlanoCartesiano = ({ largura = 500, altura = 500, intervalo = 25 }) => {
  const svgRef = useRef();
  const dados = [
    [-5, -3],
    [-9, -5],
    [2, 4],
    [-1, 1],
    [3, -2],
  ];

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", largura)
      .attr("height", altura);

    // Eixos X e Y

    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", altura / 2)
      .attr("x2", largura)
      .attr("y2", altura / 2)
      .style("stroke", "black");

    svg
      .append("line")
      .attr("x1", largura / 2)
      .attr("y1", 0)
      .attr("x2", largura / 2)
      .attr("y2", altura)
      .style("stroke", "black");

    // Grid
    for (let x = -largura / 2; x <= largura / 2; x += intervalo) {
      svg
        .append("line")
        .attr("x1", largura / 2 + x)
        .attr("y1", 0)
        .attr("x2", largura / 2 + x)
        .attr("y2", altura)
        .style("stroke", "#ccc")
        .style("stroke-width", 0.5);
    }

    console.log(-altura / 2);
    for (let y = -altura / 2; y <= altura / 2; y += intervalo) {
      
      svg
        .append("line")
        .attr("x1", 0)
        .attr("y1", altura / 2 - y)
        .attr("x2", largura)
        .attr("y2", altura / 2 - y)
        .style("stroke", "#ccc")
        .style("stroke-width", 0.5);

      svg
        .append("text")
        .attr("x", largura / 2 + 5)
        .attr("y", altura / 2 - y)
        .text(y);
    }

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .style("fill", "blue");
    // Pontos de exemplo

    svg
      .selectAll("circle")
      .data(dados)
      .enter()
      .append("circle")
      .attr("cx", (d) => largura / 2 + +d[0] * intervalo)
      .attr("cy", (d) => altura / 2 - +d[1] * intervalo) // invertido pois o eixo Y é invertido em SVG
      .attr("r", 5)
      .style("fill", "red");
// Desenha linhas conectando três pontos
svg.append("line")
  .attr("x1", largura / 2 + +dados[0][0] * intervalo)
  .attr("y1", altura / 2 - +dados[0][1] * intervalo)
  .attr("x2", largura / 2 + +dados[1][0] * intervalo)
  .attr("y2", altura / 2 - +dados[1][1] * intervalo)
  .style("stroke", "blue")
  .style("stroke-width", 2)
  .attr("marker-end", "url(#arrow)"); // Adiciona a seta ao final da linha

svg.append("line")
  .attr("x1", largura / 2 + +dados[1][0] * intervalo)
  .attr("y1", altura / 2 - +dados[1][1] * intervalo)
  .attr("x2", largura / 2 + +dados[2][0] * intervalo)
  .attr("y2", altura / 2 - +dados[2][1] * intervalo)
  .style("stroke", "blue")
  .style("stroke-width", 2)
  .attr("marker-end", "url(#arrow)"); // Adiciona a seta ao final da linha

svg.append("line")
  .attr("x1", largura / 2 + +dados[2][0] * intervalo)
  .attr("y1", altura / 2 - +dados[2][1] * intervalo)
  .attr("x2", largura / 2 + +dados[3][0] * intervalo)
  .attr("y2", altura / 2 - +dados[3][1] * intervalo)
  .style("stroke", "blue")
  .style("stroke-width", 2)
  .attr("marker-end", "url(#arrow)"); // Adiciona a seta ao final da linha
    // Adiciona legendas aos pontos
  }, [largura, altura, intervalo]);

  return (
    <div>
      <h1>Plano Cartesiano</h1>
      <p>Intervalo: {intervalo}</p>
      {dados.map((d) => (
        <span>{d}, </span>
      ))}
      <div>
        <svg ref={svgRef}></svg>;
      </div>
    </div>
  );
};

export default PlanoCartesiano;
