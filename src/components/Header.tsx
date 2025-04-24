
import React from 'react';
import { Settings, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm py-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-rescue-blue" />
          <h1 className="text-xl font-bold text-rescue-blue">Web App Rescue</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button size="sm" className="bg-rescue-blue hover:bg-blue-700">Dashboard</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
