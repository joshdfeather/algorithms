// import visualization libraries {
const {
  Tracer,
  Array1DTracer,
  GraphTracer,
  Randomize,
  Layout,
  VerticalLayout,
} = require("algorithm-visualizer");
// }

const G = Randomize.Graph({
  N: 5,
  ratio: 0.6,
  directed: false,
  weighted: true,
});
const MAX_VALUE = Infinity;
const S = []; // S[end] returns the distance from start node to end node
for (let i = 0; i < G.length; i++) S[i] = MAX_VALUE;

// Heuristic function based on actual distances between nodes
function heuristic(node, goal) {
  if (G[node][goal] !== 0) {
    return G[node][goal]; // Use the direct edge weight if available
  } else {
    // Use an alternative if no direct edge exists (optional)
    let minEdge = MAX_VALUE;
    for (let i = 0; i < G.length; i++) {
      if (G[node][i] !== 0 && G[node][i] < minEdge) {
        minEdge = G[node][i];
      }
    }
    return minEdge !== MAX_VALUE ? minEdge : 1; // Use the smallest edge connected to the node as a fallback heuristic
  }
}

// define tracer variables {
const tracer = new GraphTracer().directed(false).weighted();
const tracerS = new Array1DTracer();
Layout.setRoot(new VerticalLayout([tracer, tracerS]));
tracer.set(G);
tracerS.set(S);
Tracer.delay();
// }

function AStar(start, end) {
  let minIndex;
  let minDistance;
  const D = []; // D[i] indicates whether the i-th node is discovered or not
  const openSet = []; // Nodes to be evaluated
  const previous = []; // Array to store the previous node for path reconstruction
  for (let i = 0; i < G.length; i++) {
    D.push(false);
    previous.push(null);
  }
  S[start] = 0; // Starting node is at distance 0 from itself
  openSet.push({ node: start, fCost: heuristic(start, end) });

  // visualize {
  tracerS.patch(start, S[start]);
  Tracer.delay();
  tracerS.depatch(start);
  tracerS.select(start);
  // }

  while (openSet.length > 0) {
    // Find the node in the open set with the lowest fCost (gCost + hCost)
    minIndex = openSet.reduce((prev, curr, idx, arr) => {
      return arr[prev].fCost < curr.fCost ? prev : idx;
    }, 0);

    const current = openSet[minIndex].node;

    if (current === end) {
      break; // If we reached the goal, stop
    }

    openSet.splice(minIndex, 1);
    D[current] = true;

    // visualize {
    tracerS.select(current);
    tracer.visit(current);
    Tracer.delay();
    // }

    // For every unvisited neighbor of the current node
    for (let i = 0; i < G.length; i++) {
      if (G[current][i] && !D[i]) {
        const tentative_gCost = S[current] + G[current][i];
        if (tentative_gCost < S[i]) {
          S[i] = tentative_gCost;
          previous[i] = current; // Store the previous node
          const fCost = tentative_gCost + heuristic(i, end);
          openSet.push({ node: i, fCost });

          // visualize {
          tracerS.patch(i, S[i]);
          tracer.visit(i, current, S[i]);
          Tracer.delay();
          tracerS.depatch(i);
          tracer.leave(i, current);
          Tracer.delay();
          // }
        }
      }
    }
    // visualize {
    tracer.leave(current);
    Tracer.delay();
    // }
  }

  // If end is reached, reconstruct the path
  if (S[end] !== MAX_VALUE) {
    let path = [];
    for (let at = end; at !== null; at = previous[at]) {
      path.push(at);
    }
    path.reverse();

    // visualize the final path
    for (let i = 0; i < path.length; i++) {
      tracer.select(path[i]);
      if (i > 0) {
        tracer.visit(path[i], path[i - 1]);
      }
      Tracer.delay();
    }
  }
}

const s = Randomize.Integer({ min: 0, max: G.length - 1 }); // s = start node
let e; // e = end node
do {
  e = Randomize.Integer({ min: 0, max: G.length - 1 });
} while (s === e);
Tracer.delay();
AStar(s, e);
