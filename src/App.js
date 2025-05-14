import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import deadrising3 from './assets/game-list/game-cover/Dead-Rising-3-Apocalypse-Edition.jpg';
import forzahorizon5 from './assets/game-list/game-cover/Forza-Horizon-5.jpg';
import halo5 from './assets/game-list/game-cover/Halo-5-Guardians.jpg';
import grandtheftautov from './assets/game-list/game-cover/Grand-Theft-Auto-V.jpg';
import darksouls3 from './assets/game-list/game-cover/Dark-Souls-III-Deluxe-Edition.jpg';
import minecraft from './assets/game-list/game-cover/Minecraft.jpg';
import kingdomhearts2 from './assets/game-list/game-cover/Kingdom-Hearts-II.jpg';
import thewitcher3 from './assets/game-list/game-cover/The-Witcher-3-Complete-Edition.jpg';
import paladins from './assets/game-list/game-cover/Paladins.jpg';

import bgDeadrising3 from './assets/game-list/game-background/Dead-Rising-3-Apocalypse-Edition.jpg';
import bgForzahorizon5 from './assets/game-list/game-background/Forza-Horizon-5.jpg';
import bgHalo5 from './assets/game-list/game-background/Halo-5-Guardians.jpg';
import bgGTA5 from './assets/game-list/game-background/Grand-Theft-Auto-V.jpg';
import bgDarkSouls3 from './assets/game-list/game-background/Dark-Souls-III-Deluxe-Edition.jpg';
import bgMinecraft from './assets/game-list/game-background/Minecraft.jpg';
import bgKingdomHearts2 from './assets/game-list/game-background/Kingdom-Hearts-II.jpg';
import bgTheWitcher3 from './assets/game-list/game-background/The-Witcher-3-Complete-Edition.jpg';
import bgPaladins from './assets/game-list/game-background/Paladins.jpg';

import rect1 from './assets/Browse-Your-Games.jpg';
import rect2 from './assets/Game-Pass.jpg';
import rect3 from './assets/Spotify.jpg';
import rect4 from './assets/Xbox-Live.jpg';

import defaultBackgroundVideo from './assets/Animated-Background/PlayStation 5 - Menu Background with particles.mp4';

import userProfile from './assets/Profile-Pic/Pedrinho.jpg';
import userLogo from './assets/Icons/logo ultimate.png';

import icon1 from './assets/Icons/icon1.png';
import icon2 from './assets/Icons/icon2.png';
import icon3 from './assets/Icons/icon3.png';
import icon4 from './assets/Icons/icon4.png';
import icon5 from './assets/Icons/icon5.png';
import icon6 from './assets/Icons/icon charging.png';
import icon7 from './assets/Icons/microfone2.png';

import clickSound from './assets/Sounds/PS2 Select Sound(2).mp3';

const games = [
  { id: 1, name: 'Dead Rising 3: Apocalypse Edition', image: deadrising3, background: bgDeadrising3 },
  { id: 2, name: 'Forza Horizon 5', image: forzahorizon5, background: bgForzahorizon5 },
  { id: 3, name: 'Halo 5: Guardians', image: halo5, background: bgHalo5 },
  { id: 4, name: 'Grand Theft Auto V', image: grandtheftautov, background: bgGTA5 },
  { id: 5, name: 'Dark Souls III: Deluxe Edition', image: darksouls3, background: bgDarkSouls3 },
  { id: 6, name: 'Minecraft: Xbox One Edition', image: minecraft, background: bgMinecraft },
  { id: 7, name: 'Kingdom Hearts II', image: kingdomhearts2, background: bgKingdomHearts2 },
  { id: 8, name: 'The Witcher III: Complete Edition', image: thewitcher3, background: bgTheWitcher3 },
  { id: 9, name: 'Paladins', image: paladins, background: bgPaladins },
];

const rectangles = [
  { id: 101, name: 'Browse your games', image: rect1, background: rect1 },
  { id: 102, name: 'Get free access to several games', image: rect2, background: rect2 },
  { id: 103, name: 'Choose your audio while gaming', image: rect3, background: rect3 },
  { id: 104, name: 'Play online with your friends', image: rect4, background: rect4 },
];

function App() {
  const [clickedId, setClickedId] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());
  const gridRef = useRef(null);

  const clickAudioRef = useRef(new Audio(clickSound));

  const allItems = [...games, ...rectangles];

  const handleItemClick = (id) => {
    setClickedId(id);
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClickOutside = (event) => {
    if (gridRef.current && !gridRef.current.contains(event.target)) {
      setClickedId(null);
    }
  };

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const selectedItem = allItems.find((item) => item.id === clickedId);

  return (
    <div
      className="background-wrapper"
      style={{
        backgroundImage: selectedItem ? `url(${selectedItem.background})` : 'none',
      }}
    >
      {!selectedItem && (
        <video className="background-video" autoPlay muted loop playsInline>
          <source src={defaultBackgroundVideo} type="video/mp4" />
        </video>
      )}

      <div className="user-header">
        <img src={userProfile} alt="User Profile" className="user-profile" />
        <span className="user-name">Pedrinhoシ 8-bit</span>
        <img src={userLogo} alt="User Logo" className="user-logo" />
      </div>

      <div className="top-icons">
        <img src={icon1} alt="Icon 1" />
        <img src={icon2} alt="Icon 2" />
        <img src={icon3} alt="Icon 3" />
        <img src={icon4} alt="Icon 4" />
        <img src={icon5} alt="Icon 5" />
      </div>

      <div className="clock-container">
        <div className="clock-icons">
          <img src={icon6} alt="Clock Icon 1" />
          <img src={icon7} alt="Clock Icon 2" />
        </div>
        <div className="clock-text">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div
        className="custom-cursor"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`
        }}
      />

      <div className="container">
        <div className="game-grid" ref={gridRef}>
          {games.map((game) => (
            <div
              className={`game-card ${clickedId === game.id ? 'selected' : ''}`}
              key={game.id}
              onClick={() => handleItemClick(game.id)}
            >
              <img src={game.image} alt={game.name} />
              {clickedId === game.id && <p>{game.name}</p>}
            </div>
          ))}
        </div>

        <div className="rectangle-row">
          {rectangles.map((rect) => (
            <div
              className={`rectangle-card ${clickedId === rect.id ? 'selected' : ''}`}
              key={rect.id}
              onClick={() => handleItemClick(rect.id)}
              style={{ backgroundImage: `url(${rect.image})` }}
            >
              <p>{rect.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
