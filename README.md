# Agency Aggregator App

A modern, professional agency management platform built with Vue.js and Supabase. This application provides role-based authentication, comprehensive dashboard functionality, and full CRUD operations for managing agency data.

## Features

### 🔐 Authentication System
- **Email/Password Authentication**: Secure user registration and login
- **Role-Based Access Control**: Separate interfaces for agencies and administrators
- **Session Management**: Persistent login sessions with automatic token refresh

### 🏢 Agency Dashboard
- **Profile Management**: Complete agency profile with contact details, address, and description
- **Performance Analytics**: Track projects, revenue, and key metrics
- **Project Management**: Add and manage agency projects with status tracking
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 👨‍💼 Admin Dashboard
- **Agency Overview**: View all registered agencies with filtering options
- **Agency Management**: Edit agency details and toggle active/inactive status
- **Analytics Dashboard**: Platform-wide statistics and insights
- **Data Export**: Export agency data for reporting purposes

### 🛡️ Security Features
- **Row Level Security (RLS)**: Database-level security policies
- **Data Validation**: Comprehensive input validation and sanitization
- **Secure API**: Protected endpoints with proper authentication
- **Privacy Controls**: Users can only access their own data

## Tech Stack

- **Frontend**: Vue.js 3 with Composition API
- **Router**: Vue Router for navigation
- **State Management**: Pinia for reactive state management
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Heroicons for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agency-aggregator-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Project Settings → API
   - Copy your project URL and anon key
   - Click the "Supabase" button in the Bolt interface to configure automatically
   
4. **Run database migrations**
   - The database schema will be automatically created when you connect to Supabase
   - Tables include: `agencies`, `projects` with proper RLS policies

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to the local development URL shown in the terminal
   - The application will open automatically

### Demo Accounts

For testing purposes, you can create accounts with the following roles:

- **Admin Account**: Register with role "Administrator" to access admin dashboard
- **Agency Account**: Register with role "Agency" to access agency dashboard

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── AgencyModal.vue  # Agency create/edit modal
│   └── ProjectModal.vue # Project creation modal
├── lib/                 # Utility libraries
│   └── supabase.ts     # Supabase client configuration
├── router/             # Vue Router configuration
│   └── index.ts        # Routes and navigation guards
├── stores/             # Pinia state management
│   ├── auth.ts         # Authentication state
│   └── agencies.ts     # Agency data management
├── views/              # Page components
│   ├── AuthLayout.vue  # Authentication layout
│   ├── Login.vue       # Login page
│   ├── Register.vue    # Registration page
│   ├── DashboardLayout.vue # Dashboard layout
│   ├── Dashboard.vue   # Agency dashboard
│   └── AdminDashboard.vue # Admin dashboard
└── assets/             # Static assets and styles
```

## Database Schema

### Agencies Table
- `id`: Unique identifier (UUID)
- `user_id`: Reference to authenticated user
- `name`: Company name
- `email`: Contact email
- `phone`: Contact phone
- `address`: Company address
- `website`: Company website (optional)
- `description`: Company description
- `is_active`: Active status (boolean)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Projects Table
- `id`: Unique identifier (UUID)
- `agency_id`: Reference to agency
- `name`: Project name
- `status`: Project status (active, completed, on-hold, cancelled)
- `value`: Project value (numeric)
- `created_at`: Creation timestamp

## Key Features Explained

### Role-Based Authentication
The application implements a dual-role system:
- **Agency Users**: Can manage their own agency profile and projects
- **Admin Users**: Can view and manage all agencies in the system

### Real-Time Data Sync
Using Supabase's real-time capabilities, changes to agency data are synchronized across all connected clients instantly.

### Responsive Design
The UI adapts seamlessly across devices:
- **Mobile (< 768px)**: Single-column layouts with touch-friendly controls
- **Tablet (768px - 1024px)**: Optimized two-column layouts
- **Desktop (> 1024px)**: Full multi-column dashboard layouts

### Security Implementation
- **Row Level Security**: Database policies ensure users only access their own data
- **Authentication Guards**: Route protection based on authentication status and roles
- **Input Validation**: Client-side and server-side validation for all forms

## Development Workflow

### Adding New Features
1. Create feature branch from main
2. Implement changes following Vue 3 Composition API patterns
3. Add appropriate TypeScript types
4. Update database schema if needed (create new migration)
5. Test functionality across different user roles
6. Submit pull request for review

### Code Style Guidelines
- Use Composition API with `<script setup>`
- Implement proper TypeScript typing
- Follow Vue.js style guide conventions
- Use Tailwind CSS classes for styling
- Maintain consistent component structure

## Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Required environment variables:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Deployment Platforms
This application can be deployed to:
- Vercel
- Netlify  
- Bolt Hosting
- Any static hosting service

## Performance Optimizations

- **Lazy Loading**: Route-based code splitting
- **Component Optimization**: Efficient re-rendering with proper key usage
- **Database Indexing**: Optimized queries with proper indexes
- **Caching Strategy**: Intelligent data caching with Pinia
- **Bundle Optimization**: Tree-shaking and minimal bundle size

## Security Considerations

- **Authentication**: Secure JWT token management
- **Authorization**: Role-based access control
- **Data Privacy**: RLS ensures data isolation
- **Input Sanitization**: XSS protection
- **HTTPS**: Secure communication in production

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please contact: globaladmin@jeceml.com

---

Built with ❤️ using Vue.js and Supabase