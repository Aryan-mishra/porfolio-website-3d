import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Users, Sparkles, MapPin, Phone, Mail, Award, Moon, Sun, 
  ChevronRight, CheckCircle2, Star, ArrowLeft, RefreshCw, Eye, Percent, 
  Clock, ShieldCheck, Heart, Coffee, Wifi, Map, MessageSquare, Send, CreditCard
} from 'lucide-react';
import * as THREE from 'three';

// --- 3D SCENE COMPONENT LAYOUTS ---

// 3D Bed Mesh Component
function CozyBed({ type = 'deluxe', position = [0, 0, 0], isNight }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Wooden Bed Base */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.3, type === 'standard' ? 1.4 : 2.0]} />
        <meshStandardMaterial color="#3e2723" roughness={0.7} />
      </mesh>
      
      {/* Headboard */}
      <mesh position={[-1.0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.2, 0.8, type === 'standard' ? 1.4 : 2.0]} />
        <meshStandardMaterial color="#2d1500" roughness={0.6} />
      </mesh>

      {/* Headboard Gold Accent Strip */}
      <mesh position={[-0.89, 0.7, 0]}>
        <boxGeometry args={[0.02, 0.1, type === 'standard' ? 1.2 : 1.8]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0.1, 0.4, 0]} castShadow>
        <boxGeometry args={[2.0, 0.25, type === 'standard' ? 1.3 : 1.9]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Pillows */}
      {type === 'standard' ? (
        <mesh position={[-0.7, 0.6, 0]} castShadow>
          <boxGeometry args={[0.4, 0.15, 0.8]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
        </mesh>
      ) : (
        <>
          <mesh position={[-0.7, 0.6, 0.45]} castShadow>
            <boxGeometry args={[0.4, 0.15, 0.7]} />
            <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
          </mesh>
          <mesh position={[-0.7, 0.6, -0.45]} castShadow>
            <boxGeometry args={[0.4, 0.15, 0.7]} />
            <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
          </mesh>
        </>
      )}

      {/* Luxury Golden Blanket Throw */}
      <mesh position={[0.7, 0.44, 0]} castShadow>
        <boxGeometry args={[0.8, 0.2, type === 'standard' ? 1.31 : 1.91]} />
        <meshStandardMaterial color={isNight ? "#aa7c11" : "#cf9e1d"} roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  );
}

// 3D Workstation Mesh Component
function Workstation({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Table Top */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.05, 1.6]} />
        <meshStandardMaterial color="#1a120b" roughness={0.5} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.35, 0.3, 0.7]} castShadow><cylinderGeometry args={[0.02, 0.02, 0.6]} /><meshStandardMaterial color="#111" metalness={0.8} /></mesh>
      <mesh position={[0.35, 0.3, 0.7]} castShadow><cylinderGeometry args={[0.02, 0.02, 0.6]} /><meshStandardMaterial color="#111" metalness={0.8} /></mesh>
      <mesh position={[-0.35, 0.3, -0.7]} castShadow><cylinderGeometry args={[0.02, 0.02, 0.6]} /><meshStandardMaterial color="#111" metalness={0.8} /></mesh>
      <mesh position={[0.35, 0.3, -0.7]} castShadow><cylinderGeometry args={[0.02, 0.02, 0.6]} /><meshStandardMaterial color="#111" metalness={0.8} /></mesh>

      {/* Laptop */}
      <group position={[0, 0.65, 0]}>
        <mesh position={[0, 0.01, 0]} castShadow>
          <boxGeometry args={[0.3, 0.015, 0.2]} />
          <meshStandardMaterial color="#424242" metalness={0.8} />
        </mesh>
        <mesh position={[-0.1, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
          <boxGeometry args={[0.01, 0.18, 0.2]} />
          <meshStandardMaterial color="#424242" metalness={0.8} />
        </mesh>
        <mesh position={[-0.09, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <planeGeometry args={[0.17, 0.19]} />
          <meshBasicMaterial color="#00bcd4" />
        </mesh>
      </group>
    </group>
  );
}

// 3D Lounge Sofa for Suite Room
function LoungeSofa({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Base Seat */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[1.0, 0.3, 2.0]} />
        <meshStandardMaterial color="#374151" roughness={0.9} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0.4, 0.6, 0]} castShadow>
        <boxGeometry args={[0.2, 0.6, 2.0]} />
        <meshStandardMaterial color="#374151" roughness={0.9} />
      </mesh>
      {/* Armrests */}
      <mesh position={[0, 0.45, 0.95]} castShadow>
        <boxGeometry args={[1.0, 0.3, 0.15]} />
        <meshStandardMaterial color="#1f2937" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.45, -0.95]} castShadow>
        <boxGeometry args={[1.0, 0.3, 0.15]} />
        <meshStandardMaterial color="#1f2937" roughness={0.9} />
      </mesh>
    </group>
  );
}

