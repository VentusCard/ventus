import { useState, useEffect, useCallback } from 'react';
import type { PipelineStatus, PipelineStage, ContactLogEntry } from '@/types/bankwide';

const STORAGE_KEY = 'ventus_pipeline_status';

export function usePipelineStatus() {
  const [statuses, setStatuses] = useState<PipelineStatus[]>([]);

  // Load from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setStatuses(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse pipeline status:', e);
      }
    }
  }, []);

  // Persist to sessionStorage whenever statuses change
  useEffect(() => {
    if (statuses.length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
    }
  }, [statuses]);

  const getStatus = useCallback((merchantName: string, opportunityId: string): PipelineStatus | undefined => {
    return statuses.find(s => s.merchantName === merchantName && s.opportunityId === opportunityId);
  }, [statuses]);

  const getOrCreateStatus = useCallback((merchantName: string, opportunityId: string): PipelineStatus => {
    const existing = statuses.find(s => s.merchantName === merchantName && s.opportunityId === opportunityId);
    if (existing) return existing;
    
    return {
      merchantName,
      opportunityId,
      status: 'not_started',
      notes: [],
      lastUpdated: new Date().toISOString(),
      contactLog: []
    };
  }, [statuses]);

  const updateStatus = useCallback((merchantName: string, opportunityId: string, newStatus: PipelineStage) => {
    setStatuses(prev => {
      const existing = prev.find(s => s.merchantName === merchantName && s.opportunityId === opportunityId);
      if (existing) {
        return prev.map(s => 
          s.merchantName === merchantName && s.opportunityId === opportunityId
            ? { ...s, status: newStatus, lastUpdated: new Date().toISOString() }
            : s
        );
      } else {
        return [...prev, {
          merchantName,
          opportunityId,
          status: newStatus,
          notes: [],
          lastUpdated: new Date().toISOString(),
          contactLog: []
        }];
      }
    });
  }, []);

  const addNote = useCallback((merchantName: string, opportunityId: string, note: string) => {
    setStatuses(prev => {
      const existing = prev.find(s => s.merchantName === merchantName && s.opportunityId === opportunityId);
      if (existing) {
        return prev.map(s => 
          s.merchantName === merchantName && s.opportunityId === opportunityId
            ? { ...s, notes: [...s.notes, note], lastUpdated: new Date().toISOString() }
            : s
        );
      } else {
        return [...prev, {
          merchantName,
          opportunityId,
          status: 'not_started' as PipelineStage,
          notes: [note],
          lastUpdated: new Date().toISOString(),
          contactLog: []
        }];
      }
    });
  }, []);

  const logContact = useCallback((merchantName: string, opportunityId: string, entry: Omit<ContactLogEntry, 'date'>) => {
    const contactEntry: ContactLogEntry = {
      ...entry,
      date: new Date().toISOString()
    };
    
    setStatuses(prev => {
      const existing = prev.find(s => s.merchantName === merchantName && s.opportunityId === opportunityId);
      if (existing) {
        return prev.map(s => 
          s.merchantName === merchantName && s.opportunityId === opportunityId
            ? { ...s, contactLog: [...s.contactLog, contactEntry], lastUpdated: new Date().toISOString() }
            : s
        );
      } else {
        return [...prev, {
          merchantName,
          opportunityId,
          status: 'contacted' as PipelineStage,
          notes: [],
          lastUpdated: new Date().toISOString(),
          contactLog: [contactEntry]
        }];
      }
    });
  }, []);

  const getStatusCounts = useCallback((opportunityId?: string) => {
    const filtered = opportunityId 
      ? statuses.filter(s => s.opportunityId === opportunityId)
      : statuses;
    
    return {
      not_started: filtered.filter(s => s.status === 'not_started').length,
      contacted: filtered.filter(s => s.status === 'contacted').length,
      negotiating: filtered.filter(s => s.status === 'negotiating').length,
      contract_sent: filtered.filter(s => s.status === 'contract_sent').length,
      live: filtered.filter(s => s.status === 'live').length,
      total: filtered.length
    };
  }, [statuses]);

  const getAllStatuses = useCallback(() => statuses, [statuses]);

  return {
    getStatus,
    getOrCreateStatus,
    updateStatus,
    addNote,
    logContact,
    getStatusCounts,
    getAllStatuses
  };
}
