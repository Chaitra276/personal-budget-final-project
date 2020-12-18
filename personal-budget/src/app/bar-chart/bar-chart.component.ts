import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import {DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-bar-chart',
  template: `<div id="bar"><svg></svg></div>`,
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit {
  private data = [
    {"Framework": "Eat out", "Stars": "300"},
    {"Framework": "shopping", "Stars": "500"},
    {"Framework": "Gas", "Stars": "90"},
    {"Framework": "Water", "Stars": "1000"},
    {"Framework": "Groceries", "Stars": "750"},
    {"Framework": "Rent", "Stars": "1150"},
    {"Framework": "Wifi", "Stars": "250"}
  ];
  private svg;
  private margin = 50;
  private width = 250 - (this.margin * 2);
  private height = 250 - (this.margin * 2);
  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}
private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.Framework))
  .padding(0.4);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 1500])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.Framework))
  .attr("y", d => y(d.Stars))
  .attr("width", x.bandwidth())
  .attr("height", (d) => this.height - y(d.Stars))
  .attr("fill", "#4d5791");
}
ngOnInit(): void {
  this.createSvg();
  this.drawBars(this.data);
}
}