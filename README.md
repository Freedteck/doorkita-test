# Doorkita

A modern healthcare management system built with Angular 19, featuring separate portals for doctors and patients to manage lab orders efficiently. This project demonstrates role-based access control, API integration, and a comprehensive design system.

## Features

### Core Functionality

- **Doctor Dashboard**: View all orders created by the doctor, create new lab orders, edit/delete existing orders
- **Patient Portal**: View only their own lab orders and results
- **Role-Based Access**: Secure authentication with doctor and patient roles
- **API Integration**: Full CRUD operations with proper error handling and loading states
- **Search & Filtering**: Filter orders by status, test type, and search by patient name
- **Notifications**: Real-time feedback for all user actions

### Technical Features

- **Unified Design System**: Consistent styling using CSS variables and reusable components
- **State Management**: Service-based architecture with RxJS observables
- **Form Validation**: Client-side validation with proper error messages
- **Loading States**: Visual feedback during API operations
- **Confirmation Dialogs**: Safe deletion and status updates with user confirmation

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Freedteck/doorkita-test.git
   cd doorkita-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the JSON Server (Mock API)**

   ```bash
   npm run api
   ```

   This starts the mock API server on `http://localhost:8080`

4. **Start the development server**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`

### Demo Accounts

**Doctor Account:**

- Email: `sarah.wilson@doorkita.com`
- Password: `doctor123`

**Patient Account:**

- Email: `jane.smith@email.com`
- Password: `patient123`

## Technical Implementation

### API Endpoints Used

- `GET /orders` - Get all orders (admin view)
- `GET /orders?doctorId={id}` - Get orders by doctor (doctor view)
- `GET /orders?patientId={id}` - Get orders by patient (patient view)
- `POST /orders` - Create new order
- `PUT /orders/{id}` - Update existing order
- `DELETE /orders/{id}` - Delete order
- `PATCH /orders/{id}` - Update order status
- `GET /testTypes` - Get available test types
- `GET /users` - User authentication

### Role-Based Views

- **Doctor View**: Can see all their created orders, create new orders, edit/delete orders, mark as completed
- **Patient View**: Can only view their own orders, no editing capabilities
- **Authentication**: JWT-like token-based authentication with role verification

## Design and Architecture Choices

### Design System

- **8px Grid System**: Consistent spacing using multiples of 8px for visual harmony
- **Border-Based Design**: Clean, flat design using borders instead of shadows for visual hierarchy
- **CSS Variables**: Centralized design tokens for maintainability
- **Color System**: Semantic color palette with primary, success, warning, and error states
- **Typography**: Consistent font weights and sizes throughout the application

### Component Architecture

- **Standalone Components**: Modern Angular 19 approach for better performance and tree-shaking
- **Type Safety**: Full TypeScript implementation with proper interfaces

### State Management

- **Service-Based Architecture**: Centralized business logic in Angular services
- **RxJS Observables**: Reactive programming for data flow and async operations
- **Local State**: Component-level state for UI interactions and form management
- **Error Handling**: Comprehensive error handling with user-friendly messages

### Authentication & Authorization

- **Role-Based Access Control**: Separate views and permissions for doctors and patients
- **Route Guards**: Protect routes based on authentication status and user roles
- **Session Management**: Persistent login state using localStorage
- **Security**: Proper logout functionality and session cleanup

## Deliverables

[Demo video](https://vimeo.com/1116702016/6ba0cf16c5?ts=0&share=copy)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
