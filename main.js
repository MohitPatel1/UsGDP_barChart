const getDataset = async(url) => {
    const dataset = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json");
    const datasetObject = await dataset.json();
    createSvg(datasetObject);
}

getDataset()

const createSvg = (datasetObject) => {
    const datasetArray = datasetObject.data
    const tooltip = document.getElementById("tooltip")

    let width = 0.9 * window.innerWidth
    let height = 0.8 * window.innerHeight
    let padding = 40

    console.log(width)
    console.log(height)

    const minX = new Date(d3.min(datasetArray, (d) => d[0]))
    const maxX = new Date(d3.max(datasetArray, (d) => d[0]))
    const minY = d3.min(datasetArray, (d) => d[1])
    const maxY = d3.max(datasetArray, (d) => d[1])
    
    const xScale = d3.scaleTime()
    .domain([minX,maxX])
    .range([padding,width - padding])
    
    const yScale = d3.scaleLinear()
    .domain([0,maxY])
    .range([height - padding, padding])
    
    const svg = d3.select("div")
    .append("svg")
    .attr("width",width)
    .attr("height",height);

    svg.selectAll("rect")
    .data(datasetArray)
    .enter()
    .append("rect")
    .attr("class","bar")
    .attr("fill","green")
    .attr("x",(d)=>xScale(new Date(d[0])))
    .attr("y",(d)=>yScale(d[1]))
    .attr("width","5")
    .attr("height",(d) => height-padding-yScale(d[1]))
    .attr("data-date",(d)=>d[0])
    .attr("data-gdp",(d)=>d[1])

    .on("mouseover",(i,d)=>{
        tooltip.classList.add("show");
        tooltip.style.left=i*3+padding*2+"px";
        tooltip.setAttribute('data-date',d[0]);
        tooltip.innerHTML = `${d[0]}<br>${d[1]}<br>billion`;
    })

    .on("mouseout",()=>{
        tooltip.classList.remove("show")
        // alert("come back baby")
    })

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisRight(yScale);

    svg.append("g")
    .attr("transform",`translate(0,${height-padding})`)
    .call(xAxis)
    .attr("id","x-axis")

    svg.append("g")
    .attr("transform",`translate(${padding},0)`)
    .call(yAxis)
    .attr("id","y-axis")
}



























































































