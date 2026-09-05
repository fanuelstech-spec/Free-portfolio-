/**
 * Liquid Glass Portfolio Application
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BackgroundGradients } from './components/BackgroundGradients';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PostsSection } from './components/PostsSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { ImageModal } from './components/ImageModal';
import { ConfigModal } from './components/ConfigModal';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { Footer } from './components/Footer';
import { fetchPortfolio, FALLBACK_PORTFOLIO_DATA } from './api';
import { PortfolioResponse, Project } from './types';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<PortfolioResponse>(FALLBACK_PORTFOLIO_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filter & modal states
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption?: string } | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // User credentials
  const [username, setUsername] = useState<string>(() => {
    return (typeof import.meta !== 'undefined' && import.meta.env?.VITE_USERNAME) || 'fanueldx25';
  });
  const [apiKey, setApiKey] = useState<string>(() => {
    return (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_KEY) || '';
  });

  // Load data function
  const loadPortfolioData = useCallback(async (user: string, key: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchPortfolio({ username: user, apiKey: key });
      setData(result.data);
      setIsLive(result.isLive);
      if (result.error && !result.isLive) {
        setError(`Live fetch notice: ${result.error}. Displaying verified portfolio profile.`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch portfolio data';
      setError(msg);
      setData(FALLBACK_PORTFOLIO_DATA);
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadPortfolioData(username, apiKey);
  }, [loadPortfolioData, username, apiKey]);

  // Section scroll handler
  const handleSelectSection = (section: string) => {
    setActiveSection(section);
    const targetId = `${section}-section`;
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll spy to highlight active section automatically
  useEffect(() => {
    const sectionIds = ['hero-section', 'about-section', 'projects-section', 'activity-section', 'contact-section'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            const cleanName = id.replace('-section', '');
            setActiveSection(cleanName);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleApplyConfig = (newUsername: string, newApiKey: string) => {
    setUsername(newUsername);
    setApiKey(newApiKey);
    loadPortfolioData(newUsername, newApiKey);
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col justify-between selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Liquid Glass Ambient Background */}
      <BackgroundGradients />

      {/* Top Floating Glass Navigation */}
      <HeaderNav
        profile={data.profile}
        isLive={isLive}
        isLoading={isLoading}
        onRefresh={() => loadPortfolioData(username, apiKey)}
        onOpenConfig={() => setConfigModalOpen(true)}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      {/* Soft Notice Banner if connection failed */}
      {error && !isLoading && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full mb-6">
          <div className="glass-panel rounded-2xl p-3.5 border border-amber-500/30 bg-amber-950/20 text-amber-300 text-xs flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => loadPortfolioData(username, apiKey)}
              className="px-3 py-1 rounded-xl glass-button text-white text-xs shrink-0 flex items-center gap-1.5 hover:bg-white/10"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* 1. Hero Section with Cover Backdrop */}
            <HeroSection
              profile={data.profile}
              projectCount={data.projects?.length || 0}
              postCount={data.posts?.length || 0}
              onNavigateToAbout={() => handleSelectSection('about')}
              onNavigateToProjects={() => handleSelectSection('projects')}
              onNavigateToContact={() => handleSelectSection('contact')}
            />

            {/* 2. About Section with Profile Picture */}
            <AboutSection
              profile={data.profile}
              selectedSkill={selectedSkill}
              onSelectSkill={(skill) => {
                setSelectedSkill(skill);
                if (skill) {
                  handleSelectSection('projects');
                }
              }}
              onNavigateToProjects={() => handleSelectSection('projects')}
              onNavigateToContact={() => handleSelectSection('contact')}
            />

            {/* 3. Projects Grid Section */}
            <ProjectsSection
              projects={data.projects || []}
              selectedSkill={selectedSkill}
              onClearFilter={() => setSelectedSkill(null)}
              onOpenProjectModal={(proj) => setSelectedProject(proj)}
            />

            {/* 4. Posts / Activity Feed Section */}
            <PostsSection
              posts={data.posts || []}
              authorName={data.profile?.display_name || 'Fanuel DX'}
              authorHandle={data.profile?.username || 'fanueldx25'}
              authorAvatar={data.profile?.avatar_url}
              onOpenImageModal={(url, caption) => setSelectedImage({ url, caption })}
            />

            {/* 5. Contact / Let's Connect Section */}
            <ContactSection profile={data.profile} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer profile={data.profile} />

      {/* Modals & Dialogs */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ImageModal
        imageUrl={selectedImage?.url || null}
        caption={selectedImage?.caption}
        onClose={() => setSelectedImage(null)}
      />

      <ConfigModal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
        currentUsername={username}
        currentApiKey={apiKey}
        onApply={handleApplyConfig}
        isLive={isLive}
        lastError={error}
      />
    </div>
  );
}
