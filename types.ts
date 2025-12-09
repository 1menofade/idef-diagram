export enum IdefType {
  CONTEXT = 'CONTEXT',
  DECOMPOSITION = 'DECOMPOSITION'
}

export interface IdefNode {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  number?: string; // e.g., A1, A2
}

export interface IdefEdge {
  id: string;
  sourceId: string | 'EXTERNAL'; // 'EXTERNAL' means it comes from the system boundary
  targetId: string | 'EXTERNAL';
  label: string;
  side: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT'; // Entry side for target, Exit side for source
  sourceSide?: 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT'; // Explicit override for source exit
  // For routing
  offset?: number; // Distance from center/start
}

export interface DiagramData {
  nodes: IdefNode[];
  edges: IdefEdge[];
  title: string;
  code: string;
}
