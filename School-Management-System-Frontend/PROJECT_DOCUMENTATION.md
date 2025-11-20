# School Management System - Frontend Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Features & Functionality](#features--functionality)
5. [Installation & Setup](#installation--setup)
6. [Application Flow](#application-flow)
7. [Key Components](#key-components)
8. [State Management](#state-management)
9. [Data Persistence](#data-persistence)
10. [Routing](#routing)
11. [Styling](#styling)
12. [Form Validation](#form-validation)
13. [API Integration](#api-integration)
14. [Deployment](#deployment)
15. [Development Guidelines](#development-guidelines)

---

## Project Overview

**EduRadiant School Management System** is a modern, responsive web application designed to streamline the student enrollment process. The application provides a multi-step form interface where students can submit their personal information, guardian details, academic history, health information, and required documents.

### Key Highlights
- **Multi-step Form**: 6-step progressive form with validation
- **Data Persistence**: LocalStorage + IndexedDB for reliable data storage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Document Upload**: Support for images and PDFs with preview
- **Real-time Validation**: Instant feedback on form inputs
- **Edit Capability**: Review and edit any section before submission

---

## Technology Stack

### Core Technologies
- **React 19.2.0** - UI library with latest features
- **Vite 7.1.7** - Fast build tool and dev server
- **React Router DOM 7.9.5** - Client-side routing

### Styling & UI
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **Styled Components 6.1.19** - CSS-in-JS styling
- **Framer Motion 12.23.24** - Animation library
- **FontAwesome 7.1.0** - Icon library

### Development Tools
- **ESLint 9.36.0** - Code linting
- **PostCSS 8.5.6** - CSS processing
- **Autoprefixer 10.4.21** - CSS vendor prefixing

### Build & Deployment
- **Vercel** - Hosting platform (configured)
- **Node.js** - Runtime environment

---

## Project Structure

```
School-Management-System-Frontend/
├── public/                          # Static assets
│   ├── background.jpg              # Login page background
│   ├── background1.png
│   ├── background2.0.jpg
│   ├── background3.0.webp
│   └── vite.svg                    # Favicon
│
├── src/
│   ├── assets/                     # Image assets
│   │   ├── Academic.png           # Academic section icon
│   │   ├── add.png
│   │   ├── check1.png             # Completed step indicator
│   │   ├── check3.png             # Incomplete step indicator
│   │   ├── closeGreen.png
│   │   ├── closeRed.png
│   │   ├── closeWhite.png
│   │   ├── correct.png            # Success icon
│   │   ├── document.png
│   │   ├── edit.png               # Edit button icon
│   │   ├── fireworks.gif          # Success animation
│   │   ├── guardian.png
│   │   ├── hat.png                # Logo icon
│   │   ├── Health.png
│   │   ├── logout.png
│   │   ├── logoutW.png
│   │   ├── menu.png               # Hamburger menu
│   │   ├── monkey.png             # Error illustration
│   │   ├── personal.png
│   │   ├── review.png
│   │   ├── submit.png
│   │   ├── update.png
│   │   ├── user.png
│   │   ├── view.png
│   │   └── wrong.png
│   │
│   ├── components/                 # Reusable components
│   │   ├── FormInput.jsx          # Form input component
│   │   ├── header.jsx             # App header with menu
│   │   ├── Loader.jsx             # Loading spinner
│   │   ├── navBar.jsx             # Side navigation
│   │   ├── ScrollList.jsx         # Virtual scroll list
│   │   └── status.jsx             # Status modal
│   │
│   ├── context/                    # React Context
│   │   └── FormContext.jsx        # Global form state
│   │
│   ├── pages/                      # Page components
│   │   ├── login.jsx              # Login page
│   │   ├── personal.jsx           # Personal info form
│   │   ├── guardian.jsx           # Guardian info form
│   │   ├── AcademicHistory.jsx    # Academic history form
│   │   ├── HealthInfo.jsx         # Health info form
│   │   ├── DocumentsUpload.jsx    # Document upload form
│   │   └── Review.jsx             # Review & submit page
│   │
│   ├── utils/                      # Utility functions
│   │   └── indexedDB.js           # IndexedDB operations
│   │
│   ├── App.css                     # App-specific styles
│   ├── App.jsx                     # Main app component
│   ├── index.css                   # Global styles
│   └── main.jsx                    # App entry point
│
├── .gitignore                      # Git ignore rules
├── eslint.config.js                # ESLint configuration
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── package-lock.json               # Dependency lock file
├── README.md                       # Basic readme
├── vercel.json                     # Vercel deployment config
└── vite.config.js                  # Vite configuration

```

---

## Features & Functionality

### 1. Authentication
- **Login Page**: Serial number and PIN-based authentication
- Simple validation without backend integration
- Redirects to personal information form

### 2. Multi-Step Form Process

#### Step 1: Personal Information
- First Name, Last Name, Other Names
- Gender (dropdown)
- Date of Birth (date picker)
- Nationality
- Phone Number (10-digit validation)
- Email (format validation)
- Address

#### Step 2: Guardian Information
- Full Name
- Relationship to student
- Occupation
- Nationality
- Phone Number
- Emergency Contact Number
- Email (optional)
- Address

#### Step 3: Academic History
- Previous School Name
- School Address
- Start Date
- End Date
- Class Completed
- Reason for Leaving (optional)

#### Step 4: Health Information
- Blood Group (dropdown)
- Genotype (dropdown)
- Allergies (optional)
- Medical Conditions (optional)
- Doctor's Contact (optional)

#### Step 5: Document Upload
- Passport Photo (required)
- Birth Certificate (required)
- Terminal Result (required)
- Medical Report (optional)
- File preview functionality
- Support for images and PDFs

#### Step 6: Review & Submit
- Comprehensive review of all entered data
- Edit capability for each section
- Document preview display
- Final submission with validation
- Success/failure feedback

### 3. Navigation Features
- **Progressive Navigation**: Can only access completed sections
- **Visual Indicators**: 
  - Green checkmark for current page
  - Blue checkmark for completed pages
  - Gray checkmark for incomplete pages
- **Step Progress Bar**: Shows current step (1-6 of 6)
- **Hamburger Menu**: Collapsible sidebar navigation
- **User Profile Display**: Shows user initials and name

### 4. Data Management
- **Auto-save**: Form data automatically saved to localStorage
- **Document Storage**: Large files stored in IndexedDB
- **Edit Mode**: Can return from review page to edit any section
- **Data Persistence**: Survives page refreshes
- **Clear Data**: Logout clears all stored data

### 5. Validation & Feedback
- **Real-time Validation**: Instant feedback on input
- **Required Field Indicators**: Red asterisk (*)
- **Error Modals**: Clear error messages with missing fields list
- **Success Modals**: Confirmation messages with animations
- **Field-specific Validation**:
  - Email format validation
  - Phone number (10 digits)
  - Date validation
  - File type validation

### 6. User Experience
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Loading States**: Spinner during submission
- **Hover Effects**: Interactive button states
- **Smooth Animations**: Framer Motion transitions
- **Accessibility**: Keyboard navigation support

---

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser

### Step-by-Step Installation

1. **Clone the Repository**
```bash
git clone <repository-url>
cd Frontend-School-Management-System-/School-Management-System-Frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Variables (Optional)**
Create a `.env` file in the root directory:
```env
VITE_BACKEND_URL=http://localhost:5000
```

4. **Start Development Server**
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

5. **Build for Production**
```bash
npm run build
```

6. **Preview Production Build**
```bash
npm run preview
```

7. **Run Linter**
```bash
npm run lint
```

---

## Application Flow

### User Journey

```
┌─────────────┐
│   Login     │
│  (Serial #  │
│   & PIN)    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Personal   │
│ Information │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Guardian   │
│ Information │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Academic   │
│   History   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Health    │
│ Information │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Documents  │
│   Upload    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Review    │
│  & Submit   │
└──────┬──────┘
       │
       ├─── Edit ───┐
       │            │
       ▼            │
┌─────────────┐     │
│ Submission  │     │
│  (Success/  │     │
│   Failure)  │     │
└──────┬──────┘     │
       │            │
       ▼            │
┌─────────────┐     │
│   Logout    │◄────┘
└─────────────┘
```

### Data Flow

```
User Input → Component State → FormContext → LocalStorage/IndexedDB
                                    ↓
                              Review Page
                                    ↓
                              Validation
                                    ↓
                              API Submission
                                    ↓
                          Success/Failure Modal
```

---

## Key Components

### 1. Header Component (`header.jsx`)
**Purpose**: Top navigation bar with menu toggle and branding

**Features**:
- Hamburger menu icon
- EduRadiant logo and branding
- Responsive layout
- Menu toggle functionality

**Props**:
- `open`: Boolean for menu state
- `setOpen`: Function to toggle menu
- `menuRef`: Ref for click-outside detection

### 2. NavBar Component (`navBar.jsx`)
**Purpose**: Side navigation with progress tracking

**Features**:
- 6-step navigation menu
- Visual progress indicators
- User profile display
- Logout functionality
- Conditional navigation (can't skip steps)
- Edit mode support

**Key Logic**:
```javascript
// Check if page is accessible
const isPageAccessible = (pageKey) => {
  if (pageKey === 'personal') return true;
  // Check if all previous pages are completed
  for (let i = 0; i < currentIndex; i++) {
    if (!isPageCompleted(previousPage)) return false;
  }
  return true;
};
```

### 3. Status Component (`status.jsx`)
**Purpose**: Modal for success/error messages

**Features**:
- Success/failure states
- Missing fields display
- Animated appearance
- Close functionality

**Props**:
- `isOpen`: Boolean
- `isSuccess`: Boolean
- `title`: String
- `message`: String
- `missingFields`: Array
- `onClose`: Function

### 4. Loader Component (`Loader.jsx`)
**Purpose**: Loading spinner during async operations

**Features**:
- Animated spinner
- Overlay background
- Centered display

### 5. ScrollList Component (`ScrollList.jsx`)
**Purpose**: Virtual scrolling for large lists (Review page)

**Features**:
- Performance optimization
- Smooth scrolling
- Dynamic rendering

**Props**:
- `data`: Array of items
- `renderItem`: Function to render each item
- `itemHeight`: Number (estimated height)

### 6. FormInput Component (`FormInput.jsx`)
**Purpose**: Reusable form input with validation

**Features**:
- Label with required indicator
- Input validation
- Error messages
- Consistent styling

---

## State Management

### FormContext (`FormContext.jsx`)

**Purpose**: Global state management for form data

**Structure**:
```javascript
{
  personal: {
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    phoneNumber: '',
    email: ''
  },
  guardian: {
    fullName: '',
    relationship: '',
    occupation: '',
    nationality: '',
    phoneNumber: '',
    emergencyNumber: '',
    email: '',
    address: ''
  },
  academic: {
    schoolName: '',
    schoolAddress: '',
    startDate: '',
    endDate: '',
    classCompleted: '',
    reasonForLeaving: ''
  },
  health: {
    bloodGroup: '',
    genotype: '',
    allergies: '',
    medicalCondition: '',
    doctorContact: ''
  },
  documents: {
    passportPhotoName: '',
    birthCertificateName: '',
    terminalResultName: '',
    medicalReportName: ''
  }
}
```

**Methods**:
- `updateFormData(section, data)`: Update specific section
- `clearFormData()`: Clear all data and localStorage

**Usage**:
```javascript
import { useFormContext } from '../context/FormContext';

const { formData, updateFormData, clearFormData } = useFormContext();

// Update data
updateFormData('personal', { firstName: 'John' });

// Clear all data
clearFormData();
```

---

## Data Persistence

### LocalStorage
**Purpose**: Store form data (text fields)
**Capacity**: ~5-10MB
**Usage**: Automatic save on every form update

```javascript
// Auto-save in FormContext
useEffect(() => {
  localStorage.setItem("formData", JSON.stringify(formData));
}, [formData]);

// Load on mount
const loadInitialData = () => {
  const savedData = localStorage.getItem("formData");
  return savedData ? JSON.parse(savedData) : defaultData;
};
```

### IndexedDB
**Purpose**: Store large files (document previews)
**Capacity**: ~50MB+ (browser dependent)
**Database**: `SchoolManagementDB`
**Store**: `documentPreviews`

**Key Functions** (`indexedDB.js`):

```javascript
// Save document data
await saveDocumentData(documentData);

// Load document data
const data = await loadDocumentData();

// Clear document data
await clearDocumentData();
```

**Why IndexedDB?**
- LocalStorage has size limitations (~5-10MB)
- Document previews (base64) can be very large
- IndexedDB provides 50MB+ storage
- Asynchronous operations don't block UI

---

## Routing

### Route Configuration (`App.jsx`)

```javascript
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/personal" element={<Personal_Info />} />
  <Route path="/guardian" element={<GuardianForm />} />
  <Route path="/academic" element={<AcademicHistory />} />
  <Route path="/health" element={<HealthInfo />} />
  <Route path="/documents" element={<DocumentsUpload />} />
  <Route path="/review" element={<Review />} />
</Routes>
```

### Navigation Guards
- No route guards implemented
- Navigation controlled by UI (NavBar component)
- Users can manually navigate via URL (no protection)

### Edit Mode
Uses `sessionStorage` to track edit state:
```javascript
// Set edit mode
sessionStorage.setItem('isEditing', 'true');

// Check edit mode
const isEditing = sessionStorage.getItem('isEditing') === 'true';

// Clear edit mode
sessionStorage.removeItem('isEditing');
```

---

## Styling

### Tailwind CSS Configuration

**Vite Plugin**: `@tailwindcss/vite`

**Custom Animations** (`index.css`):
```css
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slideInLeft 0.3s ease-in-out;
}
```

### Color Scheme
- **Primary Blue**: `#0063FF`
- **Dark Blue**: `#002359`
- **Success Green**: `#08A170`
- **Error Red**: `#F02C2C`
- **Background Pink**: `#f38ef334`

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Common Patterns

**Input Fields**:
```jsx
<input
  className='bg-[#f38ef334] rounded-3xl p-2 px-4 w-full 
             focus:outline-[#0063FF] focus:scale-105 
             hover:scale-105 transition-transform delay-150'
/>
```

**Buttons**:
```jsx
<button
  className='bg-blue-700 text-white shadow-md shadow-blue-400 
             font-semibold px-4 py-2 rounded-lg 
             hover:font-bold active:scale-105'
>
```

---

## Form Validation

### Validation Rules

#### Personal Information
- **First Name**: Required
- **Last Name**: Required
- **Gender**: Required
- **Date of Birth**: Required
- **Nationality**: Required
- **Address**: Required
- **Phone Number**: Required, 10 digits, numeric only
- **Email**: Required, valid email format

#### Guardian Information
- **Full Name**: Required
- **Relationship**: Required
- **Occupation**: Required
- **Nationality**: Required
- **Phone Number**: Required, 10 digits
- **Emergency Number**: Required, 10 digits
- **Address**: Required

#### Academic History
- **School Name**: Required
- **School Address**: Required
- **Start Date**: Required
- **End Date**: Required
- **Class Completed**: Required

#### Health Information
- **Blood Group**: Required
- **Genotype**: Required

#### Documents
- **Passport Photo**: Required
- **Birth Certificate**: Required
- **Terminal Result**: Required

### Validation Implementation

**Email Validation**:
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  // Show error
}
```

**Phone Validation**:
```javascript
const phoneRegex = /^[0-9]{10}$/;
if (!phoneRegex.test(phoneNumber)) {
  // Show error
}
```

**Phone Input Restriction**:
```javascript
const handleChange = (e) => {
  if (name === 'phoneNumber') {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 10) {
      setData(numericValue);
    }
  }
};
```

---

## API Integration

### Backend Configuration

**Environment Variable**:
```javascript
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
```

### Submission Endpoint

**URL**: `POST /api/applications`

**Request Body**:
```json
{
  "personal": { ... },
  "guardian": { ... },
  "academic": { ... },
  "health": { ... },
  "documents": { ... }
}
```

### Submission Logic (`Review.jsx`)

```javascript
const handleSubmit = async () => {
  // 1. Validate all fields
  const validation = validateAllFields();
  if (validation.hasMissing) {
    showErrorModal();
    return;
  }

  // 2. Show loader
  setIsLoading(true);

  try {
    // 3. Submit to backend with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(`${backendUrl}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataToSubmit),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    // 4. Handle response
    if (response.ok) {
      showSuccessModal();
    } else {
      showFailureModal();
    }
  } catch (error) {
    // 5. Handle errors (network, timeout, etc.)
    showFailureModal();
  } finally {
    setIsLoading(false);
  }
};
```

### Error Handling
- **Network Errors**: Caught and displayed
- **Timeout**: 10-second timeout for requests
- **Server Errors**: Status code checking
- **Retry Mechanism**: User can retry failed submissions

---

## Deployment

### Vercel Configuration (`vercel.json`)

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Purpose**: Enable client-side routing (SPA)

### Deployment Steps

1. **Connect to Vercel**
   - Import project from GitHub
   - Select repository

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**
   - Add `VITE_BACKEND_URL` if needed

4. **Deploy**
   - Automatic deployment on push to main branch

### Build Optimization

**Vite Configuration** (`vite.config.js`):
```javascript
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  // Additional optimizations can be added here
})
```

---

## Development Guidelines

### Code Style

**ESLint Configuration**:
- React Hooks rules enforced
- React Refresh for HMR
- No unused variables (except uppercase)

**Naming Conventions**:
- Components: PascalCase (`PersonalInfo.jsx`)
- Functions: camelCase (`handleSubmit`)
- Constants: UPPER_SNAKE_CASE (`DB_NAME`)

### Component Structure

```javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';

const ComponentName = () => {
  // 1. Hooks
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();
  
  // 2. State
  const [localState, setLocalState] = useState(initialValue);
  
  // 3. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 4. Handlers
  const handleAction = () => {
    // Handler logic
  };
  
  // 5. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### Best Practices

1. **State Management**
   - Use FormContext for shared state
   - Local state for component-specific data
   - Avoid prop drilling

2. **Performance**
   - Use React.memo for expensive components
   - Implement virtual scrolling for long lists
   - Lazy load images

3. **Accessibility**
   - Use semantic HTML
   - Add ARIA labels where needed
   - Ensure keyboard navigation

4. **Error Handling**
   - Always catch async errors
   - Provide user-friendly error messages
   - Log errors for debugging

5. **Testing**
   - Test form validation
   - Test navigation flow
   - Test data persistence

### Common Issues & Solutions

**Issue**: Form data lost on refresh
**Solution**: Data is saved to localStorage automatically

**Issue**: Large images cause storage errors
**Solution**: Images stored in IndexedDB with 50MB+ capacity

**Issue**: Can't navigate to next step
**Solution**: Complete all required fields in current step

**Issue**: Documents not showing in review
**Solution**: Check IndexedDB and window.__documentData

---

## Additional Notes

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 12+)
- IE11: Not supported

### Performance Considerations
- Virtual scrolling in Review page
- Lazy loading of images
- Debounced form inputs (if needed)
- IndexedDB for large files

### Security Considerations
- No sensitive data in localStorage
- Client-side validation only (backend validation needed)
- No authentication tokens stored
- HTTPS recommended for production

### Future Enhancements
- Backend integration
- Real authentication system
- Email/SMS notifications
- Admin dashboard
- Application status tracking
- PDF generation for submitted forms
- Multi-language support
- Dark mode

---

## Support & Contact

For issues or questions:
1. Check this documentation
2. Review the code comments
3. Check browser console for errors
4. Contact the development team

---

**Last Updated**: November 2025
**Version**: 1.0.0
**Author**: EduRadiant Development Team
