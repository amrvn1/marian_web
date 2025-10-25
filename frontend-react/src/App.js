import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from './store/store';
import './i18n/i18n';

// Components
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import SearchResults from './pages/SearchResults';
import SchoolProfile from './pages/SchoolProfile';
import BookingForm from './pages/BookingForm';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SchoolDashboard from './pages/SchoolDashboard';
import ApplicantsView from './pages/ApplicantsView';
import EditSchoolProfile from './pages/EditSchoolProfile';

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename={process.env.PUBLIC_URL}>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/school/:id" element={<SchoolProfile />} />
            <Route path="/book/:schoolId/:slotId" element={<BookingForm />} />
            <Route path="/payment/:applicantId" element={<PaymentPage />} />
            <Route path="/confirmation/:bookingId" element={<ConfirmationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Routes - School Admin */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['school_admin', 'super_admin']}>
                  <SchoolDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applicants/:schoolId"
              element={
                <ProtectedRoute allowedRoles={['school_admin', 'super_admin']}>
                  <ApplicantsView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-school/:schoolId"
              element={
                <ProtectedRoute allowedRoles={['school_admin', 'super_admin']}>
                  <EditSchoolProfile />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
