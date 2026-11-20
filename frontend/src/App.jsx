import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { QuantumProvider } from './context/QuantumContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import MainLayout from './components/layout/MainLayout';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const QuantumLab = lazy(() => import('./pages/QuantumLab'));
const CircuitBuilder = lazy(() => import('./pages/CircuitBuilder'));
const QuantumExperiments = lazy(() => import('./pages/QuantumExperiments'));
const QuantumVisualizer = lazy(() => import('./pages/QuantumVisualizer'));
const AITutor = lazy(() => import('./pages/AITutor'));
const LearningAcademy = lazy(() => import('./pages/LearningAcademy'));
const ResearchWorkspace = lazy(() => import('./pages/ResearchWorkspace'));
const SavedExperiments = lazy(() => import('./pages/SavedExperiments'));
const Settings = lazy(() => import('./pages/Settings'));

export default function App() {
  return (
    <ErrorBoundary fallbackTitle="QUANTUM LAB Application Error">
      <ThemeProvider>
        <QuantumProvider>
          <BrowserRouter>
            <MainLayout>
              <Suspense
                fallback={
                  <div className="flex min-h-[40vh] items-center justify-center text-sm text-[var(--lab-muted)]">
                    Loading...
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/laboratory" element={<QuantumLab />} />
                  <Route path="/circuit-builder" element={<CircuitBuilder />} />
                  <Route path="/experiments" element={<QuantumExperiments />} />
                  <Route path="/visualizer" element={<QuantumVisualizer />} />
                  <Route path="/tutor" element={<AITutor />} />
                  <Route path="/academy" element={<LearningAcademy />} />
                  <Route path="/research" element={<ResearchWorkspace />} />
                  <Route path="/saved" element={<SavedExperiments />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </MainLayout>
          </BrowserRouter>

          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0f172a',
                color: '#e2e8f0',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                fontSize: '13px',
              },
            }}
          />
        </QuantumProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
