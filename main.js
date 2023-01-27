const getDataset = async(url) => {
    const dataset = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json");
    const datasetObject = await dataset.json();
    createSvg(datasetObject);
}

getDataset()

const createSvg = (datasetObject) => {
    const datasetArray = datasetObject.data
    console.log(datasetObject)
    console.log(datasetArray)

    let w = 0.8 * window.innerWidth
    let h = 0.7 * window.innerHeight

    const svg = d3.select("div")
    .append("svg")
    .attr("width",w)
    .attr("height",h);



    svg.selectAll("rect")
}



























































































