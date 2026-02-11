'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Complaint {
  id: string;
  userId: string;
  title: string;
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  date: string;
  responses: AdminResponse[];
}

export interface AdminResponse {
  id: string;
  adminName: string;
  message: string;
  date: string;
}

interface ComplaintsContextType {
  complaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, 'id' | 'date' | 'responses'>) => string;
  updateComplaintStatus: (
    complaintId: string,
    status: 'open' | 'in-progress' | 'resolved',
  ) => void;
  addAdminResponse: (complaintId: string, response: Omit<AdminResponse, 'id' | 'date'>) => void;
  getComplaintById: (id: string) => Complaint | undefined;
}

const ComplaintsContext = createContext<ComplaintsContextType | undefined>(undefined);

const initialComplaints: Complaint[] = [
  {
    id: 'CMP-001',
    userId: 'user-1',
    title: 'Issue with office WiFi connectivity',
    category: 'IT/Equipment',
    description:
      'The WiFi in the office has been disconnecting frequently throughout the day, affecting productivity and work efficiency.',
    priority: 'high',
    status: 'in-progress',
    date: '2024-01-15',
    responses: [
      {
        id: 'resp-1',
        adminName: 'IT Support',
        message: 'We are working on resolving the WiFi issue. Please restart your router.',
        date: '2024-01-15',
      },
    ],
  },
  {
    id: 'CMP-002',
    userId: 'user-1',
    title: 'Broken chair in cabin A',
    category: 'Facilities',
    description:
      'The office chair in cabin A is broken and needs replacement. The seat is damaged and uncomfortable.',
    priority: 'medium',
    status: 'open',
    date: '2024-01-14',
    responses: [],
  },
  {
    id: 'CMP-003',
    userId: 'user-2',
    title: 'Missing office supplies',
    category: 'Infrastructure',
    description:
      'The office supplies for the design team have not been restocked. We are running low on printer paper and ink cartridges.',
    priority: 'low',
    status: 'resolved',
    date: '2024-01-10',
    responses: [
      {
        id: 'resp-2',
        adminName: 'Admin Team',
        message: 'Supplies have been ordered and will be delivered by EOW.',
        date: '2024-01-11',
      },
      {
        id: 'resp-3',
        adminName: 'Admin Team',
        message: 'Supplies have been received and stocked. Issue resolved.',
        date: '2024-01-13',
      },
    ],
  },
];

export function ComplaintsProvider({ children }: { children: ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage only after hydration
  useEffect(() => {
    const stored = localStorage.getItem('complaints');
    if (stored) {
      try {
        setComplaints(JSON.parse(stored));
      } catch {
        setComplaints(initialComplaints);
      }
    }
    setMounted(true);
  }, []);

  // Save to localStorage whenever complaints change (only after mounted)
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('complaints', JSON.stringify(complaints));
    }
  }, [complaints, mounted]);

  const addComplaint = (
    complaint: Omit<Complaint, 'id' | 'date' | 'responses'>,
  ): string => {
    // Get the highest complaint number and increment it
    const maxNumber = complaints.reduce((max, c) => {
      const num = parseInt(c.id.replace('CMP-', ''), 10);
      return num > max ? num : max;
    }, 0);
    
    const newId = `CMP-${String(maxNumber + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    const newComplaint: Complaint = {
      ...complaint,
      id: newId,
      date: today,
      responses: [],
    };

    setComplaints((prev) => [newComplaint, ...prev]);
    return newId;
  };

  const updateComplaintStatus = (
    complaintId: string,
    status: 'open' | 'in-progress' | 'resolved',
  ) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === complaintId ? { ...c, status } : c)),
    );
  };

  const addAdminResponse = (complaintId: string, response: Omit<AdminResponse, 'id' | 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          return {
            ...c,
            responses: [
              ...c.responses,
              {
                id: `resp-${Date.now()}`,
                ...response,
                date: today,
              },
            ],
          };
        }
        return c;
      }),
    );
  };

  const getComplaintById = (id: string): Complaint | undefined => {
    return complaints.find((c) => c.id === id);
  };

  return (
    <ComplaintsContext.Provider
      value={{
        complaints,
        addComplaint,
        updateComplaintStatus,
        addAdminResponse,
        getComplaintById,
      }}
    >
      {children}
    </ComplaintsContext.Provider>
  );
}

export function useComplaints() {
  const context = useContext(ComplaintsContext);
  if (!context) {
    throw new Error('useComplaints must be used within ComplaintsProvider');
  }
  return context;
}
