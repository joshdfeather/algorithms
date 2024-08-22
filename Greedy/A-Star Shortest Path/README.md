# A\* Shortest Path Algorithm

The A\* (A Star) algorithm is a popular and efficient search algorithm used to find the shortest path between nodes in a graph. It is widely used in various applications, such as pathfinding in video games, robotics, and network routing

![](https://www.101computing.net/wp/wp-content/uploads/A-Star-Search-Algorithm-Step-1.png)

## Overview
A\* combines features of Dijkstra's Algorithm and Greedy Best-First Search. It uses a heuristic to prioritize paths that appear to lead most directly to the goal, which often allows it to find the shortest path more efficiently than Dijkstra's algorithm alone. The algorithm calculates the cost of reaching a node based on the actual cost from the start node and an estimated cost to the goal.

## Key Concepts
G-Score: The cost of the path from the start node to the current node.
H-Score (Heuristic): An estimate of the cost from the current node to the goal.
F-Score: The sum of G-Score and H-Score. A\* selects the node with the lowest F-Score to explore next.

## How It Works
Initialization: Start with the initial node. The G-Score is 0, and the F-Score is equal to the heuristic value for reaching the goal.

Exploration: For each node, calculate the G-Score and H-Score. Update the F-Score for each adjacent node.

Path Selection: Select the node with the lowest F-Score for exploration. If the goal is reached, the algorithm terminates.

Repeat: Continue exploring nodes, updating scores, and selecting the next node until the goal is found or all possible paths are exhausted.

## References
trekhleb/javascript-algorithms - A* Implementation
Wikipedia - A* Search Algorithm
YouTube - A* Pathfinding by Amit Patel
YouTube - A* Algorithm by Sebastian Lague
