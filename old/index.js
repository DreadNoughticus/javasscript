/** 
 * DISCLAIMER
 * This script has been heavily LLM assisted after almost a week of not-so-gruelling work attempting to get it working.
 * Frontend isn't my strong suit or where my interests lie, and I don't really know any other developers, especially not ones capable of completing this quickly.
 * (REMOVE IF FAILED) No direct content has been copy-pasted, and every line has been reviewed and hand-typed by me (or someone on stackoverflow).
*/
const width = document.getElementById('nodes').offsetWidth;
const height = document.getElementById('nodes').offsetHeight;
const graph = new graphology.Graph()
// Basic setup
const stage = new Konva.Stage({
  container: 'nodes',
  width: width,
  height: height,
});
const mainLayer = new Konva.Layer();
const dragLayer = new Konva.Layer();
stage.add(mainLayer);
stage.add(dragLayer);

// Make a new node
function newNode(layer, id, x, y) {
  const node = new Konva.Circle({
    x: x,
    y: y,
    radius: 16,
    fill: "#525252",
    draggable: true,
    id: id,
    data: {
      connections: []
    }
  });
  layer.add(node);
  graph.addNode(id)
}
// Set up node grids
for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 10; y++) {
    console.log(String(x))
    console.log(String(y))
    console.log(String(x) + String(y))
    newNode(mainLayer, String(x) + String(y), x * 46 + stage.attrs.width / 4, y * 46 + stage.attrs.height / 4);
  }
}


const loop = new Konva.Animation(function(frame) {
  let nodes = mainLayer.find("Circle")
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if(j==i){continue}
      let dist = Math.hypot(
        nodes[j].attrs.x - nodes[i].attrs.x, 
        nodes[j].attrs.y - nodes[i].attrs.y
      )
      if (dist < nodes[i].attrs.radius * 4) {
        let line = new Konva.Line({
          points: [nodes[j].attrs.x, nodes[j].attrs.y, nodes[i].attrs.x, nodes[i].attrs.y],
          stroke: 'white',
          strokeWidth: 15
        })
        mainLayer.add(line)
        graph.addUndirectedEdge(nodes[j].attrs.id, nodes[i].attrs.id)
      }
    }
  }
}, mainLayer)
loop.start()

/**
 * Create nodes
 * - track nodes in radius
 * - make draggable
 * Create lines between nodes
 */

/**
 * Optimise
 */