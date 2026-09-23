# IncidentHub API

API REST construida con Node.js, Express y TypeScript para la gestión centralizada de incidentes tecnológicos.

## Problema Solucionado
Permite registrar, actualizar, priorizar, consultar y eliminar incidentes de TI de forma organizada mediante una arquitectura en capas, garantizando validaciones estrictas y control de acceso.

## Tecnologías
- Node.js
- Express
- TypeScript

## Instalación y Ejecución
```bash
npm install
npm run dev

Instalar dependencias:

Bash
npm install
Ejecución del Proyecto
Modo Desarrollo:

Bash
npm run dev
(El servidor se iniciará en http://localhost:3000 con recarga automática).

Compilación a producción:

Bash
npm run build
Iniciar en producción:

Bash
npm start
Documentación de Endpoints
1. Listar todos los incidentes
Método: GET

Ruta: /api/incidents

Encabezados: Ninguno obligatorio.

Respuesta Exitosa (200 OK):

JSON
[
  {
    "id": 1,
    "title": "Falla en servidor de base de datos",
    "description": "El servidor primario no responde a las peticiones",
    "priority": "HIGH",
    "status": "OPEN",
    "createdAt": "2026-09-23T15:00:00.000Z"
  }
]
2. Obtener un incidente por ID
Método: GET

Ruta: /api/incidents/:id

Parámetros de URL: id (Número entero positivo).

Respuesta Exitosa (200 OK):

JSON
{
  "id": 1,
  "title": "Falla en servidor de base de datos",
  "description": "El servidor primario no responde a las peticiones",
  "priority": "HIGH",
  "status": "OPEN",
  "createdAt": "2026-09-23T15:00:00.000Z"
}
Respuesta de Error (404 Not Found):

JSON
{
  "error": "Incidente no encontrado"
}
3. Crear un nuevo incidente
Método: POST

Ruta: /api/incidents

Cuerpo de la Petición (JSON):

JSON
{
  "title": "Corte de fibra óptica en Sede Norte",
  "description": "Pérdida total de conectividad a internet en oficinas",
  "priority": "CRITICAL"
}
Respuesta Exitosa (201 Created):

JSON
{
  "id": 2,
  "title": "Corte de fibra óptica en Sede Norte",
  "description": "Pérdida total de conectividad a internet en oficinas",
  "priority": "CRITICAL",
  "status": "OPEN",
  "createdAt": "2026-09-23T15:05:00.000Z"
}
4. Actualizar estado/prioridad de un incidente
Método: PUT / PATCH

Ruta: /api/incidents/:id

Cuerpo de la Petición (JSON):

JSON
{
  "status": "IN_PROGRESS",
  "priority": "HIGH"
}
Respuesta Exitosa (200 OK):

JSON
{
  "id": 1,
  "title": "Falla en servidor de base de datos",
  "description": "El servidor primario no responde a las peticiones",
  "priority": "HIGH",
  "status": "IN_PROGRESS",
  "createdAt": "2026-09-23T15:00:00.000Z"
}
5. Eliminar un incidente
Método: DELETE

Ruta: /api/incidents/:id

Encabezados Requeridos: Authorization: Bearer instructor-token (Requiere rol/autorización).

Respuesta Exitosa (200 OK / 204 No Content):

JSON
{
  "message": "Incidente eliminado exitosamente"
}
Explicación de Middlewares
Los middlewares en este proyecto actúan como una capa intermedia entre la petición del cliente y los controladores principales:

logger.middleware.ts: Registra en la consola la información básica de cada petición entrante (método HTTP, URL y fecha/hora) para trazabilidad.

request-info.middleware.ts: Captura y adjunta metadatos adicionales a la solicitud (como IP del cliente o User-Agent) antes de que la procese el controlador.

auth.middleware.ts: Verifica que la petición incluya un token válido en el encabezado Authorization.

admin.middleware.ts: Comprueba que el usuario autenticado posea permisos administrativos (por ejemplo, para realizar eliminaciones).

validate-id.middleware.ts: Valida que los parámetros :id pasados en la URL sean números enteros positivos válidos.

validate-incident.middleware.ts: Revisa que el cuerpo de las peticiones POST contenga los campos requeridos (title, description, priority) con sus tipos de datos correctos.

validate-priority.middleware.ts: Verifica que la prioridad enviada pertenezca a los valores permitidos (LOW, MEDIUM, HIGH, CRITICAL).

validate-time.middleware.ts: Valida la lógica de fechas/marcas de tiempo cuando se realizan consultas o filtros por rango de tiempo.

not-found.middleware.ts: Intercepta cualquier petición enviada a una ruta que no existe en la API y retorna un error HTTP 404 estandarizado.

error.middleware.ts: Middleware global de manejo de excepciones que atrapa cualquier error imprevisto en la aplicación y responde con un formato JSON unificado sin tumbar el servidor.

Diferencia entre DTO y Model
Model (Modelo): Representa la entidad completa de la base de datos o del dominio de negocio. Contiene la estructura interna completa del objeto tal como se almacena en el sistema (por ejemplo, incluyendo id, createdAt, updatedAt, deletedAt, etc.).

DTO (Data Transfer Object): Es un objeto utilizado exclusivamente para transportar datos entre el cliente y el servidor. Define únicamente los atributos específicos que se requieren recibir en una petición (ej. CreateIncidentDto) o los campos limpios que se quieren exponer al exterior en una respuesta, evitando filtrar información confidencial o innecesaria.