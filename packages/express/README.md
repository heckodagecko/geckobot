# @geckobot/express

Express.js backend application for the GeckoBot platform.

## Features

- RESTful API endpoints for project management
- Input validation using express-validator
- Prisma ORM for database operations
- CORS support
- TypeScript-first development

## Prerequisites

- Node.js 18+
- PostgreSQL (or your preferred database supported by Prisma)
- pnpm (recommended) or npm/yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
# or
yarn
# or
npm install
```

3. Set up your environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

## Development

Start the development server:

```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

The server will be available at `http://localhost:3000` by default.

## API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Project Tags
- `GET /api/projects/:projectId/tags` - List all tags for a project
- `POST /api/projects/:projectId/tags` - Add a tag to a project
- `DELETE /api/projects/:projectId/tags/:tagId` - Remove a tag from a project

## Project Structure

```
src/
├── index.ts              # Application entry point
├── middlewares.ts        # Custom Express middlewares
├── prisma.ts             # Prisma client configuration
├── router.ts             # Main router configuration
├── validations.ts        # Shared validation schemas
├── projects/             # Project-related routes and controllers
│   ├── controllers.ts    # Project controllers
│   ├── routes.ts         # Project routes
│   └── validations.ts    # Project validation schemas
└── project-tags/         # Project tag routes and controllers
    ├── controllers.ts    # Tag controllers
    ├── routes.ts         # Tag routes
    └── validations.ts    # Tag validation schemas
```

## Environment Variables

- `PORT` - Port to run the server on (default: 3000)
- `DATABASE_URL` - Database connection string
- `NODE_ENV` - Environment (development, production, test)

## Testing

Run tests:

```bash
pnpm test
```

## License

ISC
