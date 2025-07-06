// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiMenu } from 'react-icons/fi';

// const Sidebar = ({ collapsed, toggleSidebar }) => {
//   return (
//     <aside className={`bg-gray-100 h-screen p-4 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
//       <div className="flex justify-between items-center mb-6">
//         {!collapsed && <h2 className="text-lg font-semibold text-gray-700">Menu</h2>}
//         <button onClick={toggleSidebar}>
//           <FiMenu size={20} />
//         </button>
//       </div>

//       <nav className="space-y-4">
//         <Link to="/" className="block text-gray-800 font-medium">
//           {collapsed ? '📊' : '📊 Dashboard'}
//         </Link>
//         <Link to="/attendance" className="block text-gray-800 font-medium">
//           {collapsed ? '📈' : '📈 Trends'}
//         </Link>
//         <Link to="/departments" className="block text-gray-800 font-medium">
//           {collapsed ? '🏭' : '🏭 Dept Snapshot'}
//         </Link>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, LayoutDashboard, LineChart, Building2 } from 'lucide-react';

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { to: '/attendance', label: 'Trends', icon: <LineChart size={20} /> },
    { to: '/departments', label: 'Dept Snapshot', icon: <Building2 size={20} /> },
  ];

  return (
    <aside
      className={`h-screen bg-white border-r shadow-sm transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <h2 className="text-xl font-bold text-swiggy-orange">Menu</h2>
        )}
        <button onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <Link
            to={item.to}
            key={item.to}
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-swiggy-orange/10 transition-colors ${
              location.pathname === item.to ? 'bg-swiggy-orange/10 text-swiggy-orange font-semibold' : 'text-gray-700'
            }`}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
