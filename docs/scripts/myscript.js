// add your JavaScript/D3 to this file
const data = [
  { race: 'Asian', year: 2020, unemploymentRate: 8.71 },
  { race: 'Black', year: 2020, unemploymentRate: 11.47 },
  { race: 'Latino', year: 2020, unemploymentRate: 10.49 },
  { race: 'White', year: 2020, unemploymentRate: 7.34 },
  { race: 'Asian', year: 2021, unemploymentRate: 5.03 },
  { race: 'Black', year: 2021, unemploymentRate: 8.58 },
  { race: 'Latino', year: 2021, unemploymentRate: 6.81 },
  { race: 'White', year: 2021, unemploymentRate: 4.71 },
  { race: 'Asian', year: 2022, unemploymentRate: 2.79 },
  { race: 'Black', year: 2022, unemploymentRate: 6.12 },
  { race: 'Latino', year: 2022, unemploymentRate: 4.26 },
  { race: 'White', year: 2022, unemploymentRate: 3.23 },
  { race: 'Asian', year: 2023, unemploymentRate: 2.94 },
  { race: 'Black', year: 2023, unemploymentRate: 5.32 },
  { race: 'Latino', year: 2023, unemploymentRate: 4.78 },
  { race: 'White', year: 2023, unemploymentRate: 3.24 },
];
let currentYear = 2020;

// Function to update the chart based on the selected year
function updateChart(year) {
  currentYear = year;
  updateBars();
}

// Function to update the bars in the chart
function updateBars() {
  const filteredData = data.filter(d => d.year === currentYear);

  const margin = { top: 30, right: 20, bottom: 30, left: 40 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  d3.selectAll("svg").remove();

  const svg = d3.select("#chart-container")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // X axis
  const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(filteredData.map(function(d) { return d.race; }))
    .padding(0.2);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 12])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll(".bar")
    .data(filteredData)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.race); })
      .attr("y", function(d) { return y(d.unemploymentRate); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.unemploymentRate); })
      .attr("fill", "#69b3a2");

  // Add chart title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .text(`US Unemployment Rate (%) by Race - ${currentYear}`);
  }

// Initial chart rendering
updateBars();
