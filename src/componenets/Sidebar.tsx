
import React from 'react';
import {
  BookOpen,
  Package,
  GraduationCap,
  Zap,
  ShoppingCart,
  FileText,
  Award,
  Sparkles,
  Users,
  Book,
  Briefcase,
  Library,
  Phone
} from 'lucide-react';
import { Button } from '../componenets/ui/button';

const sidebarItems = [
  { name: 'Study', icon: BookOpen, active: true },
  { name: 'Batches', icon: Package },
  { name: 'Vidyapeeth', icon: GraduationCap },
  { name: 'Power Batch', icon: Zap },
  { name: 'PW Store', icon: ShoppingCart },
  { name: 'Test Series', icon: FileText },
  { name: 'Scholarship', icon: Award },
  { name: 'DISHA', icon: Sparkles, badge: 'NEW', badgeColor: 'bg-orange-500' },
  { name: 'Become Our Partner', icon: Users },
  { name: 'PW Books App', icon: Book, badge: 'NEW', badgeColor: 'bg-orange-500' },
  { name: 'Upskilling - Job Assistance', icon: Briefcase },
  { name: 'Library', icon: Library },
  { name: 'Contact Us', icon: Phone },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.name}
            variant={item.active ? "default" : "ghost"}
            className={`w-full justify-start text-left h-auto p-3 ${item.active
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="flex-1 text-sm">{item.name}</span>
            {item.badge && (
              <span
                className={`${item.badgeColor} text-white text-xs px-2 py-1 rounded-full ml-2 animate-bounce`}
              >
                {item.badge}
              </span>



            )}
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
