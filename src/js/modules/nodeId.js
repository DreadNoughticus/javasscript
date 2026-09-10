import { elements } from './domElements.js'

export function updateNodeId(newId) {
  if (!elements.nodeIdView) {
    throw new Error("Element with ID 'nodeIdView' not found");
  }

  elements.nodeIdView.textContent = newId;
}