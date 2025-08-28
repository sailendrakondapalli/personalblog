import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Body from './pages/Body';
import Nav from './pages/Nav';
import Foot from './pages/Foot';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ArticleDetail from './pages/ArticleDetail';
import Register from './pages/Register';
import RichEditor from './pages/Trail';

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Body />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/ap' element={<AdminDashboard />} />
        <Route path='/article/:id' element={<ArticleDetail />} />
        <Route path='/trail' element={<RichEditor />} />
      </Routes>

      {/* Only show footer on home page */}
      {location.pathname === '/' && <Foot />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
