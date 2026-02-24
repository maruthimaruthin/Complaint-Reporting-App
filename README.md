# Complaint Manager - Issue Reporting System

A modern, professional React web application for managing complaint and issue reports. Built with Next.js, React, Tailwind CSS, and Shadcn UI components.

## Project Overview

**Complaint Manager** is an internship-ready complaint reporting system with separate interfaces for regular users and administrators. The application provides a complete workflow for reporting, tracking, and resolving complaints efficiently.

### Key Features

✅ **Dual Role System**
- User role for filing and tracking complaints
- Admin role for managing and responding to complaints

✅ **User Features**
- Register and login authentication
- File new complaints with category selection
- View complaint history with filtering
- Track complaint status (Open, In-Progress, Resolved)
- Receive status update notifications

✅ **Admin Features**
- Dashboard with key metrics and statistics
- View all complaints in a searchable table
- Update complaint status
- Add admin responses to complaints
- Category-wise complaint analytics
- Priority-based complaint management

✅ **Professional UI/UX**
- Clean, modern design with professional color scheme
- Responsive layout (mobile, tablet, desktop)
- Status badges with visual indicators
- Notification system for updates
- Intuitive navigation

## Project Structure

```
app/
├── page.tsx                          # Home page with auto-redirect
├── layout.tsx                        # Root layout with metadata
├── globals.css                       # Global styles with design tokens
│
├── login/
│   └── page.tsx                      # User/Admin login page
├── register/
│   └── page.tsx                      # User registration page
│
├── dashboard/
│   └── page.tsx                      # User dashboard (overview)
│
├── complaint/
│   └── new/
│       └── page.tsx                  # New complaint submission form
│
├── complaints/
│   └── page.tsx                      # User complaint history/list
│
├── admin/
│   ├── page.tsx                      # Admin dashboard (metrics)
│   └── complaints/
│       └── page.tsx                  # Admin complaint management

components/
├── Navbar.tsx                        # Navigation bar (shared)
├── StatusBadge.tsx                   # Status indicator badge
└── NotificationCard.tsx              # Notification component

tailwind.config.ts                    # Tailwind configuration
package.json                          # Dependencies
```

## Getting Started

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

The application uses mock data and placeholder authentication. You can use any credentials to test:

**User Login:**
- Email: demo@example.com
- Password: password123

**Admin Login:**
- Email: admin@example.com
- Password: admin123

## Usage Guide

### For Users

1. **Register**: Create a new account on the registration page
2. **Login**: Sign in with your credentials
3. **Dashboard**: View overview of your complaints and key statistics
4. **File Complaint**: 
   - Click "File New Complaint" button
   - Select category (Infrastructure, IT/Equipment, Facilities, Safety, etc.)
   - Set priority level (Low, Medium, High)
   - Provide detailed description
   - Submit complaint
5. **Track Progress**: 
   - View all your complaints in "My Complaints" page
   - Search and filter by status or priority
   - Click on any complaint to view details

### For Admins

1. **Login**: Switch to "Admin Login" tab and enter credentials
2. **Dashboard**: View system overview with:
   - Total complaints count
   - Active users
   - Resolved vs pending complaints
   - Category distribution chart
3. **Manage Complaints**:
   - Go to "View All Complaints"
   - Select a complaint to view details
   - Update status (Open → In Progress → Resolved)
   - Add response/notes
   - Search and filter complaints

## Design System

### Color Palette

- **Primary**: Blue (`#3B82F6`) - Main actions and branding
- **Accent**: Green (`#10B981`) - Success states
- **Status Colors**:
  - Open: Orange (`#F59E0B`)
  - In-Progress: Blue (`#3B82F6`)
  - Resolved: Green (`#10B981`)
- **Neutrals**: Light gray backgrounds, dark gray text

### Typography

- **Headings**: Geist font (system default)
- **Body**: Geist font (system default)
- **Font sizes**: Semantic scale (text-xs to text-3xl)

### Components

- **Cards**: Used for grouping related content
- **Badges**: Status and priority indicators
- **Buttons**: Primary, secondary, and outline variants
- **Tables**: For displaying complaint lists
- **Forms**: Input fields, select dropdowns, textareas

