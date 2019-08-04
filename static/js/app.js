function buildMetadata(sample) {

  // Use `d3.json` to fetch the metadata for a sample
  var metUrl = `/metadata/${sample}`;
  d3.json(metUrl).then(function(sample) {
    console.log("url");
    console.log(metUrl);
    console.log("first sample");
    console.log (sample);
   

    // Use d3 to select the panel with id of `#sample-metadata`
    var meta_sample = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    meta_sample.html("");
    console.log("meta sample");
    console.log(meta_sample);

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(sample).forEach(function([key, value]) {
    // loop and use d3 to append new tags for each key-value in the metadata.
      var row = meta_sample.append("p");
      row.text(`${key}: ${value}`);
      console.log("row");
      console.log(row);
      console.log("key, value");
      console.log(key, value);
    })
  });
  

};


// Bubble Chart
function buildCharts(sample) {
  var sampleUrl = `/samples/${sample}`;
  d3.json(sampleUrl).then(function(data) {
    
    var xValues = data.otu_ids;
    var yValues = data.sample_values;
    var markerSize = data.sample_values;
    var markerColors = data.otu_ids;
    var textValues = data.otu_labels;

    var trace = {
      x: xValues,
      y: yValues,
      mode: "markers",
      marker: {
        color: markerColors,   //markerColors,
        size: markerSize,
        colorscale: "Viridis"
        //sizemode: "area",
        //showscale: true
      },
      text: textValues
      //text: `(${markerColors[0]}, ${markerSize[0]}) <br> ${textValues[0]}`
    };

    var data = [trace];

    var layout = {
      xaxis: { 
        title: "<b>Operational Taxonomic Units (OTU) ID</b>"
      },
      yaxis : {
        title: "<b>Bacterial Sample Frequency</b>",
        autorange: true
      }
    };

  Plotly.newPlot("bubble", data, layout)
  });


  // Pie Chart - grab top 10 sample_values using slice
  d3.json(sampleUrl).then(function(data) {
    var valuePie = data.sample_values.slice(0, 10);
    var lablesPie = data.otu_ids.slice(0, 10);
    var hoverPie = data.otu_labels.slice(0, 10);

    var data = [{
      values: valuePie,
      labels: lablesPie,
      hovertext: hoverPie,
      type: "pie"
    }];

    var layout ={
      title: "<b>Belly Button Biodiversity - Top 10</b> <br> Patient Sample Number",
      height: 500,   
      width: 500 
    };

    Plotly.newPlot("pie", data, layout);

  });


  // GAUGE PLOT
  // Adapted Gauge Chart from <https://plot.ly/javascript/gauge-charts/>
  // Weekly Washing Frequency 0-9 increment by 1
  // `/metadata/<sample>`route
  // buildGauge(data.WFREQ);

  var metUrl = `/metadata/${sample}`;
  d3.json(metUrl).then(function(data) {
    
    var wfreq = data.WFREQ;
    // Enter a washing freq between 0 and 180  (180/9= 20; "20" is the scaling factor that must me multipied to wash freq to make it work)
    var level = parseFloat(wfreq) * 20;

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
    x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'Wash Frequency',
        // need to divide by 20 to get the correct WFREQ value on hover
        text: level / 20,
        hoverinfo: 'text+name'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6',
                '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgba(14, 70, 0, .5)', 'rgba(14, 90, 0, .5)', 'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                          'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                          'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)', 'rgba(248, 226, 202, .5)',
                          'rgba(255, 255, 255, 0)']},
    labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];

    var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
            color: '850000'
        }
        }],
    title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
    height: 500,    // resize to fit
    width: 500,     // resize to fit
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    // DIV id="gauge"  #gauge to insert into HTML in the correct DIV
    Plotly.newPlot("gauge", data, layout);
  })

};


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
