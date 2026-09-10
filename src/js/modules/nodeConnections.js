export function changeNodeConnections(nodeId, newConnections) {
  console.log(`Changing connections for node ${nodeId} to:`, newConnections);
    // Update the connections panel with the new connections
    const connectionsPanel = document.getElementById('connections-panel');
    if (connectionsPanel) {
      connectionsPanel.innerHTML = `<h3>Connections for Node ${nodeId}</h3><ul>${newConnections.map(conn => `<li>${conn}</li>`).join('')}</ul>`;
    }
  // Add logic to update node connections here
}