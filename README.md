<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A modular monolithic NestJS application with authentication, user management, and notification system.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A production-ready [NestJS](https://github.com/nestjs/nest) application featuring:
- 🔐 JWT-based authentication with Passport
- 👥 User management with TypeORM and PostgreSQL
- 📬 Queue-based notification system with BullMQ and Redis
- 📚 Auto-generated API documentation with Swagger
- 🐳 Docker support for local development
- 🧪 Comprehensive testing setup with Jest
- 📊 Structured logging with Pino

## Prerequisites

- Node.js 20+
- Docker and Docker Compose (for local development)
- PostgreSQL 16 (if running without Docker)
- Redis 7 (if running without Docker)

## Quick Start

### Using Docker (Recommended)

1. Clone the repository
```bash
git clone <repository-url>
cd my-nestjs-app
```

2. Copy environment variables
```bash
cp .env.example .env
```

3. Start all services with Docker Compose
```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`

### Manual Setup

1. Install dependencies
```bash
npm install
```

2. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your database and Redis credentials
```

3. Run database migrations
```bash
npm run migration:run
```

4. Start the application
```bash
npm run start:dev
```

## Available Commands

### Development
```bash
npm run start:dev      # Start with hot reload (recommended for development)
npm run start:debug    # Start in debug mode
npm run build          # Build the application
npm run start:prod     # Run production build
```

### Code Quality
```bash
npm run lint           # Lint and auto-fix code issues
npm run format         # Format code with Prettier
npm run type-check     # Check TypeScript types without building
```

### Testing
```bash
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Generate coverage report
npm run test:e2e       # Run end-to-end tests
```

### Database Migrations
```bash
npm run migration:generate -- -n MigrationName  # Generate migration from entity changes
npm run migration:run                           # Apply pending migrations
npm run migration:revert                        # Revert last migration
```

### Docker
```bash
docker-compose up -d   # Start all services (app, postgres, redis)
docker-compose down    # Stop all services
docker-compose logs -f app  # View application logs
```

## Architecture Overview

This application follows a **modular monolithic architecture** with clear separation of concerns:

### Module Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root module
├── config/                # Configuration management
│   ├── configuration.ts   # Configuration factory
│   └── typeorm.config.ts  # Database configuration
├── common/                # Shared resources
│   ├── abstracts/         # Abstract base classes
│   ├── database/          # Database entities base
│   ├── decorators/        # Custom decorators
│   └── filters/           # Exception filters
├── migrations/            # Database migrations
└── modules/              # Feature modules
    ├── auth/             # Authentication module
    ├── notifications/    # Queue-based notifications
    └── users/            # User management
```

### Key Architectural Patterns

- **Repository Pattern**: Interfaces in domain layer, implementations in infrastructure
- **Dependency Injection**: All dependencies injected via NestJS IoC container
- **DTOs**: Request/response validation using class-validator
- **Module Isolation**: Each feature is self-contained within its module

### Core Components

1. **Authentication**
   - JWT-based authentication with Passport
   - Local strategy for login
   - JWT strategy for protected routes
   - Use `@Public()` decorator for non-authenticated endpoints

2. **Database**
   - TypeORM with PostgreSQL
   - Base entity class for common fields
   - Automatic migration generation
   - Repository pattern for data access

3. **Queue System**
   - BullMQ for background job processing
   - Redis as message broker
   - Notifications module demonstrates queue usage

4. **API Documentation**
   - Swagger/OpenAPI auto-generated documentation
   - Available at `http://localhost:3000/api`
   - Includes authentication flows

5. **Configuration**
   - Environment-based configuration
   - Schema validation for environment variables
   - Type-safe configuration access

## API Documentation

Once the application is running, you can access:
- Swagger UI: `http://localhost:3000/api`
- OpenAPI JSON: `http://localhost:3000/api-json`

### Authentication Flow

1. Register a new user:
   ```bash
   POST /auth/register
   {
     "email": "user@example.com",
     "password": "securePassword123",
     "name": "John Doe"
   }
   ```

2. Login to receive JWT token:
   ```bash
   POST /auth/login
   {
     "email": "user@example.com",
     "password": "securePassword123"
   }
   ```

3. Use the JWT token in the Authorization header:
   ```bash
   Authorization: Bearer <your-jwt-token>
   ```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=myapp
JWT_SECRET=your-secret-key-change-this-in-production
REDIS_URL=redis://localhost:6379
```

## Development Workflow

### Testing Approach

- **Unit Tests**: Mock dependencies for isolated testing
  - Example: `users.service.spec.ts`
  - Run with: `npm run test`

- **E2E Tests**: Integration tests for API endpoints
  - Uses Supertest for HTTP testing
  - Run with: `npm run test:e2e`

- **Coverage Reports**: 
  - Generate with: `npm run test:cov`
  - View HTML report in `coverage/lcov-report/index.html`

### Code Style

The project enforces consistent code style through:
- ESLint with TypeScript support
- Prettier for code formatting
- Pre-configured rules for NestJS best practices

Before committing, run:
```bash
npm run lint
npm run format
```

### Database Migrations

When modifying entities:
1. Make your entity changes
2. Generate migration: `npm run migration:generate -- -n DescriptiveName`
3. Review the generated migration in `src/migrations/`
4. Apply migration: `npm run migration:run`

## Security Features

- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: DTOs with class-validator
- **Global Auth Guard**: All endpoints protected by default
- **Environment Variables**: Sensitive data kept out of code
- **Docker Security**: Non-root user in containers

## Resources

Check out these resources for working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).