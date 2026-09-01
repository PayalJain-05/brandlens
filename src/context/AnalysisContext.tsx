import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { BrandLensAnalysis } from '@/types';

interface AnalysisContextValue {
  analysis: BrandLensAnalysis | null;
  setAnalysis: (a: BrandLensAnalysis | null) => void;
  analyzedAt: string | null;
  clearAnalysis: () => void;
}

const AnalysisContext = createContext<AnalysisContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = 'brandlens_analysis';

interface StoredAnalysis {
  result: BrandLensAnalysis;
  analyzedAt: string;
}

function loadFromStorage(): {
  analysis: BrandLensAnalysis | null;
  analyzedAt: string | null;
} {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { analysis: null, analyzedAt: null };
    const parsed: StoredAnalysis = JSON.parse(raw);
    if (parsed.result && typeof parsed.result === 'object') {
      return { analysis: parsed.result, analyzedAt: parsed.analyzedAt ?? null };
    }
  } catch {
    /* ignore corrupt storage */
  }
  return { analysis: null, analyzedAt: null };
}

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysis, setAnalysisState] = useState<BrandLensAnalysis | null>(null);
  const [analyzedAt, setAnalyzedAt] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadFromStorage();
    setAnalysisState(loaded.analysis);
    setAnalyzedAt(loaded.analyzedAt);

    const handleStorage = () => {
      const loaded = loadFromStorage();
      setAnalysisState(loaded.analysis);
      setAnalyzedAt(loaded.analyzedAt);
    };

    window.addEventListener('brandlens-analysis-updated', handleStorage);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('brandlens-analysis-updated', handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const setAnalysis = (a: BrandLensAnalysis | null) => {
    setAnalysisState(a);
    if (a) {
      const stored: StoredAnalysis = {
        result: a,
        analyzedAt: new Date().toISOString(),
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      window.dispatchEvent(new Event('brandlens-analysis-updated'));
    }
  };

  const clearAnalysis = () => {
    setAnalysisState(null);
    setAnalyzedAt(null);
    sessionStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('brandlens-analysis-updated'));
  };

  return (
    <AnalysisContext.Provider
      value={{ analysis, setAnalysis, analyzedAt, clearAnalysis }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis(): AnalysisContextValue {
  const ctx = useContext(AnalysisContext);
  if (!ctx) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return ctx;
}
