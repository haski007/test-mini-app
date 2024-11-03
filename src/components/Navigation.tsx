import React from 'react';
import { Home, Flame, Store, User } from 'lucide-react';

function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0D12] border-t border-gray-800">
      <div className="flex justify-around items-center py-3">
        <NavItem icon={<Home />} label="Discover" />
        <NavItem icon={<Flame />} label="Hot Deals" isActive />
        <NavItem icon={<Store />} label="Marketplace" />
        <NavItem icon={<User />} label="Profile" />
      </div>
    </nav>
  );
}

function NavItem({ icon, label, isActive = false }) {
  return (
    <button className="flex flex-col items-center gap-1">
      <div className={`w-6 h-6 ${isActive ? 'text-purple-500' : 'text-gray-400'}`}>
        {icon}
      </div>
      <span className={`text-xs ${isActive ? 'text-purple-500' : 'text-gray-400'}`}>
        {label}
      </span>
    </button>
  );
}

export default Navigation;