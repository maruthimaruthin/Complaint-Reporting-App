'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, CheckCircle2, Users, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRedirecting(true);
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {!isRedirecting ? (
          <div className="text-center">
            {/* Logo */}
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-primary-foreground font-bold text-3xl">C</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-foreground mb-4">Complaint Manager</h1>
            <p className="text-lg text-muted-foreground mb-2">Issue Reporting System</p>
            <p className="text-sm text-muted-foreground mb-8">
              Professional internship project for efficient complaint management
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium text-foreground">User & Admin Roles</p>
                <p className="text-xs text-muted-foreground mt-1">Separate interfaces for different access levels</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <p className="font-medium text-foreground">Status Tracking</p>
                <p className="text-xs text-muted-foreground mt-1">Track complaints from submission to resolution</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="w-10 h-10 bg-status-in-progress/10 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <BarChart3 className="w-6 h-6 text-status-in-progress" />
                </div>
                <p className="font-medium text-foreground">Analytics</p>
                <p className="text-xs text-muted-foreground mt-1">Comprehensive dashboard with key metrics</p>
              </div>
            </div>

            {/* Loading Animation */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <p className="text-foreground font-medium">Redirecting to login...</p>
            </div>

            {/* Manual Navigation */}
            <div className="space-y-3">
              <Link
                href="/login"
                className="w-full inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Go to Login
              </Link>
              <Link
                href="/register"
                className="w-full inline-block border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                Create New Account
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-foreground">Redirecting...</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          <p>Demo Application for Internship Project</p>
          <p className="mt-2">© 2024 Complaint Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
