# @geckobot/datasource-mock

Mock implementation of the datasource interface for testing and development purposes.

## Features

- In-memory data storage for rapid development
- Implements the full `@geckobot/datasource` interface
- Generates realistic mock data using Faker.js
- Zero external dependencies (except for development)
- Perfect for testing and development environments

## Installation

```bash
npm install @geckobot/datasource-mock
# or
yarn add @geckobot/datasource-mock
```

## Usage

```typescript
import { createMockDataSource } from '@geckobot/datasource-mock';

// Initialize the mock data source
const dataSource = createMockDataSource({
  // Optional: Specify number of mock projects to generate
  initialProjectCount: 5,
  // Optional: Customize mock data generation
  mockOptions: {
    maxFilesPerProject: 10,
    maxTagsPerProject: 5
  }
});

// Use the data source in your application
const projects = await dataSource.projects.list();
```

## API

### createMockDataSource(options?)

Creates a new mock data source instance.

**Options:**
- `initialProjectCount`: Number of mock projects to generate (default: `3`)
- `mockOptions`: Configuration for mock data generation
  - `maxFilesPerProject`: Maximum files per project (default: `5`)
  - `maxTagsPerProject`: Maximum tags per project (default: `3`)

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
