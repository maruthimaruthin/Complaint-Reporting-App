'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { BarChart3, Users, FileText, TrendingUp, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface Stats {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
  trend?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };
  const stats: Stats[] = [
    {
      label: 'Total Complaints',
      value: 156,
      icon: <FileText className="w-6 h-6" />,
      color: 'text-primary',
      bg: 'bg-primary/10',
      trend: '+12 this week',
    },
    {
      label: 'Active Users',
      value: 42,
      icon: <Users className="w-6 h-6" />,
      color: 'text-status-resolved',
      bg: 'bg-status-resolved/10',
      trend: '+5 new users',
    },
    {
      label: 'Resolved',
      value: 98,
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: 'text-status-resolved',
      bg: 'bg-status-resolved/10',
      trend: '62.8% resolution rate',
    },
    {
      label: 'Pending',
      value: 24,
      icon: <Clock className="w-6 h-6" />,
      color: 'text-status-in-progress',
      bg: 'bg-status-in-progress/10',
      trend: '4 urgent',
    },
  ];

  const recentComplaintsStats = [
    {
      category: 'Infrastructure',
      count: 34,
      percentage: 22,
    },
    {
      category: 'IT/Equipment',
      count: 28,
      percentage: 18,
    },
    {
      category: 'Facilities',
      count: 45,
      percentage: 29,
    },
    {
      category: 'Safety',
      count: 23,
      percentage: 15,
    },
    {
      category: 'Others',
      count: 26,
      percentage: 16,
    },
  ];

  return (
    <>
      <Navbar userRole="admin" userName="Admin User" onLogout={handleLogout} />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">System overview and key metrics</p>
            </div>
            <Link
              href="/admin/complaints"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <FileText className="w-5 h-5" />
              View All Complaints
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.bg} p-3 rounded-lg`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </div>
                {stat.trend && (
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    {stat.trend}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Category Distribution */}
            <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Complaints by Category
              </h2>

              <div className="space-y-4">
                {recentComplaintsStats.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-foreground">{item.category}</p>
                      <p className="text-sm font-semibold text-primary">{item.count}</p>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.percentage}% of total</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-foreground mb-6">Quick Actions</h2>

              <div className="space-y-3">
                <Link
                  href="/admin/complaints"
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-center block"
                >
                  All Complaints
                </Link>

                <Link
                  href="/admin/complaints?status=open"
                  className="w-full px-4 py-3 border border-status-open text-status-open bg-status-open/5 rounded-lg font-medium hover:bg-status-open/10 transition-colors text-center block flex items-center justify-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  Open Issues
                </Link>

                <Link
                  href="/admin/complaints?status=in-progress"
                  className="w-full px-4 py-3 border border-status-in-progress text-status-in-progress bg-status-in-progress/5 rounded-lg font-medium hover:bg-status-in-progress/10 transition-colors text-center block flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  In Progress
                </Link>

                <Link
                  href="/admin/complaints?status=resolved"
                  className="w-full px-4 py-3 border border-status-resolved text-status-resolved bg-status-resolved/5 rounded-lg font-medium hover:bg-status-resolved/10 transition-colors text-center block flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Resolved
                </Link>
              </div>

              <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
                <p className="text-xs text-foreground font-medium mb-2">System Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-status-resolved rounded-full animate-pulse" />
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Overview Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-status-open/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-status-open" />
                </div>
                <h3 className="font-semibold text-foreground">Open Complaints</h3>
              </div>
              <p className="text-3xl font-bold text-status-open mb-2">34</p>
              <p className="text-xs text-muted-foreground">Awaiting initial review</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-status-in-progress/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-status-in-progress" />
                </div>
                <h3 className="font-semibold text-foreground">In Progress</h3>
              </div>
              <p className="text-3xl font-bold text-status-in-progress mb-2">24</p>
              <p className="text-xs text-muted-foreground">Currently being worked on</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-status-resolved/10 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-status-resolved" />
                </div>
                <h3 className="font-semibold text-foreground">Resolved</h3>
              </div>
              <p className="text-3xl font-bold text-status-resolved mb-2">98</p>
              <p className="text-xs text-muted-foreground">Successfully completed</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
