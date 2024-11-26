// components/AnimatedSidebar.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Inbox, Users, BarChart, Settings } from 'lucide-react';

const navigationItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Inbox, label: 'Inbox', href: '#' },
  { icon: Users, label: 'Users', href: '#' },
  { icon: BarChart, label: 'Analytics', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
];

export default function AnimatedSidebar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative w-64 bg-background border-r border-border overflow-hidden">
      <nav className="relative space-y-1 p-2">
        {navigationItems.map((item, index) => (
          <div key={item.label} className="relative">
            <a
              href={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </a>
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: 4 }}
                  exit={{ width: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  style={{ left: -2 }}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </div>
  );
}
