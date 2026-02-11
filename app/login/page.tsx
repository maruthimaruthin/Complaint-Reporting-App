'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { NotificationCard } from '@/components/NotificationCard';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'user' | 'admin'>('user');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, title: '', message: '', type: 'success' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        setNotification({
          show: true,
          title: 'Login Successful',
          message: `Welcome back! Redirecting to ${userType} dashboard...`,
          type: 'success',
        });

        // Simulate redirect
        setTimeout(() => {
          if (userType === 'admin') {
            router.push('/admin');
          } else {
            router.push('/dashboard');
          }
        }, 1500);
      } else {
        setNotification({
          show: true,
          title: 'Login Failed',
          message: 'Please enter both email and password',
          type: 'error',
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  const fillDemoCredentials = () => {
    setEmail('demo@example.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-3xl">C</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Complaint Manager</h1>
          <p className="text-muted-foreground mt-2">Report and track issues efficiently</p>
        </div>

        {/* Notification */}
        {notification.show && (
          <div className="mb-6">
            <NotificationCard
              title={notification.title}
              message={notification.message}
              type={notification.type}
              duration={0}
              onClose={() => setNotification({ ...notification, show: false })}
            />
          </div>
        )}

        {/* Login Card */}
        <div className="bg-card rounded-lg border border-border shadow-sm p-8">
          {/* User Type Selection */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setUserType('user')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                userType === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              User Login
            </button>
            <button
              onClick={() => setUserType('admin')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                userType === 'admin'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              Admin Login
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-3">Demo credentials:</p>
            <button
              onClick={fillDemoCredentials}
              className="w-full text-sm text-primary hover:underline py-1 transition-colors"
            >
              Fill demo credentials (demo@example.com)
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-foreground">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          This is a demo application for internship project
        </p>
      </div>
    </div>
  );
}