## Features Breakdown

### Authentication Pages

**Login Page** (`/login`)
- Toggle between User and Admin login
- Email and password input
- Demo credentials filler
- Form validation
- Redirect to appropriate dashboard

**Register Page** (`/register`)
- Full name, email, password fields
- Password confirmation
- Terms of service checkbox
- Form validation
- Success notification

### User Dashboard (`/dashboard`)

Displays:
- Total complaints count
- Count by status (Open, In Progress, Resolved)
- Recent complaints in table format
- Quick action cards for:
  - Filing new complaint
  - Viewing all complaints
  - Testing notification system

### Complaint Submission Form (`/complaint/new`)

Features:
- Title field (max 100 characters)
- Category dropdown (8 options)
- Priority level selector (Low, Medium, High)
- Description textarea (max 1000 characters)
- Form validation with error messages
- Info box with submission guidelines
- Submit and Cancel buttons

### User Complaint History (`/complaints`)

Provides:
- Search complaints by ID or title
- Filter by status dropdown
- Filter by priority dropdown
- Responsive table with:
  - Complaint ID (clickable)
  - Title
  - Category
  - Status badge
  - Priority badge
  - Date
  - View action link
- Empty state when no results

### Admin Dashboard (`/admin`)

Shows:
- Key statistics cards (Total, Active Users, Resolved, Pending)
- Category distribution chart with progress bars
- Complaint status overview cards
- Quick action links filtered by status

### Admin Complaint Management (`/admin/complaints`)

Enables:
- Search complaints by ID or title
- Filter by status
- Complaint selection panel
- Detail view showing:
  - Complaint ID, User ID, Title, Description
  - Category and current status
  - Status update dropdown with action button
  - Admin response textarea
  - Previous response display
  - Character counter

## Technologies Used

### Frontend
- **React 19**: UI library
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Shadcn UI**: Component library
- **Lucide Icons**: Icon library

### Styling
- **Design Tokens**: CSS variables for theming
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA attributes and semantic HTML

## Component Props

### Navbar
```typescript
<Navbar 
  userRole="user" | "admin"
  userName={string}
  onLogout={() => void}
/>
```

### StatusBadge
```typescript
<StatusBadge 
  status="open" | "in-progress" | "resolved"
  className={string}
/>
```

### NotificationCard
```typescript
<NotificationCard
  title={string}
  message={string}
  type="success" | "info" | "warning" | "error"
  onClose={() => void}
  duration={number} // milliseconds, 0 = no auto-close
/>
```

## Mock Data

The application uses mock data stored in component state:
- 8 sample complaints with various statuses
- Category distribution data
- User statistics

No backend/database is implemented - all data is demo only.

## Customization

### Add New Categories
Edit the `categories` array in `/complaint/new/page.tsx`:
```typescript
const categories = [
  'Infrastructure',
  'Facilities',
  'IT/Equipment',
  // Add new categories here
];
```

### Modify Color Scheme
Update CSS variables in `/app/globals.css`:
```css
:root {
  --primary: 216 90% 52%; /* Change blue to your color */
  --accent: 142 71% 45%;  /* Change green to your color */
}
```

### Change Complaint Categories
The complaint categories and mock data are stored in individual page components.

## Future Enhancements

Potential features to add:
- Backend API integration
- Database (PostgreSQL/MongoDB)
- Authentication system (NextAuth)
- File upload for complaint attachments
- Email notifications
- Real-time updates using WebSockets
- Comment threads on complaints
- Complaint templates
- Export functionality (PDF, CSV)
- Multi-language support
- Dark mode toggle

## Performance Features

- Responsive design optimized for all screen sizes
- Efficient component structure
- Optimized images using Next.js Image component
- CSS-in-JS with Tailwind for minimal bundle size
- Client-side filtering and search

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Project Status

✅ Complete - Internship project with all core features implemented

## Author Notes

This is a professional, internship-ready complaint management system built with modern web technologies. The UI is clean and intuitive, suitable for deployment in production environments after adding backend integration.

All components follow React best practices with:
- Component composition
- Proper state management
- Responsive design
- Accessibility standards
- Type safety with TypeScript

---


