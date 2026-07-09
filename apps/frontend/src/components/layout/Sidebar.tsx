import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, BarChart3, Scanner, Eye, Settings, TrendingUp } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/scanner', icon: Scanner, label: 'Scanner' },
  { to: '/watchlist', icon: Eye, label: 'Watchlist' },
  { to: '/analysis/trending', icon: TrendingUp, label: 'Analysis' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

function Sidebar() {
  return (
    <aside className="hidden md:block w-64 border-r bg-background">
      <div className="p-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">Navigation</h3>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => cn('flex items-center gap-3 px-3 py-2 rounded-lg transition-colors', isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted')}>
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;