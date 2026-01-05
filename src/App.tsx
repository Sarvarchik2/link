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
import { SEO } from './components/SEO';
import HandControlHUD from './components/HandControlHUD';
import HandCursor from './components/HandCursor';
import ScrollIndicator from './components/ScrollIndicator';
import ScrollControl from './components/ScrollControl';
import { useHandControl } from './hooks/useHandControl';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const { isActive, leftHand, rightHand, toggle, canvasRef, scrollDelta } = useHandControl();

  const handleIntroComplete = () => {
    setShowIntro(false);
    setContentReady(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <SEO />
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
              <HeroSection onToggleHandControl={toggle} />
            </div>

            <ServicesSection />
            <PortfolioSection />
            <AboutSection />
            <TeamSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Hand Control Components */}
          <HandControlHUD isActive={isActive} leftHand={leftHand} rightHand={rightHand} canvasRef={canvasRef} />
          <ScrollIndicator scrollDelta={scrollDelta} isActive={isActive} />
          <ScrollControl
            isActive={isActive}
            isPinching={rightHand?.isPinching || false}
            cursorX={rightHand ? rightHand.x * window.innerWidth : 0}
            cursorY={rightHand ? rightHand.y * window.innerHeight : 0}
          />
          {isActive && (
            <>
              {/* Only left hand shows cursor - right hand is for scrolling */}
              {leftHand && <HandCursor hand={leftHand} color="#FF006E" />}
            </>
          )}
        </>
      )}
    </div>
  );
}