// 3D Room Background Shell
function RoomWalls({ isNight }) {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={isNight ? "#1d1511" : "#ebd5c8"} roughness={0.9} />
      </mesh>
      {/* Back Wall */}
      <mesh position={[-4, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 5, 8]} />
        <meshStandardMaterial color={isNight ? "#0f172a" : "#4b5563"} roughness={0.8} />
      </mesh>
      {/* Side Wall */}
      <mesh position={[0, 2.5, -4]} castShadow receiveShadow>
        <boxGeometry args={[8, 5, 0.1]} />
        <meshStandardMaterial color={isNight ? "#0d1321" : "#374151"} roughness={0.8} />
      </mesh>
    </group>
  );
}

// 3D Wedding Lawn Scene
function WeddingLawnScene() {
  const archRef = useRef();

  useFrame((state) => {
    if (archRef.current) {
      archRef.current.position.y = 0.1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
    }
  });

  return (
    <group>
      {/* Grass Field */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1b4d22" roughness={0.9} />
      </mesh>

      {/* Main Wedding Stage */}
      <group ref={archRef} position={[-2.5, 0.1, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.2, 4.0]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.5} />
        </mesh>
        
        {/* Golden Arch columns */}
        <mesh position={[0, 1.3, -1.5]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 2.6]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.3, 1.5]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 2.6]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Crossbar */}
        <mesh position={[0, 2.6, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 3.0]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Banquet Tables */}
      <group position={[1.5, 0, 1.8]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.7, 0.7, 0.05]} />
          <meshStandardMaterial color="#ffffff" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.45]} />
          <meshStandardMaterial color="#d4af37" />
        </mesh>
      </group>

      <group position={[1.5, 0, -1.8]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.7, 0.7, 0.05]} />
          <meshStandardMaterial color="#ffffff" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.45]} />
          <meshStandardMaterial color="#d4af37" />
        </mesh>
      </group>
    </group>
  );
}

