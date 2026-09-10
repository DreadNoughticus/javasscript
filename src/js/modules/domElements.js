export const elements = {
  controller: document.getElementById('controller'),
  inspector: document.getElementById('inspector'),
  nodesContainer: document.getElementById('nodes'),
  nodeIdInput: document.getElementById('nodeId'),
  newNodeButton: document.getElementById('newNode'),
  nodeIdView: document.getElementById('nodeIdView'),
  nodePeers: document.getElementById('nodePeers'),
  deleteNodeButton: document.getElementById('deleteNode'),
  randomLayoutButton: document.getElementById('randomLayout'),
  clearAllButton: document.getElementById('clearAll')
};

for (const [key, value] of Object.entries(elements)) {
  if (!value) {
    throw new Error(`Element with ID '${key}' not found`);
  }
}

