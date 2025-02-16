

import TaleemCanvas from "../taleem-canvas.js";


async function run() {
  
 
    const canvasElement = document.getElementById("myCanvas");
    const ctx = canvasElement.getContext("2d");
    const canvas = new TaleemCanvas(canvasElement, ctx);
    
    await canvas.loadImages(['../assets/images/scene.png'])
    
    // Add heading text
    const heading = canvas.add.text();
    heading.x = 400;
    heading.y = 50;
    heading.set("text", "Welcome to the Presentation");
    heading.color = "black";
    heading.fontSize = 32;
    heading.fontFamily = "Arial";

    // Add main display image under the heading
    const mainImage = canvas.add.image();
    mainImage.x = 300;
    mainImage.y = 120;
    mainImage.set("src", "scene.png");
    mainImage.width = 600;
    mainImage.height = 250;

    // Add a list
    const list = canvas.add.list();
    list.x = 100;
    list.y = 100;
    list.set("listArray", ["First item", "Second item", "Third item"]);
    list.set("fontSize", 20);
    list.set("fontFamily", "Arial");
    list.set("color", "red");
    list.set("lineGap", 5);
    list.set("indentation", 5);

    // Add a PieChart
    const pieChart = canvas.add.piechart();
    pieChart.x = 500;
    pieChart.y = 180;
    pieChart.set("radius", 80);
    pieChart.set("data", [
        { label: "A", percentage: 5, color: "red" },
        { label: "B", percentage: 15, color: "blue" },
        { label: "C", percentage: 80, color: "green" }
    ]);
    pieChart.set("showLabels", true);
    pieChart.set("labelFontSize", 14);
    pieChart.set("labelColor", "black");


    canvas.draw();
}

await run();
