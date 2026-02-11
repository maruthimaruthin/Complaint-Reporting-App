'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';

interface NavbarProps {
  userRole?: 'user' | 'admin';
  userName?: string;
  onLogout?: () => void;
}

export function Navbar({ userRole = 'user', userName = 'User', onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isAdmin = userRole === 'admin';

  return (
    <nav className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <Link href={isAdmin ? '/admin' : '/dashboard'} className="font-bold text-lg text-foreground">
              Complaint Manager
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {isAdmin ? (
              <>
                <Link href="/admin" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/admin/complaints" className="text-foreground hover:text-primary transition-colors">
                  All Complaints
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/complaint/new" className="text-foreground hover:text-primary transition-colors">
                  New Complaint
                </Link>
                <Link href="/complaints" className="text-foreground hover:text-primary transition-colors">
                  My Complaints
                </Link>
              </>
            )}

            {/* User Info & Logout */}
            <div className="flex items-center gap-3 pl-6 border-l border-border">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-3 pt-4">
              {isAdmin ? (
                <>
                  <Link href="/admin" className="px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/admin/complaints" className="px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
                    All Complaints
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard" className="px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/complaint/new" className="px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
                    New Complaint
                  </Link>
                  <Link href="/complaints" className="px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors">
                    My Complaints
                  </Link>
                </>
              )}
              <button
                onClick={onLogout}
                className="px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors text-left flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
