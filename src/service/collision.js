export const collisionCircleAndRect = (circle, rect) => {
  const circleRadius = circle.width / 2;
  const circleCenter =  new PIXI.Point(
    circle.x + circle.pivot.x,
    circle.y + circle.pivot.y    
  );

  const vertexLT = new PIXI.Point(rect.x, rect.y);
  const vertexRT = new PIXI.Point(rect.x + rect.width, rect.y);
  const vertexLB = new PIXI.Point(rect.x, rect.y + rect.height);
  const vertexRB = new PIXI.Point(rect.x + rect.width, rect.y + rect.height);

  if (circleCenter.x - circleRadius > vertexLT.x && 
      circleCenter.x + circleRadius < vertexRT.x && 
     (circleCenter.y + circleRadius >= vertexLT.y ||
      circleCenter.y - circleRadius <= vertexLB.y))
  {
      return true;
  }

  if (circleCenter.y + circleRadius > vertexLT.y && 
      circleCenter.y - circleRadius < vertexLB.y && 
     (circleCenter.x + circleRadius >= vertexLT.x ||
      circleCenter.x - circleRadius <= vertexRT.x))
  {
    return true;
  }

  if (dist(vertexRT, circleCenter) <= circleRadius ||
      dist(vertexLT, circleCenter) <= circleRadius ||
      dist(vertexRB, circleCenter) <= circleRadius ||
      dist(vertexLB, circleCenter) <= circleRadius) 
  {
    return true;
  }

  return false;
}

function dist(p1, p2) {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
  );
}