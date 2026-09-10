import { state } from './state.js'
import { elements } from './domElements.js'
import { updateNodeId } from './nodeId.js'

export function togglePanel(panel) {
  if (!['controller', 'inspector'].includes(panel)) {
    throw new Error(`Invalid panel name: ${panel}`);
  }

  if (panel === state.activePanel) return;
  elements[state.activePanel].classList.remove('active');
  elements[panel].classList.add('active');
  state.activePanel = panel;
}

export function openInspector(nodeId) {
  state.selectedNode = nodeId;
  updateNodeId(nodeId);
  updateInspectorPeers();
  togglePanel('inspector');
}

export function updateInspectorPeers() {
  if (!state.selectedNode || state.activePanel !== 'inspector') return;
  
  const nodeId = state.selectedNode;
  const peers = state.graph.hasNode(nodeId) ? state.graph.neighbors(nodeId) : [];
  elements.nodePeers.innerHTML = peers.length
    ? peers.map((peer) => `<div>${peer}</div>`).join('')
    : '<div>No connections</div>';
}

export function closeInspector() {
  state.selectedNode = null;
  togglePanel('controller');
}