d3.json('./static/todaysImport.json').then((data) => {
   //console.log(data);
tableData = data
console.log(tableData);


//global declaration of tbody, since it will be accessed in and out of functions
tbody = d3.select("tbody")


// CODE FOR MOST RECENT PRODUCTION IN TABULAR FORM
// function to import the data from recent.json, saved in this folder from Jupyter Notebook
function buildTable(tableData) {
  //clear table
  tbody.html("");
    // loop thrugh the array
  tableData.forEach((well) => {
      // for each well add a row to the tbody
      let row = tbody.append("tr");
      // loop through each value to add a cell for each of it
      Object.values(well).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
      })
    }); // closing forEach
  }; //closing d3



//FUNCTION TO CREATE DROP DOWN VALUES
function createDropdownOptions() {
  //select dropdown <select> in well.html with id:"multiple-site-filter"
  var multipleSiteSelector = d3.select("#multiple-site-filter");
  //read in the wellNames.json file, which contains the array "names" with all the well names
  d3.json('./static/wellNames.json').then((data) => {
    // console.log(data);
  var wellOptions = data.names;
  wellOptions.forEach((well) => {
      multipleSiteSelector
      .append('option')
      .text(well)
      .property('Value', well);
  })
})
};

createDropdownOptions();

//BUILD TABLE AS SOON AS THE PAGE LOADS
buildTable(tableData);

//START OF FUNCTION TO HANDLE MULTI WELL FILTER //
function multipleWellSelected() {
  let options = document.getElementById('multiple-site-filter').selectedOptions;
  // let options = d3.select('multiple-site-filter').node().value();
  let values = Array.from(options).map(({ value }) => value);
  // the value entered in the sitename filter becomes the value for the siteName variable
  //console.log(values);
  // set data be filtered to imported data (the data ready to be filtered)
  let filteredData = tableData;
  var requestedData = [];
  //console.log(filteredData);
  values.forEach((well) => {
    filteredData.forEach((row) => {
      {if (well == row[0]){requestedData.push(row)}}
    }) 
    buildTable(requestedData); //BUILD TABLE WITH RequestedData ARRAY
    {if(values == []){buildTable(filteredData)}}; //SELECT DOESNT DETECT THAT THERE ISN'T ANYTHING SELECTED
  console.log(values);
  console.log(filteredData);
})}; 
//END OF multipleWellSelected()

// LISTENER TO ACTIVATE FILTER, ALLOWS FOR SINGLW OR MULTI WELL FILTERING ON CHANGE
d3.selectAll('#multiple-site-filter').on("change", multipleWellSelected);


//FUCTION TO CLEAR FILTERED TABLE
function clearTable(tableData){
  d3.json('./static/todaysImport.json').then((data) => {
    tableData = data;
    tbody = d3.select("tbody");
    tbody.html("");
    tableData.forEach((well) => {
      let row = tbody.append("tr");
      Object.values(well).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        //CODE TO RESET DROPDOWN i.e. CLEAR SELECTION
        var dropDown = document.getElementById("multiple-site-filter"); 
        dropDown.selectedIndex = 0
      })})})};
  
 //LISTENER TO TRIGGER ClearTable FUNCTION
d3.selectAll('#clear-filter-btn').on("click", clearTable);

});