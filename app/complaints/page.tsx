'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { StatusBadge } from '@/components/StatusBadge';
import { Filter, Search, ArrowLeft } from 'lucide-react';
import { useComplaints } from '@/context/ComplaintsContext';

export default function ComplaintsPage() {
  const router = useRouter();
  const { complaints } = useComplaints();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const handleLogout = () => {
    router.push('/login');
  };

  // Use complaints from context instead of mock data
  const allComplaints = useMemo(() => {
    return complaints.map((c) => ({
      id: c.id,
      title: c.title,
      category: c.category,
      status: c.status,
      date: c.date,
      priority: c.priority,
    }));
  }, [complaints]);

  const filteredComplaints = allComplaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || complaint.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || complaint.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive';
      case 'medium':
        return 'bg-status-open/10 text-status-open';
      case 'low':
        return 'bg-status-in-progress/10 text-status-in-progress';
      default:
        return 'bg-secondary text-foreground';
    }
  };

  return (
    <>
      <Navbar userRole="user" userName="John Doe" onLogout={handleLogout} />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-primary hover:underline mb-4 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-foreground">My Complaints</h1>
            <p className="text-muted-foreground mt-2">
              Showing {filteredComplaints.length} of {allComplaints.length} complaints
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            {/* Search Bar */}
            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
                Search Complaints
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by complaint ID or title..."
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-foreground mb-2">
                  Filter by Status
                </label>
                <select
                  id="status-filter"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label htmlFor="priority-filter" className="block text-sm font-medium text-foreground mb-2">
                  Filter by Priority
                </label>
                <select
                  id="priority-filter"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value as any)}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground cursor-pointer"
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Complaints Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {filteredComplaints.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary border-b border-border">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Priority</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint) => (
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
                        <td className="px-6 py-4">
                          <p className="font-medium text-foreground">{complaint.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-foreground">{complaint.category}</p>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={complaint.status} />
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)} capitalize`}>
                            {complaint.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{complaint.date}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/complaints/${complaint.id}`}
                            className="text-primary hover:underline text-sm font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-medium mb-2">No complaints found</p>
                <p className="text-muted-foreground text-sm mb-4">Try adjusting your search or filters</p>
                <Link
                  href="/complaint/new"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  File a new complaint
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
