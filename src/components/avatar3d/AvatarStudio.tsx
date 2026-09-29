'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Download,
  RotateCw,
  Layers,
  Sparkles,
  Scissors,
  Check,
  Maximize2,
  Glasses,
  Box,
  FileCode,
  Image as ImageIcon,
} from 'lucide-react';
import { CharacterCanvas, CharacterExporters } from './CharacterCanvas';
import { PART_METADATA } from '@/lib/3d/characterModel';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// Suit Color Presets
const SUIT_PRESETS = [
  {
    name: 'Obsidian Agent',
    colorHex: 0x16171b,
    bgClass: 'bg-[#16171b]',
    borderClass: 'border-slate-500',
    desc: 'Classic reference black suit',
  },
  {
    name: 'Midnight Navy',
    colorHex: 0x121d33,
    bgClass: 'bg-[#121d33]',
    borderClass: 'border-blue-500',
    desc: 'Deep royal Italian navy',
  },
  {
    name: 'Charcoal Luxe',
    colorHex: 0x242830,
    bgClass: 'bg-[#242830]',
    borderClass: 'border-slate-400',
    desc: 'Modern tailored graphite wool',
  },
  {
    name: 'Royale Crimson',
    colorHex: 0x2e1117,
    bgClass: 'bg-[#2e1117]',
    borderClass: 'border-rose-500',
    desc: 'Bespoke velvet burgundy',
  },
  {
    name: 'Emerald Bespoke',
    colorHex: 0x0f241a,
    bgClass: 'bg-[#0f241a]',
    borderClass: 'border-emerald-500',
    desc: 'Subtle dark British racing green',
  },
];

const MODULAR_PARTS_LIST = [
  { id: 'head', label: 'Head & Neck', icon: '👤' },
  { id: 'hair', label: 'Pompadour Hair', icon: '💇' },
  { id: 'sunglasses', label: 'Dark Sunglasses', icon: '🕶️' },
  { id: 'shirtTie', label: 'Shirt & Tie', icon: '👔' },
  { id: 'jacketTorso', label: 'Suit Jacket', icon: '🧥' },
  { id: 'armLeft', label: 'Left Sleeve', icon: '🦾' },
  { id: 'armRight', label: 'Right Sleeve', icon: '🦾' },
  { id: 'handLeft', label: 'Left Hand', icon: '🖐️' },
  { id: 'handRight', label: 'Right Hand', icon: '🖐️' },
  { id: 'pants', label: 'Tailored Pants', icon: '👖' },
  { id: 'shoes', label: 'Oxford Shoes', icon: '👞' },
];

