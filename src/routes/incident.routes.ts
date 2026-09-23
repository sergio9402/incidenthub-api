import { Router } from 'express';
import { IncidentController } from '../controllers/incident.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';
import { validateIdMiddleware } from '../middlewares/validate-id.middleware';
import { validateIncidentMiddleware } from '../middlewares/validate-incident.middleware';
import { validatePriorityMiddleware } from '../middlewares/validate-priority.middleware';
import { validateTimeMiddleware } from '../middlewares/validate-time.middleware';

const router = Router();
const controller = new IncidentController();

// Rutas especiales (Retos adicionales) - deben ir ANTES de /:id
router.get('/critical', authMiddleware, controller.getCriticalIncidents);
router.get('/pending', authMiddleware, controller.getPendingIncidents);
router.get('/stats', authMiddleware, controller.getStats);

// Endpoints estándar
router.get('/', authMiddleware, controller.getAllIncidents);

router.get('/:id', authMiddleware, validateIdMiddleware, controller.getIncidentById);

router.post(
  '/',
  authMiddleware,
  validateIncidentMiddleware,
  validatePriorityMiddleware,
  validateTimeMiddleware,
  controller.createIncident
);

router.put(
  '/:id',
  authMiddleware,
  validateIdMiddleware,
  validateIncidentMiddleware,
  validatePriorityMiddleware,
  validateTimeMiddleware,
  controller.updateIncident
);

router.patch('/:id/status', authMiddleware, validateIdMiddleware, controller.updateStatus);

router.delete('/:id', authMiddleware, adminMiddleware, validateIdMiddleware, controller.deleteIncident);

export default router;