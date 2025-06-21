# Analytics Dashboard

A modern, responsive research participation analytics dashboard built with React, TypeScript, and Node.js. This application provides comprehensive insights into research study participation metrics, trends, and demographic data.

## 🚀 Features

- **Real-time Analytics**: View summary metrics, trends, and comparisons
- **Interactive Charts**: Beautiful visualizations using Recharts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Advanced Filtering**: Filter data by time range, region, study type, and demographics
- **Type Safety**: Full TypeScript support across frontend and backend
- **Modern UI**: Built with Tailwind CSS and Shadcn UI components

## 🏗️ Architecture

### Project Structure

```
analytics-dashboard/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   └── routes.tsx      # Application routing
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   ├── validators/     # Input validation
│   │   └── container.ts    # Dependency injection
│   ├── data/               # Mock data and generators
│   └── package.json
├── shared/                 # Shared TypeScript types
│   └── types/
└── package.json            # Root package.json for scripts
```

### Frontend Architecture

The frontend follows a modern React architecture with:

- **Component-Based Structure**: Modular, reusable components
- **Context API**: Global state management for dashboard filters
- **Custom Hooks**: Encapsulated business logic and data fetching
- **Service Layer**: Centralized API communication
- **Type Safety**: Shared TypeScript types between frontend and backend

### Backend Architecture

The backend implements a clean architecture pattern:

- **Dependency Injection**: Using InversifyJS for IoC container
- **Controller-Service Pattern**: Separation of concerns
- **Middleware**: Authentication and validation layers
- **Type Safety**: Shared types with the frontend
- **Error Handling**: Comprehensive error management

## 🛠️ Technical Stack

### Frontend

- **React 19**: Latest React with concurrent features
- **TypeScript**: Full type safety
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Chart library for data visualization
- **TanStack Query**: Data fetching and caching (data is refetched every 5 minutes)
- **React Router**: Client-side routing
- **Shadcn UI**: Accessible component primitives
- **Lucide React**: Icon library

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **TypeScript**: Type safety
- **InversifyJS**: Dependency injection container
- **Jest**: Testing framework
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Express Validator**: Input validation

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd analytics-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm run install:all
   ```

## 🚀 Running the Application

Run both frontend and backend simultaneously:

```bash
npm run dev
```

Or run them separately:

**Backend only:**

```bash
npm run server:dev
```

**Frontend only:**

```bash
npm run client:dev
```

## Refresh the test data

If you want to refresh the dataset, run:

```bash
cd server && npm run generate:data
```

## 📊 API Endpoints

The backend provides the following REST API endpoints:

### Summary Metrics

- `GET /api/dashboard/summary` - Get summary metrics

**Filtering Parameters:**

- `timeRange` (required): `7d` | `14d` | `30d`
- `region` (required): `all` | `northAmerica` | `europe` | `asiaPacific` | `latinAmerica` | `middleEastAfrica` | `oceania`
- `studyType` (required): `clinicalTrials` | `surveys` | `focusGroups` | `longitudinalStudies` | `interviews` | `observationalStudies`

### Trend Data

- `GET /api/dashboard/trends` - Get trend data

**Filtering Parameters:**

- `timeRange` (required): `7d` | `14d` | `30d`
- `region` (required): `all` | `northAmerica` | `europe` | `asiaPacific` | `latinAmerica` | `middleEastAfrica` | `oceania`
- `studyType` (required): `clinicalTrials` | `surveys` | `focusGroups` | `longitudinalStudies` | `interviews` | `observationalStudies`

### Comparison Data

- `GET /api/dashboard/comparison` - Get comparison data

**Filtering Parameters:**

- `timeRange` (required): `7d` | `14d` | `30d`
- `dimension` (required): `studyType` | `ageGroup` | `region`

### Demographic Data

- `GET /api/dashboard/demographics` - Get demographic data

**Filtering Parameters:**

- `timeRange` (required): `7d` | `14d` | `30d`
- `region` (required): `all` | `northAmerica` | `europe` | `asiaPacific` | `latinAmerica` | `middleEastAfrica` | `oceania`
- `studyType` (required): `clinicalTrials` | `surveys` | `focusGroups` | `longitudinalStudies` | `interviews` | `observationalStudies`
- `dimension` (required): `gender` | `ageDistribution` | `education` | `employment`

### Example API Calls

```bash
# Get summary metrics for clinical trials in North America over 30 days
GET /api/dashboard/summary?timeRange=30d&region=northAmerica&studyType=clinicalTrials

# Get trend data for surveys in Europe over 14 days
GET /api/dashboard/trends?timeRange=14d&region=europe&studyType=surveys

# Get comparison data by study type over 7 days
GET /api/dashboard/comparison?timeRange=7d&dimension=studyType

# Get demographic data by gender for focus groups in Asia Pacific over 30 days
GET /api/dashboard/demographics?timeRange=30d&region=asiaPacific&studyType=focusGroups&dimension=gender
```

## Future work

- **Enhanced UI/UX**

  - Customizable dashboard layouts with drag-and-drop
  - Add more intervals to view weekly, monthly, yearly data
  - Export functionality (PDF, CSV, Excel)
  - Data visualization improvements (heatmaps, scatter plots)
  - Predictive analytics and trend forecasting
  - Dark mode theme support
  - Improve UI on mobile (or create a mobile app version)

- **Back end**

  - User login/logout functionality with JWT tokens
  - Role-based access control (Admin, Researcher, Viewer)
  - Session management and refresh tokens
  - API versioning
