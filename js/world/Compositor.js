export default class Compositor {
   constructor() {
      this.layers = new Map();
   }

   setLayer(layer){
   	this.layers.set(layer.name,layer);
   }

   getLayer(name){
   	return this.layers.get(name);
   }
   
   draw(context, camera){
	   //draw void
      context.fillStyle = "black";
	   context.fillRect(0, 0, Game.width, Game.height);


      this.layers.forEach((layer,key, map) => layer.draw(context, camera));

      context.strokeStyle = 'purple';

      context.beginPath();
      context.rect(0, 0, Game.width, Game.height);
      context.stroke();
      context.closePath();
   }
}