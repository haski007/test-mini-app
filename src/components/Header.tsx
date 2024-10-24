import React from 'react';
import { MessageSquare, Send, Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-[#2AABEE] text-white p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Send className="w-6 h-6" />
          <h1 className="text-xl font-bold">Telegram Mini App</h1>
        </div>
        <div className="flex gap-4">
          <MessageSquare className="w-6 h-6 cursor-pointer" />
          <Settings className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}