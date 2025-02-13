import BaseItem from "./BaseItem.js";
import uuid from "./uuid.js";

export default class PieChart extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || PieChart.itemExtraData());
  }

  static itemExtraData() {
    return {
      uuid: uuid(),
      type: "piechart",
      x: 200,
      y: 200,
      radius: 100,
      data: [
        { label: "A", percentage: 30, color: "red" },
        { label: "B", percentage: 50, color: "blue" },
        { label: "C", percentage: 20, color: "green" },
      ],
      showLabels: true,
      labelFontSize: 14,
      labelColor: "black",
      globalAlpha: 1,
    };
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.itemExtra.globalAlpha;
    let { x, y, radius, data, showLabels, labelFontSize, labelColor } = this.itemExtra;
    let startAngle = 0;

    data.forEach((item) => {
      let sliceAngle = (item.percentage / 100) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();

      if (showLabels) {
        let midAngle = startAngle + sliceAngle / 2;
        let labelX = x + Math.cos(midAngle) * (radius * 0.7);
        let labelY = y + Math.sin(midAngle) * (radius * 0.7);
        ctx.fillStyle = labelColor;
        ctx.font = `${labelFontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.label, labelX, labelY);
      }
      startAngle += sliceAngle;
    });
    ctx.restore();
  }
}

