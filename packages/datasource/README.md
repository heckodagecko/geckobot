# @geckobot/datasource

Core data types and abstract datasource definitions for the GeckoBot platform.

## Features

- TypeScript type definitions for core data structures
- Abstract interfaces for data sources
- Project-related type definitions (files, tags, projects)
- Service layer abstractions

## Installation

```bash
npm install @geckobot/datasource
# or
yarn add @geckobot/datasource
```

## Usage

```typescript
import { DataSource } from '@geckobot/datasource';

// Implement your custom data source
class MyDataSource implements DataSource {
  // Implement required methods
}
```

## API Reference

### Core Interfaces

- `DataSource`: Base interface for all data sources
- `Service`: Base service interface
- `Project`, `ProjectFile`, `ProjectTag`: Core data types

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
