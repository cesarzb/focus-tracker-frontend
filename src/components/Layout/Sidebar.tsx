import { useState } from "react";
import {
  LayoutDashboard,
  Hourglass,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();

  const { pathname: currentPath } = useLocation();
  const menuItems = [
    {
      icon: LayoutDashboard,
      path: "/dashboard",
      label: "Dashboard",
    },
    {
      icon: Hourglass,
      path: "/timer",
      label: "Focus Session",
    },
  ];

  return (
    <aside
      className={`h-screen bg-stone-950 text-stone-400 transition-all duration-300 flex flex-col border-r border-stone-800/50 
      ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <span className="font-extrabold text-xl text-stone-50 tracking-tighter">
            FOCUS<span className="text-orange-500">.</span>
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-50 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1.5 mt-4">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.label}
            className={`w-full flex items-center p-3 rounded-xl transition-all group
              ${
                item.path === currentPath
                  ? "bg-orange-600/10 text-orange-500"
                  : "hover:bg-stone-900 hover:text-stone-100"
              }`}
          >
            <item.icon
              size={22}
              className={`${item.path === currentPath ? "text-orange-500" : "text-stone-500 group-hover:text-stone-100"}`}
            />
            {!isCollapsed && (
              <span className="ml-4 font-semibold text-sm tracking-wide">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-stone-800/50">
        <button
          className="flex items-center w-full p-3 rounded-xl text-stone-500 hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer"
          onClick={() => {
            logout();
          }}
        >
          <LogOut size={22} />
          {!isCollapsed && (
            <span className="ml-4 font-semibold text-sm">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
