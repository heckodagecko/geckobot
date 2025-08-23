# @geckobot/vue

Vue 3 frontend application for the GeckoBot platform, built with TypeScript and Vite.

## ✨ Features

- 🚀 Vue 3 with Composition API and `<script setup>`
- ⚡ Vite for fast development and building
- 🎨 Tailwind CSS with DaisyUI for styling
- 🏗️ Pinia for state management
- 🛣️ Vue Router for navigation
- 🧪 Vitest for unit testing
- 🔍 Cypress for E2E testing
- 📦 TypeScript support out of the box
- 🔄 VueUse for composable utilities
- ✨ Font Awesome for icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# Using pnpm (recommended)
pnpm install

# Or using yarn
yarn

# Or using npm
npm install
```

3. Set up environment variables (if needed):

```bash
cp .env.example .env
# Edit .env with your configuration
```

## 🛠 Development

### Start the development server

```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

### Build for production

```bash
pnpm build
# or
yarn build
# or
npm run build
```

### Preview production build

```bash
pnpm preview
# or
yarn preview
# or
npm run preview
```

## 🧪 Testing

### Run unit tests

```bash
pnpm test:unit
# or
yarn test:unit
# or
npm run test:unit
```

### Run E2E tests

```bash
# Development mode with UI
pnpm test:e2e:dev

# Headless mode for CI
pnpm test:e2e
```

## 📁 Project Structure

```
src/
├── assets/           # Static assets
├── components/       # Reusable Vue components
│   ├── AppInputTag.vue
│   ├── AppModal.vue
│   ├── AppNotification.vue
│   ├── ProjectDataTable.vue
│   ├── ProjectForm.vue
│   ├── ProjectTag.vue
│   ├── ProjectTagList.vue
│   └── SourceFileCard.vue
├── router/           # Vue Router configuration
│   └── index.ts
├── stores/           # Pinia stores
│   ├── notify.ts
│   ├── project-tags.ts
│   └── projects.ts
├── types/            # TypeScript type definitions
│   └── index.ts
├── utils/            # Utility functions
│   ├── date.ts
│   ├── index.ts
│   ├── sequence.ts
│   ├── string.ts
│   └── timer.ts
├── views/            # Route components
│   ├── ProjectFilesView.vue
│   └── ProjectsView.vue
├── App.vue           # Root component
├── datasource.ts     # Data source configuration
└── main.ts           # Application entry point
```

## 🧩 Key Dependencies

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Pinia** - Intuitive state management
- **Vue Router** - Official router for Vue.js
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **Font Awesome** - Icon library
- **VueUse** - Collection of Vue composition utilities
- **Vitest** - Testing framework
- **Cypress** - E2E testing

## 📝 Code Style

- **Linting**: ESLint with Vue and TypeScript support
- **Formatting**: Prettier
- **Type Checking**: TypeScript with strict mode

### Lint and Format

```bash
# Lint code
pnpm lint

# Format code
pnpm format
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Project Link: [https://github.com/yourusername/geckobot](https://github.com/yourusername/geckobot)
### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
