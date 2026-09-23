import { PriorityType } from '../models/incident.model';

export interface CreateIncidentDto {
  title: string;
  description: string;
  reporter: string;
  location: string;
  priority: PriorityType;
  estimatedMinutes: number;
}