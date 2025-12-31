// Vitals data types
export interface VitalsData {
  heartRate: number;
  spO2: number;
  temperature: number;
  timestamp: number;
}

// Alert types
export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: number;
  resolved: boolean;
}

// Emergency event types
export interface EmergencyEvent {
  time: number;
  message: string;
  status?: 'pending' | 'active' | 'completed';
}

// Architecture layer types
export interface ArchitectureLayer {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  details: string[];
  color: string;
}

// Technology stack types
export interface Technology {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'edge' | 'tools';
  purpose: string;
  rationale: string;
  icon?: string;
}

// ADR (Architecture Decision Record) types
export interface ADR {
  id: string;
  title: string;
  decision: string;
  rationale: string[];
  tradeoffs: {
    pros: string[];
    cons: string[];
  };
}

// Sprint/Timeline types
export interface Sprint {
  id: number;
  name: string;
  phase: 'Foundation' | 'MVP' | 'Enhancement' | 'Finalization';
  startDate: string;
  endDate: string;
  deliverables: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
}

// Team member types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  responsibilities: string[];
  avatar?: string;
  github?: string;
  linkedin?: string;
}

// UML Diagram types
export interface UMLDiagram {
  type: 'useCase' | 'class' | 'sequence' | 'activity';
  title: string;
  description: string;
  mermaidCode: string;
}

// Theme context types
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
