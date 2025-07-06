import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AttendanceTrends from './pages/AttendanceTrends';
import DepartmentWiseSnapshot from './pages/DepartmentWiseSnapshot';

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(prev => !prev);

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <div className="flex flex-col flex-1">
          <Navbar />
          <div className="p-4 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/attendance" element={<AttendanceTrends />} />
              <Route path="/departments" element={<DepartmentWiseSnapshot />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
