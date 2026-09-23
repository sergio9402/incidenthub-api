import { Incident } from '../models/incident.model';

export const incidents: Incident[] = [
  {
    id: 1,
    title: 'Proyector sin señal',
    description: 'El proyector no reconoce ningún computador conectado.',
    reporter: 'Carlos Díaz',
    location: 'Aula 201',
    priority: 'MEDIUM',
    status: 'OPEN',
    estimatedMinutes: 30,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Computador no enciende',
    description: 'El equipo de la sala de profesores no enciende tras falla eléctrica.',
    reporter: 'Laura Gómez',
    location: 'Laboratorio 304',
    priority: 'HIGH',
    status: 'OPEN',
    estimatedMinutes: 45,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Falla de conectividad WiFi',
    description: 'Pérdida de señal de red inalámbrica en el bloque B.',
    reporter: 'Miguel Torres',
    location: 'Oficina 407',
    priority: 'CRITICAL',
    status: 'IN_PROGRESS',
    estimatedMinutes: 50,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: 'Impresora atascada',
    description: 'La impresora principal muestra error de papel atascado.',
    reporter: 'Ana Torres',
    location: 'Piso 2',
    priority: 'LOW',
    status: 'OPEN',
    estimatedMinutes: 15,
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    title: 'Pantalla con parpadeos',
    description: 'El monitor presenta parpadeos constantes.',
    reporter: 'Pedro Ramírez',
    location: 'Oficina 101',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    estimatedMinutes: 20,
    createdAt: new Date().toISOString()
  }
];