export function AvatarStudio() {
  const [suitColor, setSuitColor] = useState<number>(0x16171b);
  const [viewMode, setViewMode] = useState<'assembled' | 'exploded' | 'wireframe' | 'renders'>('assembled');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string>('/images/avatar/modular-3d-kit.jpg');
  const [explosionProgress, setExplosionProgress] = useState<number>(0);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [showSunglasses, setShowSunglasses] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [selectedPart, setSelectedPart] = useState<string | null>('jacketTorso');
  const [exporters, setExporters] = useState<CharacterExporters | null>(null);

  const handleModeChange = (mode: 'assembled' | 'exploded' | 'wireframe' | 'renders') => {
    setViewMode(mode);
    if (mode === 'assembled') {
      setExplosionProgress(0);
      setWireframe(false);
    } else if (mode === 'exploded') {
      setExplosionProgress(1.0);
      setWireframe(false);
    } else if (mode === 'wireframe') {
      setWireframe(true);
      setExplosionProgress(0);
    }
  };

  const currentPartInfo = selectedPart ? PART_METADATA[selectedPart] : null;

  return (
    <section
      id="3d-studio"
      className="relative w-full py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10 xl:px-16 overflow-hidden bg-[#08090e]"
      aria-label="3D Character Studio"
    >
      <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] rounded-full bg-indigo-500/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div className="mb-3">
            <Badge variant="glow" className="px-3.5 py-1 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
              <span>INTERACTIVE 3D WEBGL ENGINE &amp; DESIGN SYSTEM</span>
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Bespoke Agent{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              3D Character Studio
            </span>
          </h2>

          <p className="max-w-2xl text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            3D translation of the tailored gentleman reference — featuring 360° real-time
            inspection, modular exploded disassembly matching the asset breakdown, custom tailoring swatches,
            and one-click 3D file export.
          </p>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT: 3D Viewport / Render Gallery Container */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col rounded-3xl bg-[#0c101a]/90 border border-white/10 shadow-2xl shadow-black/60 overflow-hidden relative backdrop-blur-xl">
            {/* Viewport Top Bar Controls */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#0a0d16]/80 z-20">
              {/* View Mode Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
                <button
                  onClick={() => handleModeChange('assembled')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    viewMode === 'assembled'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Assembled Suit
                </button>
                <button
                  onClick={() => handleModeChange('exploded')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    viewMode === 'exploded'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Modular Kit (Exploded)
                </button>
                <button
                  onClick={() => handleModeChange('wireframe')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    viewMode === 'wireframe'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Wireframe
                </button>
                <button
                  onClick={() => handleModeChange('renders')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'renders'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Renders
                </button>
              </div>

              {/* Utility Buttons */}
              {viewMode !== 'renders' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    title={autoRotate ? 'Stop Auto-Rotate' : 'Start Auto-Rotate'}
                    className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                      autoRotate
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Spin</span>
                  </button>

                  <button
                    onClick={() => setShowSunglasses(!showSunglasses)}
                    title={showSunglasses ? 'Remove Sunglasses' : 'Wear Sunglasses'}
                    className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                      showSunglasses
                        ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <Glasses className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Shades</span>
                  </button>

                  <button
                    onClick={() => exporters?.resetCamera()}
                    title="Reset Camera Angle"
                    className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                </div>
              )}
            </div>

            {/* Exploded Slider */}
            {viewMode === 'exploded' && (
              <div className="px-5 py-2.5 bg-indigo-950/40 border-b border-indigo-500/20 flex items-center justify-between gap-4 z-10 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-mono text-indigo-200 font-semibold">
                    MODULAR SEPARATION DISTANCE
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-1 max-w-xs">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={explosionProgress}
                    onChange={(e) => setExplosionProgress(parseFloat(e.target.value))}
                    className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                  />
                  <span className="text-xs font-mono text-indigo-300 w-10 text-right">
                    {Math.round(explosionProgress * 100)}%
                  </span>
                </div>
              </div>
            )}

            {/* Viewport Center */}
            <div className="relative flex-1 min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] bg-radial from-[#12182b]/60 via-[#0a0d18] to-[#06070a] flex items-center justify-center">
              {viewMode === 'renders' ? (
                <div className="w-full h-full p-4 flex flex-col items-center justify-center relative">
                  <div className="relative w-full max-w-md h-[460px] sm:h-[500px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/50">
                    <Image
                      src={selectedGalleryImage}
                      alt="3D Character Render"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                  </div>

                  {/* Render Selection Strip */}
                  <div className="flex items-center gap-3 mt-4 z-10">
                    <button
                      onClick={() => setSelectedGalleryImage('/images/avatar/modular-3d-kit.jpg')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        selectedGalleryImage === '/images/avatar/modular-3d-kit.jpg'
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      Modular 3D Breakdown Sheet
                    </button>
                    <button
                      onClick={() => setSelectedGalleryImage('/images/avatar/character-3d-render.jpg')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        selectedGalleryImage === '/images/avatar/character-3d-render.jpg'
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      Pixar / Stylized 3D Full Body
                    </button>
                    <button
                      onClick={() => setSelectedGalleryImage('/images/avatar/suit-studio-portrait.jpg')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        selectedGalleryImage === '/images/avatar/suit-studio-portrait.jpg'
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      Photorealistic Studio
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <CharacterCanvas
                    suitColor={suitColor}
                    explosionProgress={explosionProgress}
                    wireframe={wireframe}
                    showSunglasses={showSunglasses}
                    autoRotate={autoRotate}
                    selectedPart={selectedPart}
                    onSelectPart={(partId: string | null) => setSelectedPart(partId)}
                    onExportersReady={(readyExporters: CharacterExporters) => setExporters(readyExporters)}
                  />

                  {currentPartInfo && (
                    <div className="absolute top-4 left-4 max-w-xs sm:max-w-sm p-3.5 rounded-2xl bg-[#0b0f19]/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
                          {currentPartInfo.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">PBR INSPECTOR</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{currentPartInfo.name}</h4>
                      <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                        {currentPartInfo.description}
                      </p>
                      <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-cyan-200/90">
                        <span className="text-slate-400 font-semibold block text-[9px] uppercase tracking-wider mb-0.5">
                          Tailoring Specs:
                        </span>
                        {currentPartInfo.tailorSpecs}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="px-5 py-2.5 border-t border-white/10 bg-[#080b13] flex items-center justify-between text-[11px] font-mono text-slate-400 z-10">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Three.js 3D Engine Active
                </span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className="hidden sm:inline">Vertices: 12,480</span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className="hidden sm:inline">PBR Shaders: 12</span>
              </div>
              <div className="text-slate-400">
                Mode:{' '}
                <span className="text-white font-semibold capitalize">
                  {viewMode === 'exploded' ? `Exploded (${Math.round(explosionProgress * 100)}%)` : viewMode}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Studio Control Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5">
            {/* Fabric & Color Palette */}
            <div className="p-5 rounded-3xl bg-[#0c101a]/90 border border-white/10 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-cyan-400" />
                  Bespoke Wool Colorway
                </h3>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Super 150s</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {SUIT_PRESETS.map((preset) => {
                  const isSelected = suitColor === preset.colorHex;
                  return (
                    <button
                      key={preset.name}
                      onClick={() => setSuitColor(preset.colorHex)}
                      className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all text-left group ${
                        isSelected
                          ? 'bg-white/10 border-cyan-400 shadow-md shadow-cyan-950/50'
                          : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 ${preset.borderClass} ${preset.bgClass} flex items-center justify-center shadow-inner`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block group-hover:text-cyan-300 transition-colors">
                            {preset.name}
                          </span>
                          <span className="text-[10px] text-slate-400 block">{preset.desc}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        #{preset.colorHex.toString(16).padStart(6, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modular Parts Directory */}
            <div className="p-5 rounded-3xl bg-[#0c101a]/90 border border-white/10 backdrop-blur-xl shadow-xl flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  Modular Parts Kit
                </h3>
                <span className="text-[10px] font-mono text-indigo-300">11 Components</span>
              </div>

              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Click any modular component to inspect its tailored PBR anatomy:
              </p>

              <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-52 pr-1 custom-scrollbar">
                {MODULAR_PARTS_LIST.map((part) => {
                  const isSelected = selectedPart === part.id;
                  return (
                    <button
                      key={part.id}
                      onClick={() => {
                        setSelectedPart(part.id);
                        if (viewMode === 'assembled') {
                          handleModeChange('exploded');
                        }
                      }}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-left text-xs transition-all ${
                        isSelected
                          ? 'bg-indigo-500/25 border-indigo-400 text-white font-semibold shadow-sm'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-base">{part.icon}</span>
                      <span className="truncate">{part.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10">
                <Button
                  size="sm"
                  variant={viewMode === 'exploded' ? 'primary' : 'secondary'}
                  className="w-full justify-center text-xs py-2.5"
                  onClick={() => handleModeChange(viewMode === 'exploded' ? 'assembled' : 'exploded')}
                >
                  <Scissors className="w-3.5 h-3.5 mr-1.5" />
                  {viewMode === 'exploded' ? 'Assemble Full Suit' : 'Breakdown into Modular Parts'}
                </Button>
              </div>
            </div>

            {/* 3D Export & Download Center */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#101524] to-[#0c101a] border border-cyan-500/20 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-cyan-400" />
                  Export 3D Model Asset
                </h3>
                <span className="text-[10px] font-mono text-cyan-400">Blender / Unity</span>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Download the exact 3D geometry with material definitions for Blender, Maya, Three.js, or game engines:
              </p>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => exporters?.exportObj()}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 hover:from-cyan-500/30 hover:to-indigo-500/30 border border-cyan-400/40 text-cyan-200 text-xs font-semibold transition-all hover:scale-[1.01] shadow-lg shadow-cyan-950/40"
                >
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-cyan-400" />
                    <span>Download .OBJ Model</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-300">1.8 MB • Wavefront</span>
                </button>

                <button
                  onClick={() => exporters?.exportGltf()}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white text-xs font-semibold transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-indigo-400" />
                    <span>Download .GLTF Model</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">726 KB • JSON PBR</span>
                </button>

                <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                  <span>Static files saved in:</span>
                  <a
                    href="/models/agent-suit.obj"
                    download="agent-suit.obj"
                    className="text-cyan-400 hover:underline"
                  >
                    /models/agent-suit.obj
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
