import { Request, Response, NextFunction } from 'express';
import { incidents } from '../data/incidents.data';
import { Incident, StatusType } from '../models/incident.model';
import { AppError } from '../errors/app-error';

export class IncidentController {
  // 7.1 Consultar todos los incidentes
  public getAllIncidents(_req: Request, res: Response): void {
    res.status(200).json({
      ok: true,
      total: incidents.length,
      data: incidents
    });
  }

  // 7.2 Consultar incidente por ID
  public getIncidentById(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Number(req.params.id);
      const incident = incidents.find((i) => i.id === id);

      if (!incident) {
        throw new AppError(404, 'Incident not found');
      }

      res.status(200).json({
        ok: true,
        data: incident
      });
    } catch (error) {
      next(error);
    }
  }

  // 7.3 Registrar un incidente
  public createIncident(req: Request, res: Response, next: NextFunction): void {
    try {
      const { title, description, reporter, location, priority, estimatedMinutes } = req.body;

      const newId = incidents.length > 0 ? Math.max(...incidents.map((i) => i.id)) + 1 : 1;

      const newIncident: Incident = {
        id: newId,
        title,
        description,
        reporter,
        location,
        priority,
        status: 'OPEN',
        estimatedMinutes,
        createdAt: new Date().toISOString()
      };

      incidents.push(newIncident);

      res.status(201).json({
        ok: true,
        data: newIncident
      });
    } catch (error) {
      next(error);
    }
  }

  // 7.4 Actualizar un incidente completo (PUT)
  public updateIncident(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Number(req.params.id);
      const index = incidents.findIndex((i) => i.id === id);

      if (index === -1) {
        throw new AppError(404, 'Incident not found');
      }

      const { title, description, reporter, location, priority, estimatedMinutes } = req.body;

      incidents[index] = {
        ...incidents[index],
        title,
        description,
        reporter,
        location,
        priority,
        estimatedMinutes
      };

      res.status(200).json({
        ok: true,
        data: incidents[index]
      });
    } catch (error) {
      next(error);
    }
  }

  // 7.5 Cambiar estado del incidente (PATCH) + Reto 5 (Transición de estados)
  public updateStatus(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Number(req.params.id);
      const { status } = req.body as { status: StatusType };

      const validStatuses: StatusType[] = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];
      if (!status || !validStatuses.includes(status)) {
        throw new AppError(400, 'Invalid status');
      }

      const incident = incidents.find((i) => i.id === id);
      if (!incident) {
        throw new AppError(404, 'Incident not found');
      }

      // Reto 5: Regla de transición de estados
      const currentStatus = incident.status;

      if (currentStatus === 'RESOLVED' && (status === 'OPEN' || status === 'IN_PROGRESS')) {
        throw new AppError(400, `Cannot transition status from ${currentStatus} to ${status}`);
      }

      incident.status = status;

      res.status(200).json({
        ok: true,
        data: incident
      });
    } catch (error) {
      next(error);
    }
  }

  // 7.6 Eliminar incidente
  public deleteIncident(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Number(req.params.id);
      const index = incidents.findIndex((i) => i.id === id);

      if (index === -1) {
        throw new AppError(404, 'Incident not found');
      }

      incidents.splice(index, 1);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // Reto 1: Bandeja de incidentes críticos
  public getCriticalIncidents(_req: Request, res: Response): void {
    const criticals = incidents.filter((i) => i.priority === 'CRITICAL');
    res.status(200).json({
      ok: true,
      total: criticals.length,
      data: criticals
    });
  }

  // Reto 2: Incidentes pendientes
  public getPendingIncidents(_req: Request, res: Response): void {
    const pending = incidents.filter((i) => i.status === 'OPEN' || i.status === 'IN_PROGRESS');
    res.status(200).json({
      ok: true,
      total: pending.length,
      data: pending
    });
  }

  // Reto 3: Resumen operacional
  public getStats(_req: Request, res: Response): void {
    const total = incidents.length;
    const open = incidents.filter((i) => i.status === 'OPEN').length;
    const inProgress = incidents.filter((i) => i.status === 'IN_PROGRESS').length;
    const resolved = incidents.filter((i) => i.status === 'RESOLVED').length;
    const critical = incidents.filter((i) => i.priority === 'CRITICAL').length;

    const sumMinutes = incidents.reduce((acc, curr) => acc + curr.estimatedMinutes, 0);
    const averageEstimatedMinutes = total > 0 ? Math.round(sumMinutes / total) : 0;

    res.status(200).json({
      ok: true,
      data: {
        total,
        open,
        inProgress,
        resolved,
        critical,
        averageEstimatedMinutes
      }
    });
  }
}