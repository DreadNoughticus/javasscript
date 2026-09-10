/**
 * Kahn's algorithm topological sort for a graphology graph.
 * Edges are treated as directed (u → v means u comes before v).
 *
 * @param {object} graph graphology Graph instance
 * @returns {string[]} nodes in topological order
 */
export function topologicalSort(graph) {
  const remainingInDegree = new Map();
  const queue = [];
  const order = [];

  graph.forEachNode((node) => {
    const degree = graph.inDegree(node);
    remainingInDegree.set(node, degree);
    if (degree === 0) {
      queue.push(node);
    }
  });

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    graph.forEachOutNeighbor(node, (neighbor) => {
      const nextDegree = remainingInDegree.get(neighbor) - 1;
      remainingInDegree.set(neighbor, nextDegree);
      if (nextDegree === 0) {
        queue.push(neighbor);
      }
    });
  }

  if (order.length !== graph.order) {
    throw new Error('Graph has a cycle; topological sort is not possible');
  }

  return order;
}
