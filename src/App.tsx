import { useState, useCallback } from 'react';
import PixelBackground from '@/components/PixelBackground';
import IntroOverlay from '@/components/IntroOverlay';
import LandingContent from '@/components/LandingContent';

function App() {
  const [entered, setEntered] = useState(false);

  const handleEnter = useCallback(() => {
    setEntered(true);
  }, []);

  const handleShop = useCallback(() => {
    window.open('https://shinkai.fun', '_blank', 'noopener,noreferrer');
  }, []);

  const handleTelegram = useCallback(() => {
    window.open('https://t.me/Shinnstudio30', '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1a1410]">
      <PixelBackground />
      {!entered && <IntroOverlay onEnter={handleEnter} />}
      {entered && (
        <LandingContent onEnterShop={handleShop} onEnterTelegram={handleTelegram} />
      )}
    </div>
  );
}

export default App;
