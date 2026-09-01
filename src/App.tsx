import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import AppShell from '@/components/AppShell';
import { AnalysisProvider } from '@/context/AnalysisContext';
import { useAuth } from '@/context/AuthContext';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import Dashboard from '@/pages/Dashboard';
import UploadPage from '@/pages/UploadPage';
import AnalysisSetup from '@/pages/AnalysisSetup';
import AnalysisPage from '@/pages/AnalysisPage';
import BrandAudit from '@/pages/BrandAudit';
import StoryMining from '@/pages/StoryMining';
import GapAnalysis from '@/pages/GapAnalysis';
import ActionPlan from '@/pages/ActionPlan';
import Projects from '@/pages/Projects';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import type { ReactNode } from 'react';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-50">
        <div className="animate-pulse text-sm text-ink-400">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AnalysisProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setup" element={<AnalysisSetup />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/brand-audit" element={<BrandAudit />} />
          <Route path="/story-mining" element={<StoryMining />} />
          <Route path="/gap-analysis" element={<GapAnalysis />} />
          <Route path="/action-plan" element={<ActionPlan />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnalysisProvider>
  );
}
