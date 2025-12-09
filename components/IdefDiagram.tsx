import React from 'react';
import { DiagramData, IdefNode, IdefEdge } from '../types';

interface IdefDiagramProps {
  data: DiagramData;
}

const BOX_BORDER = "#000000";
const ARROW_COLOR = "#000000";
const FONT_FAMILY = "'Merriweather', serif";

const IdefDiagram: React.FC<IdefDiagramProps> = ({ data }) => {
  const svgWidth = 1400;
  const svgHeight = 1000;

  // Helper to find node
  const getNode = (id: string) => data.nodes.find((n) => n.id === id);

  // Helper to calculate path
  const getPath = (edge: IdefEdge) => {
    let startX = 0, startY = 0, endX = 0, endY = 0;
    const sourceNode = getNode(edge.sourceId);
    const targetNode = getNode(edge.targetId);

    // --- Determine Start Point ---
    if (edge.sourceId === 'EXTERNAL') {
      // Input comes from outside boundaries
      if (edge.side === 'LEFT') {
        if (!targetNode) return '';
        startX = 10;
        startY = targetNode.y + targetNode.height / 2 + (edge.offset || 0);
      } else if (edge.side === 'TOP') {
        if (!targetNode) return '';
        startX = targetNode.x + targetNode.width / 2 + (edge.offset || 0);
        startY = 10;
      } else if (edge.side === 'BOTTOM') {
        if (!targetNode) return '';
        startX = targetNode.x + targetNode.width / 2 + (edge.offset || 0);
        startY = svgHeight - 10;
      }
    } else if (sourceNode) {
      // Source is a node
      const side = edge.sourceSide || 'RIGHT'; // Default exit is Right
      if (side === 'RIGHT') {
        startX = sourceNode.x + sourceNode.width;
        startY = sourceNode.y + sourceNode.height / 2 + (edge.offset || 0); // Allow offset on output too
      } else if (side === 'TOP') { // Feedback loop exiting top
        startX = sourceNode.x + sourceNode.width / 2 + (edge.offset || 0);
        startY = sourceNode.y;
      }
    }

    // --- Determine End Point ---
    if (edge.targetId === 'EXTERNAL') {
       // Output goes to outside
       if (edge.side === 'RIGHT' && sourceNode) {
         endX = svgWidth - 10;
         endY = sourceNode.y + sourceNode.height / 2 + (edge.offset || 0);
       }
    } else if (targetNode) {
      if (edge.side === 'LEFT') {
        endX = targetNode.x;
        endY = targetNode.y + targetNode.height / 2 + (edge.offset || 0);
      } else if (edge.side === 'TOP') {
        endX = targetNode.x + targetNode.width / 2 + (edge.offset || 0);
        endY = targetNode.y;
      } else if (edge.side === 'BOTTOM') {
        endX = targetNode.x + targetNode.width / 2 + (edge.offset || 0);
        endY = targetNode.y + targetNode.height;
      }
    }

    // --- Routing Logic (Orthogonal) ---
    
    // Case 1: Straight horizontal line (External Input -> Node Left)
    if (edge.sourceId === 'EXTERNAL' && edge.side === 'LEFT') {
      return `M ${startX} ${startY} L ${endX} ${endY}`;
    }

    // Case 2: Node to Node
    if (sourceNode && targetNode) {
        // Diagonal downward flow (Output Right to Input Left)
        if (edge.sourceSide !== 'TOP' && targetNode.x > sourceNode.x) {
            // Find a midpoint X that doesn't overlap too much. 
            // Standard approach: Go Right, then Down, then Right.
            // Or: Go Right to mid, Down to match Y, Right to Target.
            const midX = sourceNode.x + sourceNode.width + 30 + ((targetNode.x - (sourceNode.x + sourceNode.width)) / 4); 
            // Adjust midX slightly based on offset to prevent bunching?
            // For now, simple orthogonal
            return `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
        }
        // Feedback loop (Node Top to Node Top)
        if (edge.sourceSide === 'TOP' && edge.side === 'TOP') {
            // Go Up, then Left/Right, then Down
            const topY = Math.min(sourceNode.y, targetNode.y) - 60; // Go well above
            return `M ${startX} ${startY} L ${startX} ${topY} L ${endX} ${topY} L ${endX} ${endY}`;
        }
    }

    // External Controls/Mechanisms (Vertical lines)
    if ((edge.sourceId === 'EXTERNAL' && (edge.side === 'TOP' || edge.side === 'BOTTOM'))) {
       return `M ${startX} ${startY} L ${endX} ${endY}`;
    }

    // External Outputs (Horizontal)
    if (edge.targetId === 'EXTERNAL' && edge.side === 'RIGHT') {
        return `M ${startX} ${startY} L ${endX} ${endY}`;
    }

    // Fallback: simple direct line (shouldn't happen often in orthogonal IDEF)
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  };

  // Label Positioning
  const getLabelPos = (edge: IdefEdge): { x: number; y: number; anchor: 'start' | 'middle' | 'end' | 'inherit' } => {
    const path = getPath(edge);
    const cmd = path.split(' ');
    const sx = parseFloat(cmd[1]);
    const sy = parseFloat(cmd[2]);
    
    // Adjust based on side
    if (edge.side === 'LEFT') return { x: sx + 10, y: sy - 5, anchor: 'start' }; 
    if (edge.side === 'TOP') return { x: sx + 5, y: sy + 15, anchor: 'start' }; 
    if (edge.side === 'BOTTOM') return { x: sx + 5, y: sy - 15, anchor: 'start' }; 
    if (edge.side === 'RIGHT') return { x: sx + 10, y: sy - 5, anchor: 'start' }; 
    
    // Special case for Feedback loops
    if (edge.sourceSide === 'TOP' && edge.side === 'TOP') {
       // Place label on the horizontal segment above
       // Path is Start -> TopY -> EndTopY -> End
       // M sx sy L sx topY L ex topY L ex ey
       // The horizontal part is index 5 (sx topY) to 7 (ex topY) roughly
       const topY = parseFloat(cmd[5]); 
       const midX = (sx + parseFloat(cmd[7])) / 2;
       return { x: midX, y: topY - 5, anchor: 'middle' };
    }

    return { x: sx, y: sy, anchor: 'middle' };
  };

  return (
    <div className="w-full overflow-auto bg-white border border-gray-300 shadow-sm p-4 rounded-lg">
      <h2 className="text-center font-serif text-xl font-bold mb-4">{data.code}: {data.title}</h2>
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="min-w-[1000px] min-h-[800px]">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={ARROW_COLOR} />
          </marker>
        </defs>

        {/* Draw Edges */}
        {data.edges.map((edge) => {
            const d = getPath(edge);
            const labelPos = getLabelPos(edge);
            return (
                <g key={edge.id}>
                    <path
                        d={d}
                        stroke={ARROW_COLOR}
                        strokeWidth="1.5"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                    />
                    <text
                        x={labelPos.x}
                        y={labelPos.y}
                        textAnchor={labelPos.anchor}
                        fill="#000"
                        fontSize="11px"
                        fontFamily={FONT_FAMILY}
                        className="pointer-events-none"
                    >
                        <tspan fill="black" stroke="white" strokeWidth="3" paintOrder="stroke" fontWeight="500">
                          {edge.label}
                        </tspan>
                    </text>
                </g>
            );
        })}

        {/* Draw Nodes */}
        {data.nodes.map((node) => (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y}
              width={node.width}
              height={node.height}
              fill="#ffffff"
              stroke={BOX_BORDER}
              strokeWidth="2"
              className="drop-shadow-sm"
            />
            {/* Node Number (Bottom Right) */}
            <line x1={node.x + node.width - 40} y1={node.y + node.height - 25} x2={node.x + node.width} y2={node.y + node.height - 25} stroke="black" strokeWidth="1" />
            <line x1={node.x + node.width - 40} y1={node.y + node.height - 25} x2={node.x + node.width - 40} y2={node.y + node.height} stroke="black" strokeWidth="1" />
            <text
                x={node.x + node.width - 20}
                y={node.y + node.height - 8}
                textAnchor="middle"
                fontSize="14px"
                fontWeight="bold"
                fontFamily={FONT_FAMILY}
            >
                {data.code === 'A-0' ? '0' : node.number}
            </text>

            {/* Node Label (Center) */}
            <foreignObject x={node.x} y={node.y} width={node.width} height={node.height - 25}>
                <div className="w-full h-full flex items-center justify-center p-2 text-center">
                    <p style={{ fontFamily: FONT_FAMILY }} className="text-sm font-semibold leading-tight">{node.label}</p>
                </div>
            </foreignObject>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default IdefDiagram;