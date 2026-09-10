import { state } from './state.js'
import {elements} from './domElements.js'
export function togglePanel(panel) {
  if (!['controller', 'inspector'].includes(panel)) {
      throw new Error(`Invalid panel name: ${panel}`);
    }

  if (panel === state.activePanel) return;
  elements[state.activePanel].classList.remove('active');
  elements[panel].classList.add('active');
  state.activePanel = panel;
}