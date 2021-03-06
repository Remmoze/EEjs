export function createBgLayer(level, sprites){
   const Buffer = document.createElement('canvas');
   Buffer.width = 1600; //656
   Buffer.height = 1600; //496

   const context = Buffer.getContext('2d');
  
   level.tiles.forEach((tile, x, y) => {
      sprites.drawTile(tile.name, context, x, y);
   });
    
   return function drawBackgroundLayer(context, camera){
      context.drawImage(Buffer, -camera.pos.x, -camera.pos.y);
   };
}

export function createSpritelayer(entities, width = 64, height = 64) {
   const Buffer = document.createElement('canvas');
   Buffer.width = width;
   Buffer.height = height;
   const BufferContext = Buffer.getContext('2d');

   return function drawSpriteLayer(context, camera){
      entities.forEach(entity => {

         BufferContext.clearRect(0, 0, width, height);
         entity.draw(BufferContext);
         context.drawImage(Buffer, entity.pos.x - camera.pos.x, entity.pos.y - camera.pos.y);

      });
   }
}

export function createCollisionLayer(level){
   const resolvedTiles = [];

   const TileResolver = level.tileCollider.tiles;
   const tileSize = TileResolver.tileSize;

   const getByIndexOriginal = TileResolver.getByIndex;
   TileResolver.getByIndex = function getByIndexFake(x, y){
      resolvedTiles.push({x, y});
      return getByIndexOriginal.call(TileResolver, x, y);
   }

   return function drawCollision(context, camera){
      context.strokeStyle = 'blue';
      resolvedTiles.forEach(({x, y}) => {
         context.beginPath();
         context.strokeStyle = (level.tiles.get(x,y) && level.tiles.get(x,y).name === "ground")? 'yellow' : 'green';
         context.rect(x * tileSize - camera.pos.x, y * tileSize - camera.pos.y, tileSize, tileSize);
         context.stroke();
      });
      context.strokeStyle = 'red';
      level.entities.forEach(entity => {
         context.beginPath();
         context.rect(entity.pos.x - camera.pos.x, entity.pos.y - camera.pos.y, entity.size.x, entity.size.y);
         context.stroke();
      });
      resolvedTiles.length = 0;
   };
}

export function createCameraLayer(cameraToDraw){
   return function drawCameraRect(context, fromCamera){
      context.strokeStyle = 'purple';
         context.beginPath();
         context.rect(
            cameraToDraw.pos.x - fromCamera.pos.x,
            cameraToDraw.pos.y - fromCamera.pos.y, 
            cameraToDraw.size.x, 
            cameraToDraw.size.y);
         context.stroke();
   }
}