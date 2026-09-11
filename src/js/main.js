import { elements } from './modules/domElements.js';
import { togglePanel, updateInspectorPeers } from './modules/uiState.js';
import { setupCanvas, resizeCanvas } from './modules/canvasSetup.js';
import { updateNodeId } from './modules/nodeId.js';
import { changeNodeConnections } from './modules/nodeConnections.js';
import { state } from './modules/state.js'
import {  } from './modules/crcts/tester.js'
setupCanvas();

const edges = []

elements.randomLayoutButton.addEventListener('click', () => {
  state.graph.forEachNode((node) => {
  })
})

elements.startNodeButton.addEventListener('click', () => {
  
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