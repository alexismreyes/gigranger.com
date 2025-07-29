import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import JobCategoriesList from './pages/JobCategoriesList';
import JobsList from './pages/JobsList';
import Layout from './components/Layout';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import CompaniesList from './pages/CompaniesList';
import JobApplicationsList from './pages/JobApplicationList';
import UsersList from './pages/UsersList';
import VerifyEmail from './pages/VerifyEmail';
import JobMatchingList from './pages/JobMatchingList';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/companies" element={<CompaniesList />} />
              <Route path="/jobcategories" element={<JobCategoriesList />} />
              <Route path="/jobs" element={<JobsList />} />
              <Route
                path="/jobapplications"
                element={<JobApplicationsList />}
              />
              <Route path="/jobmatching" element={<JobMatchingList />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
