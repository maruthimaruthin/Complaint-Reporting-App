'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { StatusBadge } from '@/components/StatusBadge';
import { NotificationCard } from '@/components/NotificationCard';
import { FileText, Plus, TrendingUp, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useComplaints } from '@/context/ComplaintsContext';

export default function DashboardPage() {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const { complaints } = useComplaints();

  const handleLogout = () => {
    router.push('/login');
  };

  // Get recent complaints (last 5)
  const recentComplaints = useMemo(() => {
    return complaints.slice(0, 5).map((c) => ({
      id: c.id,
      title: c.title,
      status: c.status,
      date: c.date,
    }));
  }, [complaints]);

  // Calculate stats from complaints
  const stats = useMemo(() => {
    const openCount = complaints.filter((c) => c.status === 'open').length;
    const inProgressCount = complaints.filter((c) => c.status === 'in-progress').length;
    const resolvedCount = complaints.filter((c) => c.status === 'resolved').length;

    return [
      {
        label: 'Total Complaints',
        value: complaints.length,
        icon: FileText,
        color: 'text-primary',
        bg: 'bg-primary/10',
      },
      {
        label: 'Open',
        value: openCount,
        icon: AlertCircle,
        color: 'text-status-open',
        bg: 'bg-status-open/10',
      },
      {
        label: 'In Progress',
        value: inProgressCount,
        icon: Clock,
        color: 'text-status-in-progress',
        bg: 'bg-status-in-progress/10',
      },
      {
        label: 'Resolved',
        value: resolvedCount,
        icon: CheckCircle2,
        color: 'text-status-resolved',
        bg: 'bg-status-resolved/10',
      },
    ];
  }, [complaints]);

  return (
    <>
      <Navbar userRole="user" userName="John Doe" onLogout={handleLogout} />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back! Here's your complaint overview.</p>
            </div>
            <Link
              href="/complaint/new"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              File New Complaint
            </Link>
          </div>

          {/* Notification */}
          {showNotification && (
            <div className="mb-6">
              <NotificationCard
                title="Complaint Updated"
                message="Your complaint CMP-001 status has been updated to In-Progress"
                type="info"
                duration={5000}
                onClose={() => setShowNotification(false)}
              />
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                    </div>
                    <div className={`${stat.bg} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Complaints Section */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Recent Complaints
                </h2>
                <Link
                  href="/complaints"
                  className="text-primary hover:underline text-sm font-medium transition-colors"
                >
                  View All →
                </Link>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary border-b border-border">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Complaint ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentComplaints.map((complaint) => (
                    <tr
                      key={complaint.id}
                      className="border-b border-border hover:bg-secondary/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/complaints/${complaint.id}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {complaint.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-foreground">{complaint.title}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={complaint.status} />
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{complaint.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/complaint/new"
              className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">File New Complaint</h3>
              <p className="text-sm text-muted-foreground">Report a new issue or concern</p>
            </Link>

            <Link
              href="/complaints"
              className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">View All Complaints</h3>
              <p className="text-sm text-muted-foreground">Check your complete complaint history</p>
            </Link>

            <button
              onClick={() => setShowNotification(!showNotification)}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group cursor-pointer text-left"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Test Notification</h3>
              <p className="text-sm text-muted-foreground">See how updates appear</p>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
