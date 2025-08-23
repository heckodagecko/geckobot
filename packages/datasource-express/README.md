# @geckobot/datasource-express

Express.js implementation of the datasource interface for GeckoBot platform.

## Features

- Express.js middleware for handling data operations
- Implements the `@geckobot/datasource` interfaces
- Handles project files, tags, and project management
- Built with TypeScript for type safety

## Installation

```bash
npm install @geckobot/datasource-express
# or
yarn add @geckobot/datasource-express
```

## Prerequisites

- Node.js 16+
- Express.js 4.17+
- @geckobot/datasource

## Usage

```typescript
import express from 'express';
import { createExpressDataSource } from '@geckobot/datasource-express';

const app = express();
app.use(express.json());

// Initialize the data source
const dataSource = createExpressDataSource({
  // Configuration options
});

// Use the data source middleware
app.use('/api', dataSource.router);

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get project by ID

### Project Files
- `GET /api/projects/:id/files` - List project files
- `POST /api/projects/:id/files` - Upload a file

### Project Tags
- `GET /api/projects/:id/tags` - List project tags
- `POST /api/projects/:id/tags` - Add a tag

## Development

### Building

```bash
yarn build
```

### Watching for changes

```bash
yarn watch
```

## License

GPL-3.0-only
