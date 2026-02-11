'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { NotificationCard } from '@/components/NotificationCard';
import { Send, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import { useComplaints } from '@/context/ComplaintsContext';

const categories = [
  'Infrastructure',
  'Facilities',
  'IT/Equipment',
  'HR/Payroll',
  'Safety',
  'Cleanliness',
  'Noise',
  'Others',
];

export default function NewComplaintPage() {
  const router = useRouter();
  const { addComplaint } = useComplaints();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Infrastructure',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    router.push('/login');
  };
  const [notification, setNotification] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, title: '', message: '', type: 'success' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setNotification({
        show: true,
        title: 'Validation Error',
        message: 'Please enter a complaint title',
        type: 'error',
      });
      return false;
    }

    if (!formData.description.trim()) {
      setNotification({
        show: true,
        title: 'Validation Error',
        message: 'Please enter a detailed description',
        type: 'error',
      });
      return false;
    }

    if (formData.description.length < 10) {
      setNotification({
        show: true,
        title: 'Validation Error',
        message: 'Description must be at least 10 characters',
        type: 'error',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Add complaint to context (persists to localStorage)
      const complaintId = addComplaint({
        userId: 'user-1',
        title: formData.title,
        category: formData.category,
        description: formData.description,
        priority: formData.priority as 'low' | 'medium' | 'high',
        status: 'open',
      });

      setNotification({
        show: true,
        title: 'Complaint Submitted',
        message: `Your complaint has been successfully filed. Complaint ID: ${complaintId}. Redirecting...`,
        type: 'success',
      });

      // Reset form
      setFormData({
        title: '',
        category: 'Infrastructure',
        description: '',
        priority: 'medium',
      });

      // Simulate redirect
      setTimeout(() => {
        router.push('/complaints');
      }, 2000);
    }, 1200);
  };

  return (
    <>
      <Navbar userRole="user" userName="John Doe" onLogout={handleLogout} />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-primary hover:underline mb-4 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-foreground">File a New Complaint</h1>
            <p className="text-muted-foreground mt-2">
              Please provide detailed information about your issue. Our team will review and respond promptly.
            </p>
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

          {/* Form Card */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-2">
                  Complaint Title *
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Brief summary of your issue"
                  maxLength={100}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground placeholder-muted-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">{formData.title.length}/100 characters</p>
              </div>

              {/* Category Field */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-foreground mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Field */}
              <div>
                <label htmlFor="priority" className="block text-sm font-semibold text-foreground mb-2">
                  Priority Level
                </label>
                <div className="flex gap-3">
                  {(['low', 'medium', 'high'] as const).map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priority"
                        value={level}
                        checked={formData.priority === level}
                        onChange={handleChange}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm font-medium text-foreground capitalize">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                  Detailed Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please provide detailed information about the issue, including what happened, when it happened, and any relevant details..."
                  maxLength={1000}
                  rows={8}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground placeholder-muted-foreground resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">{formData.description.length}/1000 characters</p>
              </div>

              {/* Info Box */}
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-sm text-foreground">
                  <p className="font-medium mb-1">Please note:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Your complaint will be assigned a unique ID for tracking</li>
                    <li>The admin team will review your complaint within 24 hours</li>
                    <li>You will receive updates via email when status changes</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Complaint
                    </>
                  )}
                </button>
                <Link
                  href="/dashboard"
                  className="px-6 py-2.5 border border-border rounded-lg font-medium text-foreground hover:bg-secondary transition-colors text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
