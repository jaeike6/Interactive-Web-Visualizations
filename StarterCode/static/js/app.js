// runApp() called when browser loads
init();

// initiates page and selector list

function init() {
    // reference: dropdown select element
    var selector = d3.select("#selDataset");
    
    //read JSON and extract names to populate SELECTOR
    d3.json("samples.json").then(function (data) {
        
        //define categories NAMES / METADATA / SAMPLES
        var names = data.names;
        var metadata = data.metadata;
        var samples = data.samples;

        //populate SELECTOR with NAMES 
        Object.values(names).forEach(function (names) {
            selector
              .append("option")
              .text(names)
              .property("value", names);
            const firstSample = names[0];
//             build(firstSample);
            buildCharts(firstSample);
        });
    });                  
}
function buildCharts(samples) {
    d3.json("samples.json").then(function (data) {
      // var names = data.names;
      // var metadata = data.metadata;
      var samples = data.samples;

      samples.forEach(function(response){
        console.log(response);
        var topTenOtuIDS = response.otu_ids.slice(0,10);
        var topTenSampleValues = response.sample_values.slice(0,10);
        var topTenLabel = response.otu_labels
    
      var barchartData = [{
      x: topTenSampleValues,
      y: topTenOtuIDS,
      type : "bar"
      }];

      var layout = {
      height: 600,
      width: 800
     };

     Plotly.newPlot("bar",barchartData,layout)});

     var bubblechartData = [{
      x: response.otu_ids,
      y: response.sample_values,
      text: response.otu_labels,
      marker: {
        size: response.sample_values,
        color: response.otu_ids,
      },
      // type: 'scatter',
      mode: 'markers'
    }];
    var data = [bubblechartData];
    var layout1 = {
        height: 600,
        width: 800
    };

    Plotly.newPlot("bubble", data, layout1);      
});
}

function buildGauge(wfreq) {  
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {

        steps: [
          { range: [0, 1], text: "0-1", color: "rgba(14, 127, 0, .5)" },
          { range: [1, 2], text: "1-2", color: "rgba(110, 154, 22, .5)" },
          { range: [2, 3], text: "2-3",color: "rgba(170, 202, 42, .5)" },
          { range: [3, 4], text: "3-4",color: "rgba(202, 209, 95, .5)" },
          { range: [4, 5], text: "4-5",color: "rgba(210, 206, 145, .5)" },
          { range: [5, 6], text: "5-6", color: "rgba(232, 226, 202, .5)" },
          { range: [6, 7], text: "6-7",color: "rgba(245, 255, 255, 0)" },
          { range: [7, 8], text: "7-8",color: "rgba(255, 255, 255, 0)" },
          { range: [8, 9], text: "8-9",color: "darkgreen" }
        ],
        // threshold: {
        //   line: { color: "red", width: 4 },
        //   thickness: 0.75,
        //   value: 490
        // }
      }
    }
  ];
  
  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot("gauge", data, layout);
}

function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    d3.json("samples.json").then(function(data) {
      console.log(Object.entries(data));
      
      var age = data.AGE;
      var bbtype = data.BBTYPE;
      var ethnicity = data.ETHNICITY;
      var gender = data.GENDER;
      var location = data.LOCATION;
      var wfreq = data.WFREQ;
      var sample = data.sample;

      // var metadataList = [age,bbtype,ethnicity,gender,location,wfreq,sample]


      // Use d3 to select the panel with id of `#sample-metadata`
      var sample_metadata = d3.select("#sample-metadata");
      
      // Use `.html("") to clear any existing metadata
      sample_metadata.html("");

      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      for(let [key, value] of Object.entries(data)){
        sample_metadata.append("p").text(`${key}: ${value}`);
      }

    // BONUS: Build the Gauge Chart
    buildGauge(data.WFREQ);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

