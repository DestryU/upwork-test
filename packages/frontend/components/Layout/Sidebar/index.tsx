'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import classNames from 'classnames';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: '/', label: 'Create Resume' },
    { href: '/resumes', label: 'Byte-sized Resumes' },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={classNames(
          'fixed top-0 left-0 z-40 h-screen w-64 transform transition-transform duration-200 ease-in-out bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800',
          'lg:translate-x-0 lg:fixed lg:h-screen',
          {
            'translate-x-0': isOpen,
            '-translate-x-full': !isOpen
          }
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-xl font-bold">Mini Resume</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={classNames(
                      'flex items-center px-4 py-2 rounded-md transition-colors',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      {
                        'bg-gray-100 dark:bg-gray-800 text-primary': pathname === item.href,
                        'text-gray-600 dark:text-gray-300': pathname !== item.href
                      }
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}