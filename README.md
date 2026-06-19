# Enterprise AI Duty Scheduler V5

## Overview

Enterprise-Grade AI-Powered Duty Scheduler for Healthcare Operations - Hospital & Healthcare Management System

### Key Features

✅ **Authentication System**
- Secure login with username and password
- Initial setup wizard for new users
- Password recovery with security hint
- Credential management

✅ **Dashboard**
- Live summary cards with key metrics
- Employee statistics
- Shift staffing overview
- Leave management
- AI alerts and recommendations

✅ **Employee Management**
- Add, edit, delete employees
- Gender and status tracking
- Rotation preferences
- Search and filter

✅ **Request Management**
- Shift requests (Morning, Evening, Night)
- Leave requests (Casual, Annual, Sick)
- Request status tracking
- Priority management

✅ **Leave Management**
- Multiple leave types
- Date range selection
- Leave tracking

✅ **Schedule Generation**
- Monthly scheduling
- Custom date range scheduling
- AI-powered optimization
- Export to Excel

✅ **Statistics & Analytics**
- Daily statistics by shift
- Employee statistics
- Fatigue analysis
- Coverage metrics

✅ **Settings**
- Shift configuration
- AI optimization levels
- Fatigue limits
- Security settings

✅ **Theme Support**
- Light/Dark mode
- Responsive design
- Mobile-friendly

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Application will open at http://localhost:3000

## Build

```bash
npm run build
```

## Technologies Used

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Charts**: Chart.js & React-ChartJS-2
- **Date Handling**: date-fns
- **Excel**: XLSX
- **Animations**: Framer Motion

## Project Structure

```
src/
├── components/
│   ├── Auth/           # Authentication screens
│   ├── Layout/         # Layout components
│   ├── Tabs/           # Main application tabs
│   ├── Sections/       # Reusable sections
│   └── Common/         # Common components
├── stores/             # Zustand stores
├── App.jsx             # Main app component
└── index.css           # Global styles
```

## Features in Detail

### Authentication
- First-time setup with username, password, and security hint
- Secure login with error handling
- Forgot password recovery
- Credential change functionality

### Schedule Management
- Generate schedules by month or custom date range
- AI-powered optimization
- Fatigue management
- Fair distribution of shifts
- Leave and request consideration

### Employee Management
- Complete employee profiles
- Gender and status tracking
- Rotation preferences
- Notes and comments

### Reporting
- Daily statistics
- Employee statistics
- Fatigue analysis
- Coverage metrics
- Excel export

## Developer

Developed by: **Samer Seif Alwedian**

## License

Enterprise License - All Rights Reserved
