import { elements } from './domElements.js'

export function updateNodeId(newId) {

  if (!elements.nodeIdView) {
      throw new Error(`Element with ID '${elements.nodeIdView.id}' not found`);
    }

  nodeIdView.textContent = newId;
}