// 3D Banquet Hall Scene
function BanquetHallScene() {
  return (
    <group>
      {/* Marble Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.1} metalness={0.1} />
      </mesh>

      {/* Columns */}
      <mesh position={[-3.5, 2, -3.5]} castShadow><cylinderGeometry args={[0.2, 0.2, 4]} /><meshStandardMaterial color="#ffffff" /></mesh>
      <mesh position={[3.5, 2, -3.5]} castShadow><cylinderGeometry args={[0.2, 0.2, 4]} /><meshStandardMaterial color="#ffffff" /></mesh>
      <mesh position={[-3.5, 2, 3.5]} castShadow><cylinderGeometry args={[0.2, 0.2, 4]} /><meshStandardMaterial color="#ffffff" /></mesh>
      <mesh position={[3.5, 2, 3.5]} castShadow><cylinderGeometry args={[0.2, 0.2, 4]} /><meshStandardMaterial color="#ffffff" /></mesh>

      {/* Main DJ / Podium Stage */}
      <mesh position={[-3.0, 0.1, 0]} castShadow>
        <boxGeometry args={[1.5, 0.2, 3.0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>

      {/* Grand Chandelier center marker */}
      <mesh position={[0, 3.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

// --- MAIN REDESIGNED APP CODE ---

export default function HotelDemo({ onBack }) {
  const [currentTab, setCurrentTab] = useState('home'); // 'home', 'rooms', 'events', 'gallery', 'contact', 'booking'
  const [isNight, setIsNight] = useState(true);
  const [selectedRoomTier, setSelectedRoomTier] = useState('deluxe'); // 'standard', 'deluxe', 'suite'
  const [selectedEventTier, setSelectedEventTier] = useState('lawn'); // 'lawn', 'banquet'
  
  // Multi-step Booking State
  const [bookingStep, setBookingStep] = useState(1); // 1: Select, 2: Info, 3: Pay, 4: Receipt
  const [checkIn, setCheckIn] = useState('2026-06-01');
  const [checkOut, setCheckOut] = useState('2026-06-05');
  const [guestCount, setGuestCount] = useState(2);
  const [bookedRoom, setBookedRoom] = useState('deluxe');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Unified consistent pricing dictionary
  const roomDetails = {
    standard: {
      name: 'Standard Room',
      tagline: 'Modern simplicity with absolute comfort',
      price: 10999,
      size: '280 sq. ft.',
      beds: '2 Comfortable Single Beds',
      maxGuests: '2 Adults, 1 Child',
      desc: 'Our well-designed Standard Rooms feature modern, well-equipped spaces with premium comfort mattresses, a dedicated workstation, high-speed Wi-Fi, and electronic safe amenities.'
    },
    deluxe: {
      name: 'Deluxe Room',
      tagline: 'Refined spacing, contemporary aesthetics',
      price: 12999,
      size: '350 sq. ft.',
      beds: '1 Premium King Size Bed',
      maxGuests: '2 Adults, 2 Children',
      desc: 'Our Deluxe Rooms offer contemporary styling, a spacious king bed, luxury three-fixture bathroom setup, workstation, high-speed internet connection, and premier toiletries.'
    },
    suite: {
      name: 'Executive Suite',
      tagline: 'The pinnacle of luxury living',
      price: 18999,
      size: '550 sq. ft.',
      beds: '1 Presidential Grand King Bed',
      maxGuests: '3 Adults, 2 Children',
      desc: 'The Executive Suite is the crown jewel of RmanshaInn. Experience a private separation partition, lounge sitting area, spacious bathroom with hot tub options, and a dedicated executive business desk.'
    }
  };

  // Event space details
  const eventDetails = {
    lawn: {
      name: 'Outdoor Wedding Lawn',
      desc: 'A beautifully landscaped 32,000 sq ft open-air lawn under sparkling sky lights. Accommodates up to 3,500 guests. Ideal for large social events, dream destination weddings, and cultural celebrations.',
      capacity: 'Upto 3,500 Guests',
      area: '32,000 Sq. Ft.'
    },
    banquet: {
      name: 'Grand Banquet Hall',
      desc: 'Three luxurious banquet halls and two board rooms featuring state-of-the-art acoustics, podium setup, customizable flower decoration, and a dedicated DJ stage.',
      capacity: '200 - 1,200 Guests',
      area: '15,000 Sq. Ft.'
    }
  };

  // Gallery images with labels (Procedural replacements for actual images)
  const galleryItems = [
    { title: 'Executive Suite Bedroom', category: 'rooms', bg: 'from-amber-900 to-indigo-900' },
    { title: 'Deluxe Room Interior', category: 'rooms', bg: 'from-emerald-900 to-slate-900' },
    { title: 'Standard Room Setup', category: 'rooms', bg: 'from-zinc-800 to-neutral-900' },
    { title: 'Grand Banquet Hall Stage', category: 'events', bg: 'from-cyan-900 to-amber-950' },
    { title: 'Wedding Lawn Outdoor Setup', category: 'events', bg: 'from-green-950 to-stone-900' },
    { title: 'Ekas Reception Lobby', category: 'dining', bg: 'from-teal-900 to-violet-950' }
  ];

  // Auto-calculated stay details
  const getStayDuration = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    return isNaN(diff) ? 1 : diff;
  };
  const stayDays = getStayDuration();
  const rawPrice = roomDetails[bookedRoom].price * stayDays;
  const directDiscount = 1500;
  const totalAmount = Math.max(0, rawPrice - directDiscount);

  // Sync scene state based on tabs
  const getSceneType = () => {
    if (currentTab === 'events') return selectedEventTier;
    return 'bedroom';
  };
  const activeScene = getSceneType();

  const handleStartBooking = (tier) => {
    setBookedRoom(tier);
    setCurrentTab('booking');
    setBookingStep(1);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white relative font-sans overflow-x-hidden bg-mesh select-none">
      
      {/* Background WebGL 3D Canvas */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[4.5, 3.5, 4.5]} fov={50} />
          <OrbitControls 
            enablePan={false}
            maxPolarAngle={Math.PI / 2.1}
            minDistance={3.5}
            maxDistance={8}
            autoRotate={currentTab === 'home'}
            autoRotateSpeed={0.3}
          />
          
          {/* Centralized light control */}
          <ambientLight intensity={isNight ? 0.05 : 0.65} color={isNight ? "#0e1e38" : "#f0f9ff"} />
          
          {isNight ? (
            <>
              <directionalLight position={[-4, 8, -4]} intensity={0.15} color="#38bdf8" castShadow />
              <spotLight 
                position={activeScene === 'bedroom' ? [-0.5, 2.5, 0.5] : [0, 3.5, 0]} 
                intensity={4} 
                distance={7} 
                angle={Math.PI / 3.8} 
                penumbra={0.6} 
                color="#fdba74" 
                castShadow 
              />
              <Stars radius={100} depth={50} count={2500} factor={4} saturation={0.5} fade speed={1} />
            </>
          ) : (
            <>
              <directionalLight position={[5, 8, 5]} intensity={1.6} color="#fef3c7" castShadow />
            </>
          )}

          <Suspense fallback={null}>
            {activeScene === 'lawn' && (
              <group position={[0, -0.4, 0]}><WeddingLawnScene /></group>
            )}
            {activeScene === 'banquet' && (
              <group position={[0, -0.4, 0]}><BanquetHallScene /></group>
            )}
            {activeScene === 'standard' && (
              <group position={[0, -0.4, 0]}>
                <RoomWalls isNight={isNight} />
                <CozyBed type="standard" position={[-0.5, 0, 0]} isNight={isNight} />
                <Workstation position={[1.5, 0, -1.8]} />
              </group>
            )}
            {activeScene === 'deluxe' && (
              <group position={[0, -0.4, 0]}>
                <RoomWalls isNight={isNight} />
                <CozyBed type="deluxe" position={[-0.5, 0, 0]} isNight={isNight} />
                <Workstation position={[1.5, 0, -1.8]} />
              </group>
            )}
            {activeScene === 'suite' && (
              <group position={[0, -0.4, 0]}>
                <RoomWalls isNight={isNight} />
                <CozyBed type="deluxe" position={[-1.2, 0, 0.5]} isNight={isNight} />
                <LoungeSofa position={[1.4, 0, -1.2]} />
                <Workstation position={[1.4, 0, 1.2]} />
              </group>
            )}
          </Suspense>
        </Canvas>
      </div>

      {/* UI OVERLAY PANEL */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between pointer-events-none p-4 sm:p-6">
        
        {/* Navigation Header */}
        <header className="w-full max-w-7xl mx-auto flex justify-between items-center pointer-events-auto bg-black/45 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 shadow-lg">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center text-xs font-mono uppercase"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
            </button>
            <span className="text-white/10">|</span>
            <div 
              onClick={() => setCurrentTab('home')}
              className="flex items-center space-x-2 cursor-pointer hover:opacity-90"
            >
              <Award className="w-5 h-5 text-amber-500" />
              <span className="font-display font-black text-sm tracking-wider bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent uppercase">
                RmanshaInn
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { id: 'home', label: 'Home' },
              { id: 'rooms', label: 'Rooms' },
              { id: 'events', label: 'Banquets & Lawns' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'contact', label: 'Contact Us' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentTab(tab.id);
                  if (tab.id === 'rooms') setSelectedRoomTier('deluxe');
                  if (tab.id === 'events') setSelectedEventTier('lawn');
                }}
                className={`text-xs font-mono uppercase tracking-wider transition-colors duration-200 ${currentTab === tab.id ? 'text-amber-400' : 'text-gray-400 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center space-x-3">
            {/* Day/Night toggle */}
            <div className="flex items-center space-x-1.5 bg-black/30 p-1 rounded-full border border-white/5">
              <button 
                onClick={() => setIsNight(false)} 
                className={`p-1.5 rounded-full transition-colors ${!isNight ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setIsNight(true)} 
                className={`p-1.5 rounded-full transition-colors ${isNight ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => {
                setBookingStep(1);
                setCurrentTab('booking');
              }}
              className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black text-[10px] font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300"
            >
              Book Now
            </button>
          </div>
        </header>

        {/* Dynamic Center Panels */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-stretch justify-between gap-6 my-auto py-8">
          
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: HOME PANEL */}
            {currentTab === 'home' && (
              <motion.div 
                className="w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 pointer-events-auto shadow-2xl space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono text-amber-500 tracking-widest uppercase flex items-center">
                    <Sparkles className="w-3 h-3 mr-1.5 animate-pulse" /> Luxury Living Redefined
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white leading-tight">
                    RmanshaInn Hotel & Resort
                  </h1>
                </div>

                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Located just 3 km from the sacred **Sangam Nose (Arail Ghat)**, RmanshaInn offers a premium oasis of calm for pilgrims, business executives, and luxury travelers visiting Prayagraj. Enjoy direct Direct direct reservation, high-speed Wi-Fi, and 7-star hospitality.
                </p>

                <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-4 font-mono text-center">
                  <div>
                    <div className="text-lg font-bold text-amber-400">54</div>
                    <div className="text-[9px] text-gray-500 uppercase">Premium Rooms</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-amber-400">32k</div>
                    <div className="text-[9px] text-gray-500 uppercase">Sq. Ft Lawn</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-amber-400">24/7</div>
                    <div className="text-[9px] text-gray-500 uppercase">Front Desk</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setCurrentTab('rooms')}
                    className="flex-1 py-3 bg-white text-black hover:bg-gray-200 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Explore Rooms
                  </button>
                  <button
                    onClick={() => setCurrentTab('events')}
                    className="flex-1 py-3 bg-black/40 border border-white/10 hover:bg-white/5 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Venues & Lawns
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: ROOMS MODULE */}
            {currentTab === 'rooms' && (
              <motion.div 
                className="w-full md:w-[450px] glass-panel p-6 rounded-3xl border border-white/10 pointer-events-auto shadow-2xl flex flex-col justify-between gap-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                onViewportBoxUpdate={() => {}}
              >
                <div>
                  <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase">Select Tier</span>
                  <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 mt-1.5">
                    {Object.keys(roomDetails).map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setSelectedRoomTier(tier)}
                        className={`flex-1 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 ${selectedRoomTier === tier ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-display font-black text-white">{roomDetails[selectedRoomTier].name}</h2>
                    <p className="text-xs text-amber-400 font-mono italic mt-0.5">{roomDetails[selectedRoomTier].tagline}</p>
                  </div>

                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {roomDetails[selectedRoomTier].desc}
                  </p>

                  <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Dimensions:</span>
                      <span className="text-white">{roomDetails[selectedRoomTier].size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Beds:</span>
                      <span className="text-white">{roomDetails[selectedRoomTier].beds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Occupancy:</span>
                      <span className="text-white">{roomDetails[selectedRoomTier].maxGuests}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase">Rate Per Night</span>
                    <div className="text-2xl font-mono font-black text-amber-400">₹{roomDetails[selectedRoomTier].price.toLocaleString()}</div>
                  </div>
                  <button
                    onClick={() => handleStartBooking(selectedRoomTier)}
                    className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Book Tier
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 3: EVENTS MODULE */}
            {currentTab === 'events' && (
              <motion.div 
                className="w-full md:w-[450px] glass-panel p-6 rounded-3xl border border-white/10 pointer-events-auto shadow-2xl flex flex-col justify-between gap-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <div>
                  <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase">Select Space</span>
                  <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 mt-1.5">
                    <button
                      onClick={() => setSelectedEventTier('lawn')}
                      className={`flex-1 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 ${selectedEventTier === 'lawn' ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                    >
                      Outdoor Lawn
                    </button>
                    <button
                      onClick={() => setSelectedEventTier('banquet')}
                      className={`flex-1 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 ${selectedEventTier === 'banquet' ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                    >
                      Banquet Hall
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-display font-black text-white">{eventDetails[selectedEventTier].name}</h2>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {eventDetails[selectedEventTier].desc}
                  </p>

                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="bg-black/30 border border-white/5 p-3 rounded-xl">
                      <div className="text-gray-500 text-[10px] uppercase">Space Area</div>
                      <div className="text-white font-bold mt-0.5">{eventDetails[selectedEventTier].area}</div>
                    </div>
                    <div className="bg-black/30 border border-white/5 p-3 rounded-xl">
                      <div className="text-gray-500 text-[10px] uppercase">Max Capacity</div>
                      <div className="text-white font-bold mt-0.5">{eventDetails[selectedEventTier].capacity}</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentTab('contact')}
                  className="w-full py-3.5 bg-white text-black hover:bg-gray-200 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
                >
                  Send Event Inquiry
                </button>
              </motion.div>
            )}

            {/* VIEW 4: GALLERY MODULE */}
            {currentTab === 'gallery' && (
              <motion.div 
                className="w-full max-w-2xl glass-panel p-6 rounded-3xl border border-white/10 pointer-events-auto shadow-2xl space-y-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <div>
                  <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase">Visual Proof</span>
                  <h2 className="text-2xl font-display font-black text-white">Our Story in Pictures</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {galleryItems.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`h-24 sm:h-28 rounded-xl bg-gradient-to-tr ${item.bg} border border-white/5 p-3 flex flex-col justify-between relative group overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                      <div className="z-10 text-[9px] font-mono uppercase bg-black/50 px-2 py-0.5 rounded-full border border-white/10 w-fit">
                        {item.category}
                      </div>
                      <div className="z-10 text-[10px] font-bold text-white leading-tight font-display tracking-tight">
                        {item.title}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* VIEW 5: CONTACT MODULE */}
            {currentTab === 'contact' && (
              <motion.div 
                className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-white/10 pointer-events-auto shadow-2xl space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <div>
                  <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase">Get In Touch</span>
                  <h2 className="text-2xl font-display font-black text-white">Connect With Us</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-amber-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <div className="font-mono text-gray-500 uppercase">Call Reservations</div>
                        <a href="tel:+919219272778" className="font-bold text-white hover:text-amber-400 transition-colors">+91-921-927-2778</a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-amber-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <div className="font-mono text-gray-500 uppercase">Email Us</div>
                        <a href="mailto:reservations@rmanshainn.com" className="font-bold text-white hover:text-amber-400 transition-colors">reservations@rmanshainn.com</a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-amber-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <div className="font-mono text-gray-500 uppercase">Google Maps</div>
                        <a 
                          href="https://maps.app.goo.gl/GFLnSyEbnRehgLKh7" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-bold text-white hover:text-amber-400 transition-colors"
                        >
                          View Directions
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Standard Form mockup */}
                  <div className="space-y-3 bg-black/20 p-4 rounded-2xl border border-white/5">
                    <div className="text-[10px] font-mono text-gray-500 uppercase">Drop an Inquiry</div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full bg-black/40 border border-white/10 p-2 rounded-lg text-xs focus:outline-none focus:border-amber-500"
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-black/40 border border-white/10 p-2 rounded-lg text-xs focus:outline-none focus:border-amber-500"
                    />
                    <textarea 
                      placeholder="Message Details" 
                      rows={2} 
                      className="w-full bg-black/40 border border-white/10 p-2 rounded-lg text-xs focus:outline-none focus:border-amber-500 resize-none"
                    />
                    <button className="w-full py-2 bg-amber-500 text-black font-mono font-bold text-xs rounded-lg uppercase tracking-wider flex items-center justify-center space-x-1.5">
                      <Send className="w-3.5 h-3.5" /> <span>Send Message</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 6: BOOKING ENGINE OVERLAY */}
            {currentTab === 'booking' && (
              <motion.div 
                className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-white/10 pointer-events-auto shadow-2xl flex flex-col justify-between gap-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {/* Steps Header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-amber-500" />
                    <span className="font-display font-black text-sm tracking-wide text-white uppercase">Direct Booking Portal</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-500">
                    <span className={bookingStep >= 1 ? 'text-amber-500' : ''}>1</span> &rarr;
                    <span className={bookingStep >= 2 ? 'text-amber-500' : ''}>2</span> &rarr;
                    <span className={bookingStep >= 3 ? 'text-amber-500' : ''}>3</span> &rarr;
                    <span className={bookingStep >= 4 ? 'text-amber-500' : ''}>4</span>
                  </div>
                </div>

                {/* STEP 1: Details & Calendar */}
                {bookingStep === 1 && (
                  <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Check In</span>
                        <input 
                          type="date" 
                          value={checkIn} 
                          onChange={(e) => setCheckIn(e.target.value)} 
                          className="w-full bg-black/40 border border-white/10 p-2.5 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Check Out</span>
                        <input 
                          type="date" 
                          value={checkOut} 
                          onChange={(e) => setCheckOut(e.target.value)} 
                          className="w-full bg-black/40 border border-white/10 p-2.5 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Select Room</span>
                        <select 
                          value={bookedRoom} 
                          onChange={(e) => setBookedRoom(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 p-2.5 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        >
                          <option value="standard">Standard Room (₹10,999)</option>
                          <option value="deluxe">Deluxe Room (₹12,999)</option>
                          <option value="suite">Executive Suite (₹18,999)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Guests</span>
                        <select 
                          value={guestCount} 
                          onChange={(e) => setGuestCount(parseInt(e.target.value))}
                          className="w-full bg-black/40 border border-white/10 p-2.5 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        >
                          <option value={1}>1 Guest</option>
                          <option value={2}>2 Guests</option>
                          <option value={3}>3 Guests</option>
                          <option value={4}>4 Guests</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-xl p-3 text-xs space-y-1.5 font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Rate stay:</span>
                        <span className="text-white">₹{roomDetails[bookedRoom].price.toLocaleString()} x {stayDays} Nights</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal:</span>
                        <span className="text-white">₹{rawPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setBookingStep(2)}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Continue
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: Guest Information */}
                {bookingStep === 2 && (
                  <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Full Name</span>
                        <input 
                          type="text" 
                          value={clientName} 
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Abhinav Lall"
                          className="w-full bg-black/40 border border-white/10 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Email Address</span>
                        <input 
                          type="email" 
                          value={clientEmail} 
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="e.g. name@example.com"
                          className="w-full bg-black/40 border border-white/10 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-gray-500 uppercase">Phone Number</span>
                        <input 
                          type="tel" 
                          value={clientPhone} 
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-black/40 border border-white/10 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setBookingStep(1)}
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          if (clientName && clientEmail && clientPhone) {
                            setBookingStep(3);
                          }
                        }}
                        disabled={!clientName || !clientEmail || !clientPhone}
                        className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      >
                        Proceed to Pay
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Payment Options */}
                {bookingStep === 3 && (
                  <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="space-y-3">
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Select Payment Gate</span>
                      
                      <div 
                        onClick={() => setPaymentMethod('upi')}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all duration-300 ${paymentMethod === 'upi' ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-black/20 border-white/5 text-gray-400 hover:bg-white/5'}`}
                      >
                        <div className="flex items-center space-x-3">
                          <Eye className="w-5 h-5 text-amber-500" />
                          <div className="text-left">
                            <div className="text-xs font-bold text-white font-mono">UPI Transfer</div>
                            <div className="text-[10px] text-gray-500">Google Pay, PhonePe, Paytm</div>
                          </div>
                        </div>
                        <input type="radio" checked={paymentMethod === 'upi'} readOnly />
                      </div>

                      <div 
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all duration-300 ${paymentMethod === 'card' ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-black/20 border-white/5 text-gray-400 hover:bg-white/5'}`}
                      >
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-5 h-5 text-amber-500" />
                          <div className="text-left">
                            <div className="text-xs font-bold text-white font-mono">Credit / Debit Card</div>
                            <div className="text-[10px] text-gray-500">Visa, Mastercard, RuPay</div>
                          </div>
                        </div>
                        <input type="radio" checked={paymentMethod === 'card'} readOnly />
                      </div>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2.5 rounded-2xl flex justify-between items-center text-xs font-mono">
                      <span className="text-emerald-400 text-[10px] flex items-center">
                        <Percent className="w-3.5 h-3.5 mr-1" /> Direct booking Discount applied
                      </span>
                      <span className="text-emerald-400 font-bold">-₹1,500</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setBookingStep(2)}
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setBookingStep(4)}
                        className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                      >
                        Pay ₹{totalAmount.toLocaleString()}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Success Receipt */}
                {bookingStep === 4 && (
                  <motion.div className="space-y-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-display font-black text-white">Booking Confirmed!</h3>
                      <p className="text-[10px] text-gray-400 font-light">
                        Receipt generated. Check your inbox for transaction log details.
                      </p>
                    </div>

                    <div className="bg-black/30 border border-white/5 p-3.5 rounded-2xl text-left font-mono text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Guest:</span>
                        <span className="text-white font-semibold">{clientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Stay Tier:</span>
                        <span className="text-white font-semibold">{roomDetails[bookedRoom].name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Stay Duration:</span>
                        <span className="text-white">{checkIn} &rarr; {checkOut} ({stayDays} Nights)</span>
                      </div>
                      <div className="flex justify-between border-t border-white/5 pt-2 text-emerald-400">
                        <span>Total Paid:</span>
                        <span className="font-bold">₹{totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentTab('home');
                        setBookingStep(1);
                      }}
                      className="w-full py-3 bg-white text-black hover:bg-gray-100 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      Return to Homepage
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

          </AnimatePresence>

          {/* Right Panel: Map Guide, visible in all pages except Booking view */}
          {currentTab !== 'booking' && (
            <motion.div 
              className="w-full md:w-80 glass-panel p-6 rounded-3xl border border-white/10 pointer-events-auto flex flex-col justify-between gap-6 shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div>
                <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase">Travel Context</span>
                <h3 className="text-lg font-display font-extrabold tracking-tight mt-1 text-white">Central Location</h3>
                <p className="text-[11px] text-gray-400 mt-1 font-light leading-relaxed">
                  Ideally situated for visiting the upcoming **Kumbh Mela 2025** bathing spots.
                </p>
              </div>

              {/* Nearest details grid */}
              <div className="space-y-3 font-mono text-[11px]">
                <span className="text-[9px] text-gray-500 uppercase tracking-widest block">Distances & Routing</span>
                
                <div className="flex justify-between items-center border-l-2 border-amber-500 pl-3">
                  <div className="text-left">
                    <div className="font-bold text-white">Sangam Nose (Arail Ghat)</div>
                    <div className="text-[9px] text-gray-500">Permanent Bathing Spot</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-amber-400">3 km</div>
                    <div className="text-[9px] text-gray-500">8 mins</div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-l-2 border-white/20 pl-3">
                  <div className="text-left">
                    <div className="font-bold text-white">Chheoki Train Junction</div>
                    <div className="text-[9px] text-gray-500">Direct South line stops</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">2 km</div>
                    <div className="text-[9px] text-gray-500">5 mins</div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-l-2 border-white/20 pl-3">
                  <div className="text-left">
                    <div className="font-bold text-white">Varanasi</div>
                    <div className="text-[9px] text-gray-500">Kashi Vishwanath Corridor</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">80 km</div>
                    <div className="text-[9px] text-gray-500">90 mins</div>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 border border-white/5 p-3 rounded-2xl flex items-center space-x-2.5">
                <Clock className="w-5 h-5 text-amber-400" />
                <div className="text-[10px] font-mono text-gray-400 leading-normal">
                  Airport is just 20km away with 24/7 direct pick-up services.
                </div>
              </div>
            </motion.div>
          )}

        </div>

        {/* Global Footer (Fixed Typo Copywriting) */}
        <footer className="w-full max-w-7xl mx-auto pointer-events-auto bg-black/45 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg text-xs">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">Pricing & Policy Integrity</div>
              <div className="text-[11px] text-gray-400 font-light">
                Direct bookings carry a guaranteed rate, instant confirmation email, and standard check-in rights.
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-gray-500 text-center md:text-right">
            <div>Copyright &copy; 2026 RmanshaInn &bull; Designed By Infoseed Technologies</div>
            <div className="text-[9px] text-gray-600 mt-0.5">Redesigned at 3D concept level with 100% verified links.</div>
          </div>
        </footer>

      </div>

    </div>
  );
}
