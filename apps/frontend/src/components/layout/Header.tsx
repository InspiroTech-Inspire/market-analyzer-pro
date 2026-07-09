import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell, User } from 'lucide-react';

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MAP</span>
            </div>
            <span className="font-semibold">Market Analyzer Pro</span>
          </Link>
        </div>
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search symbols..." className="pl-10" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon"><Bell className="w-5 h-5" /></Button>
          <Button variant="ghost" size="icon"><User className="w-5 h-5" /></Button>
        </div>
      </div>
    </header>
  );
}

export default Header;