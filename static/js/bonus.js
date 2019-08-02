// Adapted Gauge Chart from <https://plot.ly/javascript/gauge-charts/>
// Weekly Washing Frequency 0-9 increment by 1
// `/metadata/<sample>`route
// buildGauge(data.WFREQ);



function makeGauge(wfreq) {
    //var washUrl = `/metadata/${sample}`;
    //d3.json(washUrl).then(function(data) {
   
      // Use d3 to select the panel with id of `#gauge`
      //var metaWash = d3.select("#gauge");
      // Use `.html("") to clear any existing metadata
      //metaWash.html("");

      //var wfreq = data.WFREQ;
    
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
          marker: {size: 28, color:'850000'}, //
          showlegend: false,
          name: 'Wash Frequency',
          text: level,
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
      height: 500,    //
      width: 500,     //
      xaxis: {zeroline:false, showticklabels:false,
                  showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                  showgrid: false, range: [-1, 1]}
      };

      var Gauge = document.getElementById("gauge")
      // DIV id="gauge"  #gauge to insert into HTML in the correct DIV
      Plotly.newPlot(Gauge, data, layout);
    //])
};

//makeGauge()