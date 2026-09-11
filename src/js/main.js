import { elements } from './modules/domElements.js';
import { togglePanel, updateInspectorPeers, openInspector } from './modules/uiState.js';
import { setupCanvas, resizeCanvas } from './modules/canvasSetup.js';
import { updateNodeId } from './modules/nodeId.js';
import { changeNodeConnections } from './modules/nodeConnections.js';
import { state } from './modules/state.js'
import {  } from './modules/crcts/tester.js'
import { evaluate } from './modules/crcts/eval.js';
import { shuffle } from '../utils/utils.js';
setupCanvas();

const edges = []

elements.randomLayoutButton.addEventListener('click', () => {
  state.graph.forEachNode((node) => {
    const neighbors = state.graph.neighbors(node)
    const shuffled = shuffle(neighbors)
    evaluate()
  })
})
let startNode = ""
let endNode = ""
let currentNode
elements.startNodeButton.addEventListener('click', () => {
  elements.startNodeButton.classList.remove('active')
  elements.endNodeButton.classList.add('active')
  startNode = elements.nodeIdView.textContent  
})
elements.endNodeButton.addEventListener('click', () => {
  elements.endNodeButton.classList.remove('active')
  elements.startNodeButton.classList.add('active')
  endNode = elements.nodeIdView.textContent
  state.stage.findOne(`#${startNode}`).fill('#42be65')
  state.stage.findOne(`#${endNode}`).fill('#FFFFFF')
  currentNode = startNode
  // Trigger navigator panel when both startNode and endNode are set
  if (startNode && endNode) {
    togglePanel('navigator')
  }
})

function gk(name) {
  return state.stage.findOne(`#${name}`)
}
elements.nextButton.addEventListener('click', () => {
  console.log('Next button clicked');
  
  const neighbors = state.graph.neighbors(currentNode);
  const shuffled = shuffle(neighbors);

  const endCoords = [gk(endNode).x(), gk(endNode).y()];
  const currentCoords = [gk(currentNode).x(), gk(currentNode).y()];

  // 1. Resolve your nodes
  const p1Node = shuffled[0] || currentNode;
  const p2Node = shuffled[1] || currentNode;
  const p3Node = shuffled[2] || currentNode;
  const p4Node = shuffled[3] || currentNode;

  // 2. Map the exact names returned by evaluate() to their actual nodes
  const nodeLookup = {
    evaluator: currentNode,
    p1Node: p1Node,
    p2Node: p2Node,
    p3Node: p3Node,
    p4Node: p4Node
  };

  const peer1Coords = [gk(p1Node).x(), gk(p1Node).y()];
  const peer2Coords = [gk(p2Node).x(), gk(p2Node).y()];
  const peer3Coords = [gk(p3Node).x(), gk(p3Node).y()];
  const peer4Coords = [gk(p4Node).x(), gk(p4Node).y()];

  // Returns a string like 'p1Node' or 'evaluator'
  let winningString = evaluate(endCoords, currentCoords, peer1Coords, peer2Coords, peer3Coords, peer4Coords);
  
  // 3. Extract the actual node reference securely using bracket notation
  let chosenNode = nodeLookup[winningString];
  if (chosenNode == currentNode) {
    return "vibe code this done"
  }
  if (state.graph.hasEdge(currentNode, chosenNode)) {
    let line = state.stage.findOne(`#${currentNode + "🏳️‍⚧️〰🏳️‍⚧️" + chosenNode}`)
    if (line != undefined) {
      line.stroke("#42be65")
      state.mainLayer.draw()

      console.log("test")
    }
    line = state.stage.findOne(`#${chosenNode + "🏳️‍⚧️〰🏳️‍⚧️" + currentNode}`)
    if (line != undefined) {
      line.stroke("#42be65")
      state.mainLayer.draw()
      console.log("test")

    }
    currentNode = chosenNode
  }
  // Ready to use! e.g., currentNode = chosenNode;
});



elements.fastForwardButton.addEventListener('click', () => {
  console.log('Fast-Forward button clicked')
})

window.addEventListener('resize', () => resizeCanvas(elements))
const loop = new Konva.Animation((frame) => {
  state.graph.forEachNode((node) => {
    state.graph.forEachNode((compNode) => {
      if (compNode != node) {
        const knode = state.stage.findOne(`#${node}`)
        const kcompNode = state.stage.findOne(`#${compNode}`)
        const xDist = knode.x() - kcompNode.x()
        const yDist = knode.y() - kcompNode.y()
        const dist = xDist * xDist + yDist * yDist
        if (dist <= (knode.attrs.radius * kcompNode.attrs.radius) * 52) {
          if (!state.graph.hasEdge(node, compNode)) {
            state.graph.addEdge(node, compNode)
          }
        } else if (dist >= (knode.attrs.radius * kcompNode.attrs.radius) * 52
          && state.graph.hasEdge(node, compNode)) {
          state.graph.dropEdge(node, compNode)
          
        }
      }
    })
    const lines = state.stage.find('Line')
    lines.forEach((line) => {
      const source = line.attrs.id.split("🏳️‍⚧️〰🏳️‍⚧️")[0]
      const target = line.attrs.id.split("🏳️‍⚧️〰🏳️‍⚧️")[1]
      if (!state.graph.hasEdge(source, target)) {
        line.destroy()
      }
    })
    state.graph.forEachEdge((edgekey, attrs, source, target) => {
      const src = state.stage.findOne(`#${source}`)
      const trgt = state.stage.findOne(`#${target}`)
      if (!state.stage.findOne(`#${source + "🏳️‍⚧️〰🏳️‍⚧️" + target}`)) {
        const line = new Konva.Line({
          points: [src.x(), src.y(), trgt.x(), trgt.y()],
          stroke: '#FFFFFF',
          strokeWidth: src.attrs.radius / 4,
          id: source + "🏳️‍⚧️〰🏳️‍⚧️" + target
        })

        state.mainLayer.add(line)
        line.moveToBottom()
      }
      if (state.stage.findOne(`#${source + "🏳️‍⚧️〰🏳️‍⚧️" + target}`)) {
        const line = state.stage.findOne(`#${source + "🏳️‍⚧️〰🏳️‍⚧️" + target}`)
        line.attrs.points = [src.x(), src.y(), trgt.x(), trgt.y()]
      }
    })
    
  })
  
  // Update inspector peers display dynamically
  updateInspectorPeers();
}, state.mainLayer);
loop.start()




// REWRITE PAGES WITH CLAUDE
// ASK DAD FOR SPARE MONITOR
// USE BIG COMPUTER WITH MAIN MONITOR, SPARE MONITOR FOR LAPTOP, ANY MORE SPARE MONITORS FOR LAPTOP, OR EXTRA MONITOR FOR CHECKLIST
// DOWNLOAD VSCODE ON BIG COMPUTER, USE LIVE SHARE, GIT REPO TYPE SHI
// GET CURSOR and windsurf and antigrav