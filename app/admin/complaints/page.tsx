'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { StatusBadge } from '@/components/StatusBadge';
import { NotificationCard } from '@/components/NotificationCard';
import { ArrowLeft, Search, Filter, Edit2, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { useComplaints, Complaint } from '@/context/ComplaintsContext';

interface SelectedComplaint extends Complaint {
  response?: string;
}

export default function AdminComplaintsPage() {
  const router = useRouter();
  const { complaints, updateComplaintStatus, addAdminResponse } = useComplaints();

  const handleLogout = () => {
    router.push('/login');
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');
  const [selectedComplaint, setSelectedComplaint] = useState<SelectedComplaint | null>(null);
  const [adminResponse, setAdminResponse] = useState('');
  const [newStatus, setNewStatus] = useState<'open' | 'in-progress' | 'resolved'>('open');
  const [notification, setNotification] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, title: '', message: '', type: 'success' });

  const allComplaints = useMemo(() => {
    return complaints;
  }, [complaints]);

  const filteredComplaints = allComplaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || complaint.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = () => {
    if (selectedComplaint && newStatus !== selectedComplaint.status) {
      updateComplaintStatus(selectedComplaint.id, newStatus);
      
      setNotification({
        show: true,
        title: 'Status Updated',
        message: `Complaint ${selectedComplaint.id} status updated to ${newStatus}.`,
        type: 'success',
      });

      // Update the selected complaint
      setSelectedComplaint({
        ...selectedComplaint,
        status: newStatus,
      });

      setNewStatus(newStatus);
    }
  };

  const handleAddResponse = () => {
    if (selectedComplaint && adminResponse.trim()) {
      addAdminResponse(selectedComplaint.id, {
        adminName: 'Support Team',
        message: adminResponse,
      });

      setNotification({
        show: true,
        title: 'Response Added',
        message: `Response added to complaint ${selectedComplaint.id}. User will be notified.`,
        type: 'success',
      });

      setAdminResponse('');
    }
  };

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
      <Navbar userRole="admin" userName="Admin User" onLogout={handleLogout} />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-primary hover:underline mb-4 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Manage Complaints</h1>
            <p className="text-muted-foreground mt-2">
              Showing {filteredComplaints.length} of {allComplaints.length} complaints
            </p>
          </div>

          {/* Notification */}
          {notification.show && (
            <div className="mb-6">
              <NotificationCard
                title={notification.title}
                message={notification.message}
                type={notification.type}
                duration={5000}
                onClose={() => setNotification({ ...notification, show: false })}
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Complaints List */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                {/* Search and Filter */}
                <div className="space-y-4 mb-6">
                  <div>
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
                        placeholder="Search by ID or title..."
                        className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
                      />
                    </div>
                  </div>

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
                </div>
              </div>

              {/* Complaints Cards */}
              <div className="space-y-3">
                {filteredComplaints.map((complaint) => (
                  <button
                    key={complaint.id}
                    onClick={() => {
                      setSelectedComplaint(complaint);
                      setNewStatus(complaint.status);
                      setAdminResponse('');
                    }}
                    className={`w-full text-left bg-card border rounded-lg p-4 transition-all hover:shadow-md ${
                      selectedComplaint?.id === complaint.id
                        ? 'border-primary shadow-md bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground">{complaint.id}</p>
                        <p className="text-sm text-foreground line-clamp-1 mt-1">{complaint.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs px-2 py-1 bg-secondary rounded text-foreground">
                            {complaint.category}
                          </span>
                          <StatusBadge status={complaint.status} />
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(complaint.priority)} capitalize`}>
                          {complaint.priority}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">{complaint.date}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Detail Panel */}
            {selectedComplaint ? (
              <div className="bg-card border border-border rounded-lg p-6 lg:sticky lg:top-6 h-fit">
                <h3 className="font-bold text-lg text-foreground mb-4">Complaint Details</h3>

                {/* Details */}
                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">ID</p>
                    <p className="text-foreground font-semibold">{selectedComplaint.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">User ID</p>
                    <p className="text-foreground">{selectedComplaint.userId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Title</p>
                    <p className="text-foreground">{selectedComplaint.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Description</p>
                    <p className="text-sm text-foreground">{selectedComplaint.description}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Category</p>
                    <p className="text-foreground">{selectedComplaint.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Current Status</p>
                    <StatusBadge status={selectedComplaint.status} className="mt-1" />
                  </div>
                </div>

                {/* Status Update */}
                <div className="mb-6">
                  <label htmlFor="new-status" className="block text-sm font-semibold text-foreground mb-2">
                    Update Status
                  </label>
                  <select
                    id="new-status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground cursor-pointer mb-2"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    {newStatus === 'resolved' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Mark as Resolved
                      </>
                    ) : newStatus === 'in-progress' ? (
                      <>
                        <Clock className="w-4 h-4" />
                        Set In Progress
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-4 h-4" />
                        Update Status
                      </>
                    )}
                  </button>
                </div>

                {/* Admin Response */}
                <div className="space-y-2">
                  <label htmlFor="admin-response" className="block text-sm font-semibold text-foreground">
                    Admin Response
                  </label>
                  {selectedComplaint.response && (
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-sm text-foreground mb-3">
                      <p className="text-xs text-accent font-medium mb-1">Previous Response:</p>
                      <p>{selectedComplaint.response}</p>
                    </div>
                  )}
                  <textarea
                    id="admin-response"
                    value={adminResponse}
                    onChange={(e) => setAdminResponse(e.target.value)}
                    placeholder="Add your response here..."
                    maxLength={500}
                    rows={5}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground placeholder-muted-foreground resize-none"
                  />
                  <p className="text-xs text-muted-foreground">{adminResponse.length}/500</p>
                  <button
                    onClick={handleAddResponse}
                    disabled={!adminResponse.trim()}
                    className="w-full px-3 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send Response
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-6 rounded-lg flex items-center justify-center h-96 lg:h-auto lg:sticky lg:top-6">
                <div className="text-center">
                  <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground font-medium">Select a complaint</p>
                  <p className="text-sm text-muted-foreground">Click on a complaint to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
