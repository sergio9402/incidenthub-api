export type PriorityType = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type StatusType = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

export interface Incident {
  id: number;
  title: string;
  description: string;
  reporter: string;
  location: string;
  priority: PriorityType;
  status: StatusType;
  estimatedMinutes: number;
  createdAt: string;
}