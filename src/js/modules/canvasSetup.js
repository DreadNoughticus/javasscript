import { state } from './state.js'
import { elements } from './domElements.js'
import { openInspector, closeInspector } from './uiState.js'
import showToast from '../../utils/toast.js';
import { uniqueNamesGenerator, adjectives, colors, animals } from '../../../unique-names-generator.js';

const canvasConfig = {
  containerId: 'canvasWrapper',
  nodePadding: 50
};


export function setupCanvas() {
  if (!elements.nodesContainer) {
    throw new Error('Nodes container element not found');
  }

  state.width = elements.nodesContainer.offsetWidth;
  state.height = elements.nodesContainer.offsetHeight;
  state.graph = new graphology.Graph({ type: "undirected" });
  state.stage = new Konva.Stage({
    container: canvasConfig.containerId,
    width: state.width,
    height: state.height,
  });
  state.mainLayer = new Konva.Layer();
  state.tooltipLayer = new Konva.Layer();
  state.nodeGroups = {};

  state.stage.add(state.mainLayer);
  state.stage.add(state.tooltipLayer)

  state.tooltip = new Konva.Text({
    text: '',
    fontFamily: 'Lilex',
    fontSize: 12,
    padding: 5,
    textFill: 'white',
    fill: 'white',
    alpha: 1,
    visible: false,
  });
  state.tooltipLayer.add(state.tooltip)

  state.stage.on('click tap', (e) => {
    if (e.target.getClassName() === 'Circle') return;
    closeInspector();
  });
}

const MAX_NODES = 20;


function checkCollision(x, y, radius) {
  const nodes = state.mainLayer.find('Circle');
  for (const node of nodes) {
    const dx = x - node.x();
    const dy = y - node.y();
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < radius + node.attrs.radius) {
      return true;
    }
  }
  return false;
}

function addNode(nodeId) {
  if (state.graph.order >= MAX_NODES) {
    showToast(`Maximum number of nodes (${MAX_NODES}) reached.`);
    return;
  }

  state.graph.addNode(nodeId);

  const radius = (state.width + state.height) / 100;
  let x, y;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    if (state.graph.order > 1) {
      // Find the position of the last added node
      const lastNodeId = state.graph.nodes()[state.graph.order - 2];
      const lastNode = state.mainLayer.findOne(`#${lastNodeId}`);
      const MIN_DISTANCE = (lastNode.attrs.radius + lastNode.attrs.radius) * 1;
      const MAX_DISTANCE = (lastNode.attrs.radius + lastNode.attrs.radius) * 3;
      let angle = Math.random() * Math.PI * 2; // Random angle in radians
      let distance = MIN_DISTANCE + Math.random() * (MAX_DISTANCE - MIN_DISTANCE);

      x = lastNode.x() + Math.cos(angle) * distance;
      y = lastNode.y() + Math.sin(angle) * distance;

      // Ensure the new node is within canvas bounds
      x = Math.max(radius, Math.min(state.width - radius, x));
      y = Math.max(radius, Math.min(state.height - radius, y));
    } else {
      // First node, place it randomly
      x = state.width / 2
      y = state.height / 2
    }

    attempts++;
  } while (checkCollision(x, y, radius) && attempts < maxAttempts);

  if (attempts >= maxAttempts) {
    showToast('Could not find a suitable position for the new node.');
    state.graph.dropNode(nodeId);
    return;
  }

  const node = new Konva.Circle({
    x: x,
    y: y,
    radius: radius,
    fill: '#ee5396',
    id: nodeId,
    draggable: true,
  });
  state.mainLayer.add(node);
  elements.nodeIdInput.value = '';

  let didDrag = false;

  node.on('mousemove', () => {
    const mousePos = state.stage.getPointerPosition();
    state.tooltip.position({
      x: mousePos.x + 8,
      y: mousePos.y + 8,
    });
    state.tooltip.text(nodeId);
    state.tooltip.show();
    state.tooltipLayer.draw();
  });
  node.on('dragstart', () => {
    didDrag = true;
    state.tooltip.hide();
    state.tooltipLayer.draw();
  });
  node.on('mouseout', () => {
    state.tooltip.hide();
    state.tooltipLayer.draw();
  });
  node.on('click tap', () => {
    if (didDrag) {
      didDrag = false;
      return;
    }
    openInspector(nodeId);
  });
}

elements.newNodeButton.addEventListener('click', () => {
  let nodeId = elements.nodeIdInput.value;
  if (nodeId == '') {
    nodeId = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: '-',
      length: 3,
    });
    if (state.graph.order < MAX_NODES) {
      showToast(`Generated random ID: ${nodeId}`);
    }
  }
  addNode(nodeId);
});

elements.nodeIdInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    let nodeId = elements.nodeIdInput.value;
    if (nodeId == '') {
      nodeId = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: '-',
        length: 3,
      });
      if (state.graph.order < MAX_NODES) {
        showToast(`Generated random ID: ${nodeId}`);
      }
    }
    addNode(nodeId);
  }
});

elements.clearAllButton.addEventListener('click', clearAll);

elements.deleteNodeButton.addEventListener('click', deleteSelectedNode);

export function deleteSelectedNode() {
  if (!state.selectedNode) {
    showToast('No node selected');
    return;
  }

  const nodeId = state.selectedNode;
  
  // Remove node from graph
  if (state.graph.hasNode(nodeId)) {
    state.graph.dropNode(nodeId);
  }
  
  // Remove node from canvas
  const node = state.stage.findOne(`#${nodeId}`);
  if (node) {
    node.destroy();
  }
  
  // Remove all edges connected to this node from canvas
  const lines = state.stage.find('Line');
  lines.forEach((line) => {
    const edgeId = line.attrs.id;
    if (edgeId.includes(nodeId)) {
      line.destroy();
    }
  });
  
  state.mainLayer.draw();
  closeInspector();
}

export function clearAll() {
  // Clear all nodes and edges from both the graph and Konva canvas
  state.graph.clear();
  state.mainLayer.destroyChildren();
  state.mainLayer.draw();
  closeInspector();
}

export function resizeCanvas() {
  // Function to resize the canvas and adjust node positions accordingly.
  if (!elements.nodesContainer) {
    throw new Error('Nodes container element not found');
  }

  state.width = elements.nodesContainer.offsetWidth;
  state.height = elements.nodesContainer.offsetHeight;
  state.stage.width(state.width);
  state.stage.height(state.height);

  Object.values(state.nodeGroups).forEach(group => {
    const x = group.x();
    const y = group.y();
    if (x > state.width - canvasConfig.nodePadding) group.x(state.width - canvasConfig.nodePadding);
    if (y > state.height - canvasConfig.nodePadding) group.y(state.height - canvasConfig.nodePadding);
  });

  state.stage.draw();
}
