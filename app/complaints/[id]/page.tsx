'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { StatusBadge } from '@/components/StatusBadge';
import { NotificationCard } from '@/components/NotificationCard';
import { ArrowLeft, Download, Reply } from 'lucide-react';
import { useComplaints } from '@/context/ComplaintsContext';

function ComplaintDetailContent() {
  const router = useRouter();
  const params = useParams();
  const complaintId = params?.id as string;
  const { getComplaintById } = useComplaints();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = () => {
    router.push('/login');
  };

  // Mock complaint data for fallback
  const complaintMap: Record<string, any> = {
    'CMP-001': {
      id: 'CMP-001',
      title: 'Issue with office WiFi connectivity',
      category: 'IT/Equipment',
      status: 'in-progress',
      date: '2024-01-15',
      priority: 'high',
      description:
        'The WiFi connection in the north wing keeps dropping. This is affecting work productivity. I have tried reconnecting multiple times but the issue persists. The signal strength shows as full but the connection keeps disconnecting every few minutes.',
      submittedBy: 'John Doe',
      updatedAt: '2024-01-16',
      responses: [],
    },
    'CMP-002': {
      id: 'CMP-002',
      title: 'Broken chair in cabin A',
      category: 'Facilities',
      status: 'open',
      date: '2024-01-14',
      priority: 'low',
      description:
        'One of the office chairs in cabin A has a broken armrest. The armrest is wobbly and could potentially cause injury. Please replace with a new chair or repair the existing one.',
      submittedBy: 'Jane Smith',
      updatedAt: '2024-01-15',
      responses: [],
    },
    'CMP-003': {
      id: 'CMP-003',
      title: 'Missing office supplies',
      category: 'Infrastructure',
      status: 'resolved',
      date: '2024-01-10',
      priority: 'medium',
      description:
        'The office supplies cabinet is running low on essential items like pens, notepads, and sticky notes. We need to reorder these items urgently.',
      submittedBy: 'Mike Johnson',
      updatedAt: '2024-01-12',
      responses: [],
    },
    'CMP-004': {
      id: 'CMP-004',
      title: 'Noise from construction',
      category: 'Noise',
      status: 'in-progress',
      date: '2024-01-12',
      priority: 'medium',
      description:
        'There is excessive noise coming from the construction site nearby. This is causing distraction during calls and meetings. The noise level is particularly high between 9 AM and 12 PM.',
      submittedBy: 'Sarah Wilson',
      updatedAt: '2024-01-14',
      responses: [],
    },
    'CMP-005': {
      id: 'CMP-005',
      title: 'Poor air conditioning in meeting room',
      category: 'Facilities',
      status: 'resolved',
      date: '2024-01-08',
      priority: 'low',
      description:
        'The air conditioning in meeting room B is not working properly. The temperature is too high, making it uncomfortable for long meetings.',
      submittedBy: 'Robert Brown',
      updatedAt: '2024-01-10',
      responses: [],
    },
    'CMP-006': {
      id: 'CMP-006',
      title: 'Broken printer on 3rd floor',
      category: 'IT/Equipment',
      status: 'in-progress',
      date: '2024-01-13',
      priority: 'high',
      description:
        'The printer on the 3rd floor is showing an error and refuses to print. Paper jam indicator is on. Please check and repair or replace the printer.',
      submittedBy: 'Emily Davis',
      updatedAt: '2024-01-15',
      responses: [],
    },
    'CMP-007': {
      id: 'CMP-007',
      title: 'Cleanliness issues in restroom',
      category: 'Cleanliness',
      status: 'open',
      date: '2024-01-11',
      priority: 'medium',
      description:
        'The restroom on the second floor is not being cleaned regularly. Please ensure proper cleaning schedule is maintained.',
      submittedBy: 'Lisa Anderson',
      updatedAt: '2024-01-13',
      responses: [],
    },
    'CMP-008': {
      id: 'CMP-008',
      title: 'Unsafe stairs condition',
      category: 'Safety',
      status: 'resolved',
      date: '2024-01-05',
      priority: 'high',
      description:
        'The stairs near the emergency exit have loose steps. This is a serious safety hazard. Please fix immediately.',
      submittedBy: 'Tom Martinez',
      updatedAt: '2024-01-07',
      responses: [],
    },
  };

  const complaint = complaintMap[complaintId];

  // Use admin responses from context
  const adminResponses = complaint?.responses || [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'medium':
        return 'bg-status-open/10 text-status-open border-status-open/30';
      case 'low':
        return 'bg-status-in-progress/10 text-status-in-progress border-status-in-progress/30';
      default:
        return 'bg-secondary text-foreground border-border';
    }
  };

  const handleSubmitReply = async () => {
    if (!replyMessage.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setNotificationMessage('Your reply has been submitted successfully!');
    setShowNotification(true);
    setReplyMessage('');
    setIsSubmitting(false);

    setTimeout(() => setShowNotification(false), 5000);
  };

  return (
    <>
      <Navbar userRole="user" userName="John Doe" onLogout={handleLogout} />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            href="/complaints"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Complaints
          </Link>

          {/* Notification */}
          {showNotification && (
            <NotificationCard
              type="success"
              message={notificationMessage}
              onClose={() => setShowNotification(false)}
            />
          )}

          {/* Header Section */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl font-bold text-foreground">{complaint?.title}</h1>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-muted-foreground font-medium">ID: {complaint?.id}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{complaint?.date}</span>
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-foreground font-medium">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>

            {/* Status and Priority */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Status:</span>
                <StatusBadge status={complaint?.status} />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Priority:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(complaint?.priority)} capitalize border`}
                >
                  {complaint?.priority}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Category:</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {complaint?.category}
                </span>
              </div>
            </div>
          </div>

          {/* Complaint Details */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Complaint Description</h2>
                <p className="text-foreground leading-relaxed mb-6">{complaint?.description}</p>

                <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between text-sm text-muted-foreground gap-4">
                  <div>
                    <p className="font-medium text-foreground mb-1">Submitted By</p>
                    <p>{complaint?.submittedBy}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Last Updated</p>
                    <p>{complaint?.updatedAt}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info Sidebar */}
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Complaint ID</p>
                    <p className="font-mono font-semibold text-primary">{complaint?.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p className="font-medium text-foreground">{complaint?.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Responses</p>
                    <p className="font-medium text-foreground">{adminResponses.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Responses */}
          {adminResponses.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Admin Responses</h2>
              <div className="space-y-4">
                {adminResponses.map((response, index) => (
                  <div key={response.id} className={`p-4 rounded-lg ${index === 0 ? 'bg-primary/5 border border-primary/20' : 'bg-secondary'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{response.admin}</p>
                        <p className="text-xs text-muted-foreground">{response.date}</p>
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed">{response.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reply Section - Only for Open/In-Progress */}
          {(complaint?.status === 'open' || complaint?.status === 'in-progress') && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Reply className="w-5 h-5" />
                Add Your Reply
              </h2>

              <div>
                <label htmlFor="reply" className="block text-sm font-medium text-foreground mb-2">
                  Your Message
                </label>
                <textarea
                  id="reply"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply or additional information here..."
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground placeholder-muted-foreground resize-none"
                />
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-foreground font-medium">
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReply}
                  disabled={isSubmitting || !replyMessage.trim()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Reply'}
                </button>
              </div>
            </div>
          )}

          {/* Resolved Message */}
          {complaint?.status === 'resolved' && (
            <div className="bg-status-resolved/5 border border-status-resolved/20 rounded-lg p-6 text-center">
              <p className="text-foreground font-semibold mb-1">This complaint has been resolved</p>
              <p className="text-muted-foreground">Thank you for reporting this issue. If you have further concerns, please file a new complaint.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default function ComplaintDetailPage() {
  const handleLogout = () => {
    // handleLogout function implementation
  };

  return (
    <Suspense
      fallback={
        <>
          <Navbar userRole="user" userName="John Doe" onLogout={handleLogout} />
          <div className="min-h-screen bg-background flex items-center justify-center">
            <p className="text-foreground">Loading complaint details...</p>
          </div>
        </>
      }
    >
      <ComplaintDetailContent />
    </Suspense>
  );
}
