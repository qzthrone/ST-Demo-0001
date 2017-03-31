var floor = {

	"setup": function () {

		var canvas = document.getElementById("floor");
		var	rows = 6;
		var	cols = 8;
		var	tileSize = 10;
		var	rowSpacing = 5;
		var	colSpacing = 8;
		var totalWidth = tileSize*cols+colSpacing*(cols-1);
		var totalHeight = tileSize*rows+rowSpacing*(rows-1);
		canvas.width = 800;
		canvas.height = canvas.width/totalWidth*totalHeight;
		var scale = Math.floor(canvas.width/totalWidth);
		
		this.shapeParams = {
			rows: 6,
			cols: 8,
			tileSize: tileSize*scale,
			rowSpacing: rowSpacing*scale,
			colSpacing: colSpacing*scale,
			deltaX: (canvas.width - totalWidth*scale)/2,
			deltaY: (canvas.height - totalHeight*scale)/2,
			offset: 3
		};

		this.ctx = canvas.getContext("2d");

		for (row = 0; row < rows; row++)
		{
			for (col = 0; col < cols; col++)
			{
				var x = this.shapeParams.deltaX + (this.shapeParams.tileSize+this.shapeParams.colSpacing)*col;
				var y = this.shapeParams.deltaY + (this.shapeParams.tileSize+this.shapeParams.rowSpacing)*row;
				this.ctx.strokeRect(x,y,this.shapeParams.tileSize,this.shapeParams.tileSize);
				this.ctx.strokeRect(x+this.shapeParams.offset,y+this.shapeParams.offset,this.shapeParams.tileSize-2*this.shapeParams.offset,this.shapeParams.tileSize-2*this.shapeParams.offset);
			}
		}
	},

	"sensorIDtoLocation": function (id) {
		var row = Math.floor(id/this.shapeParams.cols);
		var col = id % this.shapeParams.cols;
		return [row, col];
	},

	"mark": function ([row, col]) {
		var x = (this.shapeParams.tileSize+this.shapeParams.colSpacing)*col+this.shapeParams.deltaX;
		var y = (this.shapeParams.tileSize+this.shapeParams.rowSpacing)*row+this.shapeParams.deltaY;
		this.ctx.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		this.ctx.fillRect(x+2*this.shapeParams.offset,y+2*this.shapeParams.offset,this.shapeParams.tileSize-4*this.shapeParams.offset,this.shapeParams.tileSize-4*this.shapeParams.offset);
	},

	"unmark": function ([row, col]) {
		var x = (this.shapeParams.tileSize+this.shapeParams.colSpacing)*col+this.shapeParams.deltaX;
		var y = (this.shapeParams.tileSize+this.shapeParams.rowSpacing)*row+this.shapeParams.deltaY;
		this.ctx.clearRect(x+1.5*this.shapeParams.offset,y+1.5*this.shapeParams.offset,this.shapeParams.tileSize-3*this.shapeParams.offset,this.shapeParams.tileSize-3*this.shapeParams.offset);
	}

}
