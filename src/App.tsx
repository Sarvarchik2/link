import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { AboutSection } from './components/AboutSection';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { SystemHUD } from './components/SystemHUD';
import { SystemIntro } from './components/SystemIntro';
import { ScanLines } from './components/ScanLines';
import { FilmGrain } from './components/FilmGrain';
import { DigitalRain } from './components/DigitalRain';
import { AmbientSound } from './components/AmbientSound';
import { BackgroundGrid } from './components/BackgroundGrid';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setContentReady(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* System Initialization Intro */}
      {showIntro && <SystemIntro onComplete={handleIntroComplete} />}

      {contentReady && (
        <>
          {/* Ambient sound */}
          <AmbientSound />

          {/* Background grid */}
          <BackgroundGrid />

          {/* Digital rain background */}
          <DigitalRain />

          {/* Film grain effect */}
          <FilmGrain />

          {/* Scan lines */}
          <ScanLines />

          {/* System HUD */}
          <SystemHUD />

          {/* Custom cursor for desktop */}
          <div className="hidden md:block">
            <CustomCursor />
          </div>

          {/* Navigation */}
          <Navigation />

          {/* Main content */}
          <main>
            <div id="home">
              <HeroSection />
            </div>
            
            <ServicesSection />
            <PortfolioSection />
            <AboutSection />
            <TeamSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}