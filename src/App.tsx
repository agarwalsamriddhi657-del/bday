import React, { useState, useEffect } from 'react';
import { Cake, Calendar, Clock, Gift, PartyPopper, Sparkles, Heart, Users, ChefHat, Plus, Minus, Palette } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CakeConfig {
  layers: number;
  flavor: string;
  frosting: string;
  decorations: string[];
  candles: number;
}

interface Theme {
  name: string;
  background: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  glowColor: string;
  particles: string;
}

function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);
  const [hugMessage, setHugMessage] = useState('');
  const [isHugging, setIsHugging] = useState(false);
  const [hugCount, setHugCount] = useState(0);
  const [showCakeBuilder, setShowCakeBuilder] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [cake, setCake] = useState<CakeConfig>({
    layers: 2,
    flavor: 'chocolate',
    frosting: 'vanilla',
    decorations: ['sprinkles'],
    candles: 1
  });
  const [builtCake, setBuiltCake] = useState<CakeConfig | null>(null);
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number; timestamp: number }>>([]);

  const hugMessages = [
    "Sending you the biggest virtual hug! 🤗💕",
    "You're amazing and loved! Here's a warm hug 🫂✨",
    "Distance means nothing when hearts are connected 💝🤗",
    "A virtual hug filled with all my love for you! 🥰💖",
    "Wrapping you in warmth and happiness! 🌟🤗",
    "You deserve all the hugs in the world! 💕🫂",
    "Sending positive vibes and the coziest hug! ☀️🤗",
    "Here's a hug that travels across any distance! 🌍💝"
  ];

  const cakeFlavors = ['chocolate', 'vanilla', 'strawberry', 'red velvet', 'lemon'];
  const frostingTypes = ['vanilla', 'chocolate', 'cream cheese', 'strawberry', 'caramel'];
  const decorationOptions = ['sprinkles', 'roses', 'hearts', 'stars', 'cherries', 'berries'];

  const themes: { [key: string]: Theme } = {
    dawn: {
      name: 'Dawn Serenity',
      background: 'from-violet-900 via-fuchsia-800 to-rose-600',
      cardBg: 'bg-white/20',
      textPrimary: 'text-white',
      textSecondary: 'text-white/90',
      accent: 'from-rose-400 to-violet-500',
      glowColor: 'bg-fuchsia-500/20',
      particles: 'bg-rose-400/30'
    },
    morning: {
      name: 'Morning Bliss',
      background: 'from-sky-400 via-cyan-300 to-emerald-400',
      cardBg: 'bg-white/25',
      textPrimary: 'text-white',
      textSecondary: 'text-white/95',
      accent: 'from-amber-400 to-orange-500',
      glowColor: 'bg-cyan-400/25',
      particles: 'bg-amber-300/35'
    },
    afternoon: {
      name: 'Golden Hour',
      background: 'from-orange-500 via-amber-400 to-yellow-400',
      cardBg: 'bg-white/30',
      textPrimary: 'text-white',
      textSecondary: 'text-white/95',
      accent: 'from-red-500 to-pink-500',
      glowColor: 'bg-amber-400/30',
      particles: 'bg-yellow-400/40'
    },
    evening: {
      name: 'Sunset Dreams',
      background: 'from-purple-700 via-pink-600 to-orange-500',
      cardBg: 'bg-white/20',
      textPrimary: 'text-white',
      textSecondary: 'text-white/90',
      accent: 'from-pink-500 to-purple-500',
      glowColor: 'bg-pink-500/25',
      particles: 'bg-purple-400/35'
    },
    night: {
      name: 'Midnight Magic',
      background: 'from-slate-900 via-blue-900 to-indigo-800',
      cardBg: 'bg-white/15',
      textPrimary: 'text-white',
      textSecondary: 'text-white/85',
      accent: 'from-blue-500 to-indigo-600',
      glowColor: 'bg-blue-500/20',
      particles: 'bg-blue-400/30'
    },
    birthday: {
      name: 'Birthday Celebration',
      background: 'from-pink-600 via-purple-600 to-indigo-600',
      cardBg: 'bg-white/25',
      textPrimary: 'text-white',
      textSecondary: 'text-white/95',
      accent: 'from-yellow-500 to-pink-600',
      glowColor: 'bg-gradient-to-r from-pink-500/30 to-yellow-500/30',
      particles: 'bg-gradient-to-r from-pink-500 to-yellow-500'
    }
  };

  const getThemeByTime = () => {
    if (isBirthday) return themes.birthday;
    
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 9) return themes.dawn;
    if (hour >= 9 && hour < 12) return themes.morning;
    if (hour >= 12 && hour < 17) return themes.afternoon;
    if (hour >= 17 && hour < 21) return themes.evening;
    return themes.night;
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const currentYear = new Date().getFullYear();
      let targetDate = new Date(currentYear, 9, 12).getTime(); // October is month 9 (0-indexed)
      
      // If the birthday has passed this year, target next year
      if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 9, 12).getTime();
      }
      
      const difference = targetDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
        setIsBirthday(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsBirthday(true);
      }
      
      // Update theme based on current time
      setCurrentTheme(getThemeByTime());
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    // Update theme every minute
    const themeTimer = setInterval(() => {
      setCurrentTheme(getThemeByTime());
    }, 60000);

    return () => {
      clearInterval(timer);
      clearInterval(themeTimer);
    };
  }, []);

  const sendVirtualHug = () => {
    setIsHugging(true);
    setHugCount(prev => prev + 1);
    const randomMessage = hugMessages[Math.floor(Math.random() * hugMessages.length)];
    setHugMessage(randomMessage);
    
    setTimeout(() => {
      setIsHugging(false);
    }, 2000);
  };

  const buildCake = () => {
    setBuiltCake({ ...cake });
    setShowCakeBuilder(false);
  };

  const toggleDecoration = (decoration: string) => {
    setCake(prev => ({
      ...prev,
      decorations: prev.decorations.includes(decoration)
        ? prev.decorations.filter(d => d !== decoration)
        : [...prev.decorations, decoration]
    }));
  };

  const createFirework = (x: number, y: number) => {
    const firework = {
      id: Date.now() + Math.random(),
      x,
      y,
      timestamp: Date.now()
    };
    
    setFireworks(prev => [...prev, firework]);
    
    // Remove firework after animation completes
    setTimeout(() => {
      setFireworks(prev => prev.filter(f => f.id !== firework.id));
    }, 2000);
  };

  const handleScreenTouch = (e: React.MouseEvent | React.TouchEvent) => {
    let x, y;
    
    if ('touches' in e) {
      // Touch event
      if (e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        return;
      }
    } else {
      // Mouse event
      x = e.clientX;
      y = e.clientY;
    }
    
    createFirework(x, y);
  };

  if (!currentTheme) return null;

  const CountdownCard = ({ value, label, icon: Icon }: { value: number; label: string; icon: any }) => (
    <div className={`group relative ${currentTheme.cardBg} backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 border border-white/40 hover:border-white/60`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className={`absolute inset-0 ${currentTheme.glowColor} rounded-3xl blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-300`} />
      <div className="relative z-10">
        <Icon className={`w-8 h-8 ${currentTheme.textSecondary} mx-auto mb-4`} />
        <div className="text-5xl font-bold text-white mb-2 font-mono tracking-tight drop-shadow-lg">
          {value.toString().padStart(2, '0')}
        </div>
        <div className={`${currentTheme.textSecondary} text-lg font-semibold capitalize tracking-wide drop-shadow-md`}>
          {label}
        </div>
      </div>
    </div>
  );

  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-3 h-3 ${currentTheme.particles} rounded-full animate-bounce shadow-lg`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  const PartyBalloons = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Large balloons */}
      {[...Array(12)].map((_, i) => {
        const colors = ['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400', 'bg-orange-400', 'bg-cyan-400', 'bg-emerald-400', 'bg-violet-400', 'bg-rose-400', 'bg-amber-400'];
        const color = colors[i % colors.length];
        const size = 60 + Math.random() * 40; // 60-100px
        const startX = Math.random() * 120 - 10; // -10% to 110% (off-screen start)
        const endX = Math.random() * 120 - 10; // -10% to 110% (off-screen end)
        const startY = 100 + Math.random() * 20; // Start below screen
        const midY = 20 + Math.random() * 60; // Middle height varies
        const endY = -20 - Math.random() * 20; // End above screen
        const animationDuration = 20 + Math.random() * 15; // 20-35s
        const animationDelay = Math.random() * 20; // 0-20s delay
        
        // Add some special balloon shapes
        const isHeartBalloon = Math.random() < 0.2; // 20% chance
        const isStarBalloon = Math.random() < 0.15; // 15% chance
        
        return (
          <div
            key={`large-${i}`}
            className="absolute animate-bounce"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
              animationDuration: `${animationDuration}s`,
              animationDelay: `${animationDelay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              transform: `translateY(-100vh)`,
            }}
          >
            {/* Balloon with special shapes */}
            {isHeartBalloon ? (
              <div className="relative">
                {/* Heart balloon */}
                <div 
                  className="shadow-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                  style={{ 
                    width: `${size}px`, 
                    height: `${size * 0.9}px`,
                    background: '#ef4444',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    transform: 'rotate(-45deg)'
                  }}
                />
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold">💖</div>
              </div>
            ) : isStarBalloon ? (
              <div className="relative">
                {/* Star balloon */}
                <div 
                  className="shadow-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                  style={{ 
                    width: `${size}px`, 
                    height: `${size}px`,
                    background: '#facc15',
                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                  }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">⭐</div>
              </div>
            ) : (
              <div className="relative">
                {/* Regular balloon */}
                <div 
                  className={`${color} rounded-full shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300`}
                  style={{ 
                    width: `${size}px`, 
                    height: `${size * 1.2}px`,
                  }}
                />
                {/* Add festive text on some balloons */}
                {Math.random() < 0.3 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">
                    {['🎉', '🎂', '🎈', '✨', '🎊', '🥳'][Math.floor(Math.random() * 6)]}
                  </div>
                )}
              </div>
            )}
            {/* String */}
            <div 
              className="w-0.5 bg-gray-600 mx-auto opacity-60 origin-top"
              style={{ height: `${size * 0.8}px` }}
            />
          </div>
        );
      })}
      
      {/* Small balloons */}
      {[...Array(18)].map((_, i) => {
        const colors = ['bg-red-300', 'bg-blue-300', 'bg-yellow-300', 'bg-green-300', 'bg-purple-300', 'bg-pink-300', 'bg-orange-300', 'bg-cyan-300', 'bg-emerald-300', 'bg-violet-300'];
        const color = colors[i % colors.length];
        const size = 30 + Math.random() * 20; // 30-50px
        const startX = Math.random() * 120 - 10; // -10% to 110%
        const endX = Math.random() * 120 - 10;
        const startY = 100 + Math.random() * 10;
        const midY = 30 + Math.random() * 40;
        const endY = -10 - Math.random() * 10;
        const animationDuration = 25 + Math.random() * 20; // 25-45s
        const animationDelay = Math.random() * 25; // 0-25s delay
        
        return (
          <div
            key={`small-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${startX}%`,
              top: '80%',
              animationDuration: `${animationDuration}s`,
              animationDelay: `${animationDelay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              transform: `translateY(-120vh)`,
            }}
          >
            {/* Small balloon with occasional emoji */}
            <div className="relative">
              <div 
                className={`${color} rounded-full shadow-md opacity-80 hover:opacity-90 transition-opacity duration-300`}
                style={{ 
                  width: `${size}px`, 
                  height: `${size * 1.2}px`,
                }}
              />
              {/* Add small emoji on some balloons */}
              {Math.random() < 0.25 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">
                  {['🎈', '💫', '🌟', '💖'][Math.floor(Math.random() * 4)]}
                </div>
              )}
            </div>
            {/* String */}
            <div 
              className="w-0.5 bg-gray-500 mx-auto opacity-50 origin-top"
              style={{ height: `${size * 0.6}px` }}
            />
          </div>
        );
      })}
      
      {/* Floating birthday banners */}
      {[...Array(3)].map((_, i) => {
        const startX = Math.random() * 100;
        const endX = Math.random() * 100;
        const startY = 100 + Math.random() * 10;
        const endY = -10 - Math.random() * 10;
        const animationDuration = 30 + Math.random() * 20; // 30-50s
        const animationDelay = Math.random() * 30; // 0-30s delay
        
        return (
          <div
            key={`banner-${i}`}
            className="absolute animate-bounce"
            style={{
              left: `${startX}%`,
              top: '90%',
              animationDuration: `${animationDuration}s`,
              animationDelay: `${animationDelay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              transform: `translateY(-110vh)`,
            }}
          >
            {/* Birthday banner */}
            <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold opacity-80 hover:opacity-100 transition-opacity duration-300">
              {['🎂 Happy Birthday! 🎂', '🎉 Celebrate! 🎉', '🎈 Party Time! 🎈'][i]}
            </div>
          </div>
        );
      })}
    </div>
  );
  const CakeLayer = ({ flavor, size, frosting }: { flavor: string; size: string; frosting: string }) => {
    const flavorColors = {
      chocolate: 'from-amber-800 to-amber-900',
      vanilla: 'from-yellow-100 to-yellow-200',
      strawberry: 'from-pink-200 to-pink-300',
      'red velvet': 'from-red-400 to-red-500',
      lemon: 'from-yellow-200 to-yellow-300'
    };

    const frostingColors = {
      vanilla: 'from-yellow-50 to-yellow-100',
      chocolate: 'from-amber-600 to-amber-700',
      'cream cheese': 'from-orange-50 to-orange-100',
      strawberry: 'from-pink-100 to-pink-200',
      caramel: 'from-orange-200 to-orange-300'
    };

    return (
      <div className="relative">
        {/* Frosting */}
        <div className={`${size} h-4 bg-gradient-to-r ${frostingColors[frosting as keyof typeof frostingColors]} rounded-t-lg border-2 border-white/30`} />
        {/* Cake Layer */}
        <div className={`${size} h-12 bg-gradient-to-r ${flavorColors[flavor as keyof typeof flavorColors]} border-2 border-white/30`} />
      </div>
    );
  };

  const VirtualCake = ({ config }: { config: CakeConfig }) => (
    <div className="flex flex-col items-center">
      {/* Candles */}
      <div className="flex space-x-2 mb-2">
        {[...Array(config.candles)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse" />
            <div className="w-1 h-6 bg-yellow-200" />
          </div>
        ))}
      </div>
      
      {/* Cake Layers */}
      <div className="flex flex-col-reverse items-center">
        {[...Array(config.layers)].map((_, i) => (
          <CakeLayer
            key={i}
            flavor={config.flavor}
            frosting={config.frosting}
            size={i === 0 ? 'w-32' : i === 1 ? 'w-28' : 'w-24'}
          />
        ))}
      </div>
      
      {/* Decorations */}
      <div className="flex flex-wrap justify-center mt-2 space-x-1">
        {config.decorations.map((decoration, i) => (
          <span key={i} className="text-lg">
            {decoration === 'sprinkles' && '🌈'}
            {decoration === 'roses' && '🌹'}
            {decoration === 'hearts' && '💖'}
            {decoration === 'stars' && '⭐'}
            {decoration === 'cherries' && '🍒'}
            {decoration === 'berries' && '🫐'}
          </span>
        ))}
      </div>
    </div>
  );

  const CakeBuilder = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/30">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <ChefHat className="w-6 h-6 mr-2 text-purple-600" />
            Cake Builder
          </h3>
          <button
            onClick={() => setShowCakeBuilder(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Layers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Layers</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCake(prev => ({ ...prev, layers: Math.max(1, prev.layers - 1) }))}
                className="p-2 bg-purple-100 hover:bg-purple-200 rounded-full transition-colors"
              >
                <Minus className="w-4 h-4 text-purple-600" />
              </button>
              <span className="text-lg font-semibold text-gray-800 w-8 text-center">{cake.layers}</span>
              <button
                onClick={() => setCake(prev => ({ ...prev, layers: Math.min(4, prev.layers + 1) }))}
                className="p-2 bg-purple-100 hover:bg-purple-200 rounded-full transition-colors"
              >
                <Plus className="w-4 h-4 text-purple-600" />
              </button>
            </div>
          </div>

          {/* Flavor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Flavor</label>
            <select
              value={cake.flavor}
              onChange={(e) => setCake(prev => ({ ...prev, flavor: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {cakeFlavors.map(flavor => (
                <option key={flavor} value={flavor}>{flavor.charAt(0).toUpperCase() + flavor.slice(1)}</option>
              ))}
            </select>
          </div>

          {/* Frosting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frosting</label>
            <select
              value={cake.frosting}
              onChange={(e) => setCake(prev => ({ ...prev, frosting: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {frostingTypes.map(frosting => (
                <option key={frosting} value={frosting}>{frosting.charAt(0).toUpperCase() + frosting.slice(1)}</option>
              ))}
            </select>
          </div>

          {/* Decorations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Decorations</label>
            <div className="grid grid-cols-3 gap-2">
              {decorationOptions.map(decoration => (
                <button
                  key={decoration}
                  onClick={() => toggleDecoration(decoration)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    cake.decorations.includes(decoration)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 text-gray-600'
                  }`}
                >
                  <div className="text-lg mb-1">
                    {decoration === 'sprinkles' && '🌈'}
                    {decoration === 'roses' && '🌹'}
                    {decoration === 'hearts' && '💖'}
                    {decoration === 'stars' && '⭐'}
                    {decoration === 'cherries' && '🍒'}
                    {decoration === 'berries' && '🫐'}
                  </div>
                  <div className="text-xs capitalize">{decoration}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Candles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Candles</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCake(prev => ({ ...prev, candles: Math.max(1, prev.candles - 1) }))}
                className="p-2 bg-purple-100 hover:bg-purple-200 rounded-full transition-colors"
              >
                <Minus className="w-4 h-4 text-purple-600" />
              </button>
              <span className="text-lg font-semibold text-gray-800 w-8 text-center">{cake.candles}</span>
              <button
                onClick={() => setCake(prev => ({ ...prev, candles: Math.min(10, prev.candles + 1) }))}
                className="p-2 bg-purple-100 hover:bg-purple-200 rounded-full transition-colors"
              >
                <Plus className="w-4 h-4 text-purple-600" />
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Preview</h4>
            <div className="flex justify-center">
              <VirtualCake config={cake} />
            </div>
          </div>

          {/* Build Button */}
          <button
            onClick={buildCake}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            🎂 Build This Cake for Krishna! 🎂
          </button>
        </div>
      </div>
    </div>
  );

  const FireworkEffect = ({ firework }: { firework: { id: number; x: number; y: number; timestamp: number } }) => (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: firework.x,
        top: firework.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Central burst */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          const distance = 80 + Math.random() * 40;
          const color = ['text-red-400', 'text-blue-400', 'text-yellow-400', 'text-green-400', 'text-purple-400', 'text-pink-400'][Math.floor(Math.random() * 6)];
          
          return (
            <div
              key={i}
              className={`absolute w-2 h-2 ${color.replace('text-', 'bg-')} rounded-full animate-ping`}
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%)`,
                animation: `firework-particle-${i} 1.5s ease-out forwards`,
              }}
            >
              <style>
                {`
                  @keyframes firework-particle-${i} {
                    0% {
                      transform: translate(-50%, -50%) scale(0);
                      opacity: 1;
                    }
                    50% {
                      transform: translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1);
                      opacity: 0.8;
                    }
                    100% {
                      transform: translate(calc(-50% + ${Math.cos(angle) * distance * 1.5}px), calc(-50% + ${Math.sin(angle) * distance * 1.5}px)) scale(0);
                      opacity: 0;
                    }
                  }
                `}
              </style>
            </div>
          );
        })}
      </div>
      
      {/* Secondary sparkles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 + 22.5) * (Math.PI / 180);
          const distance = 50 + Math.random() * 30;
          const color = ['text-orange-400', 'text-cyan-400', 'text-lime-400', 'text-rose-400'][Math.floor(Math.random() * 4)];
          
          return (
            <div
              key={`sparkle-${i}`}
              className={`absolute w-1 h-1 ${color.replace('text-', 'bg-')} rounded-full`}
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%)`,
                animation: `firework-sparkle-${i} 2s ease-out forwards`,
              }}
            >
              <style>
                {`
                  @keyframes firework-sparkle-${i} {
                    0% {
                      transform: translate(-50%, -50%) scale(0);
                      opacity: 0;
                    }
                    20% {
                      opacity: 1;
                    }
                    60% {
                      transform: translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1);
                      opacity: 0.6;
                    }
                    100% {
                      transform: translate(calc(-50% + ${Math.cos(angle) * distance * 1.2}px), calc(-50% + ${Math.sin(angle) * distance * 1.2}px)) scale(0);
                      opacity: 0;
                    }
                  }
                `}
              </style>
            </div>
          );
        })}
      </div>
      
      {/* Central flash */}
      <div 
        className={`absolute w-8 h-8 bg-white rounded-full opacity-90`}
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'firework-flash 0.3s ease-out forwards'
        }}
      >
        <style>
          {`
            @keyframes firework-flash {
              0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
              }
              50% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.8;
              }
              100% {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
              }
            }
          `}
        </style>
      </div>
    </div>
  );

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br ${currentTheme.background} relative overflow-hidden transition-all duration-1000`}
      onClick={handleScreenTouch}
      onTouchStart={handleScreenTouch}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-20 w-40 h-40 ${currentTheme.glowColor} rounded-full blur-2xl animate-pulse`} />
        <div className={`absolute top-40 right-32 w-32 h-32 ${currentTheme.glowColor} rounded-full blur-2xl animate-pulse delay-1000`} />
        <div className={`absolute bottom-32 left-1/3 w-48 h-48 ${currentTheme.glowColor} rounded-full blur-3xl animate-pulse delay-2000`} />
        <div className={`absolute bottom-20 right-20 w-36 h-36 ${currentTheme.glowColor} rounded-full blur-2xl animate-pulse delay-3000`} />
        {/* Additional floating elements */}
        <div className={`absolute top-1/2 left-10 w-20 h-20 ${currentTheme.glowColor} rounded-full blur-xl animate-bounce delay-500`} />
        <div className={`absolute top-1/4 right-1/4 w-24 h-24 ${currentTheme.glowColor} rounded-full blur-xl animate-bounce delay-1500`} />
      </div>

      {/* Party Balloons */}
      <PartyBalloons />

      {/* Fireworks */}
      {fireworks.map(firework => (
        <FireworkEffect key={firework.id} firework={firework} />
      ))}

      {isBirthday && <Confetti />}
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Theme Indicator */}
        <div className="absolute top-8 right-8">
          <div className={`${currentTheme.cardBg} backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
            <div className="flex items-center space-x-2">
              <Palette className={`w-4 h-4 ${currentTheme.textSecondary}`} />
              <span className={`text-sm font-semibold ${currentTheme.textSecondary} drop-shadow-sm`}>
                {currentTheme.name}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Cake className={`w-16 h-16 ${currentTheme.textSecondary} mr-4`} />
            <Sparkles className={`w-12 h-12 ${currentTheme.textSecondary}`} />
          </div>
          
          <h1 className={`text-6xl md:text-7xl font-bold ${currentTheme.textPrimary} mb-4 tracking-tight drop-shadow-2xl`}>
            {isBirthday ? (
              <span className={`bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent animate-pulse drop-shadow-none`}>
                🎉 Happy Birthday! 🎉
              </span>
            ) : (
              <span className={`bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent drop-shadow-none`}>
                Birthday Countdown
              </span>
            )}
          </h1>
          
          <div className={`flex items-center justify-center ${currentTheme.textSecondary} text-xl mb-2`}>
            <Calendar className="w-6 h-6 mr-2" />
            <span>October 12th</span>
          </div>
          
          {!isBirthday && (
            <p className={`${currentTheme.textSecondary} text-lg opacity-80`}>
              The big day is almost here!
            </p>
          )}
        </div>

        {!isBirthday ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full">
            <CountdownCard value={timeLeft.days} label="days" icon={Calendar} />
            <CountdownCard value={timeLeft.hours} label="hours" icon={Clock} />
            <CountdownCard value={timeLeft.minutes} label="minutes" icon={Clock} />
            <CountdownCard value={timeLeft.seconds} label="seconds" icon={Clock} />
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center items-center space-x-8 mb-8">
              <PartyPopper className={`w-20 h-20 ${currentTheme.textSecondary} animate-bounce`} />
              <Gift className={`w-20 h-20 ${currentTheme.textSecondary} animate-bounce delay-200`} />
              <Cake className={`w-20 h-20 ${currentTheme.textSecondary} animate-bounce delay-400`} />
            </div>
            <p className={`${currentTheme.textPrimary} text-2xl md:text-3xl font-medium`}>
              Hope your special day is amazing! 🎂✨
            </p>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className={`inline-flex items-center px-8 py-4 ${currentTheme.cardBg} backdrop-blur-md rounded-full border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
            <Sparkles className={`w-5 h-5 ${currentTheme.textSecondary} mr-2`} />
            <span className={`${currentTheme.textSecondary} font-semibold drop-shadow-sm`}>
              {isBirthday ? "🎊 Celebration Mode Active 🎊" : "Excitement Level: Maximum"}
            </span>
          </div>
        </div>

        {/* Virtual Hugger Section */}
        <div className="mt-12 text-center">
          {hugCount > 0 && (
            <div className={`mb-4 inline-flex items-center px-6 py-3 ${currentTheme.cardBg} backdrop-blur-md rounded-full border border-white/30 shadow-lg animate-pulse`}>
              <Heart className={`w-4 h-4 ${currentTheme.textSecondary} mr-2`} />
              <span className={`text-sm font-semibold ${currentTheme.textSecondary} drop-shadow-sm`}>
                {hugCount} hug{hugCount !== 1 ? 's' : ''} shared 💕
              </span>
            </div>
          )}
          
          <button
            onClick={sendVirtualHug}
            disabled={isHugging}
            className={`group relative inline-flex items-center px-10 py-5 bg-gradient-to-r ${currentTheme.accent} hover:opacity-90 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transform transition-all duration-300 ${
              isHugging ? 'scale-115 animate-bounce' : 'hover:scale-110'
            } disabled:cursor-not-allowed`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center">
              {isHugging ? (
                <>
                  <Heart className="w-7 h-7 mr-3 animate-bounce text-red-200" />
                  <span>Hugging... 🤗</span>
                  <Heart className="w-7 h-7 ml-3 animate-bounce text-red-200" />
                </>
              ) : (
                <>
                  <Users className="w-7 h-7 mr-3" />
                  <span>Send Virtual Hug</span>
                  <Heart className="w-7 h-7 ml-3" />
                </>
              )}
            </div>
          </button>

          {hugMessage && (
            <div className={`mt-6 p-8 ${currentTheme.cardBg} backdrop-blur-md rounded-3xl border border-white/30 max-w-md mx-auto transition-all duration-500 shadow-2xl ${
              hugMessage ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
            }`}>
              <div className="flex items-center justify-center mb-3">
                <Heart className={`w-10 h-10 ${currentTheme.textSecondary} animate-pulse drop-shadow-lg`} />
              </div>
              <p className={`${currentTheme.textPrimary} text-xl font-semibold leading-relaxed drop-shadow-md`}>
                {hugMessage}
              </p>
            </div>
          )}
        </div>

        {/* Virtual Cake Builder Section */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowCakeBuilder(true)}
            className={`group relative inline-flex items-center px-10 py-5 bg-gradient-to-r ${currentTheme.accent} hover:opacity-90 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center">
              <ChefHat className="w-7 h-7 mr-3" />
              <span>Build Virtual Cake</span>
              <Cake className="w-7 h-7 ml-3" />
            </div>
          </button>

          {builtCake && (
            <div className={`mt-8 p-8 ${currentTheme.cardBg} backdrop-blur-md rounded-3xl border border-white/30 max-w-sm mx-auto shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105`}>
              <h4 className={`${currentTheme.textPrimary} text-2xl font-bold mb-6 drop-shadow-lg`}>🎂 Your Cake for Krishna! 🎂</h4>
              <VirtualCake config={builtCake} />
              <p className={`${currentTheme.textSecondary} text-base font-medium mt-6 drop-shadow-sm`}>
                A beautiful {builtCake.layers}-layer {builtCake.flavor} cake with {builtCake.frosting} frosting!
              </p>
            </div>
          )}
        </div>

        {showCakeBuilder && <CakeBuilder />}
      </div>
    </div>
  );
}

export default App;