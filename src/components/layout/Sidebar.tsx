import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  BarChart, 
  CreditCard, 
  PlusCircle, 
  Wallet, 
  Target, 
  Receipt, 
  Bell,
  Settings,
  LogOut
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Sidebar: React.FC = () => {
  const { notifications } = useData();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { icon: BarChart, label: "Dashboard", path: "/app/dashboard" },
    { icon: PlusCircle, label: "Add Expense", path: "/app/add-expense" },
    { icon: Receipt, label: "Expenses", path: "/app/expenses" },
    { icon: Wallet, label: "Wallet", path: "/app/wallet" },
    { icon: Target, label: "Goals", path: "/app/goals" },
    { icon: Bell, label: "Notifications", path: "/app/notifications", badge: unreadCount },
    { icon: Settings, label: "Settings", path: "/app/settings" }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="h-screen bg-sidebar border-r border-border w-64 flex flex-col fixed left-0 top-0">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <CreditCard className="h-6 w-6 text-expense-light" />
        <h1 className="text-xl font-bold text-expense-light">SpendWise</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    isActive 
                    ? 'bg-expense-primary text-white' 
                    : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-expense-primary'
                  }`
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge variant="secondary" className="ml-auto bg-expense-light text-white">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-expense-light flex items-center justify-center text-white font-medium">
            U
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">User</p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleLogout}
            className="hover:bg-expense-light/10"
          >
            <LogOut className="h-4 w-4 text-expense-light" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
