
import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Sparkles, Camera, Loader2, RefreshCcw, Wand2, Layers, ScanLine, Download, Share2, Split, Pipette, MousePointer2 } from 'lucide-react';
import { GeminiService } from '../services/geminiService';

interface AIVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIVisualizerModal: React.FC<AIVisualizerModalProps> = ({ isOpen, onClose }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showComparison, setShowComparison] = useState(false);
  const [pickedColor, setPickedColor] = useState<string | null>(null);
  const [isPickingColor, setIsPickingColor] = useState(false);
  
  // Selection/Average Logic States
  const [selection, setSelection] = useState<{ x1: number, y1: number, x2: number, y2: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadingMessages = [
    { icon: <ScanLine className="w-4 h-4" />, text: "Scanning room geometry..." },
    { icon: <Layers className="w-4 h-4" />, text: "Identifying wall surfaces..." },
    { icon: <Wand2 className="w-4 h-4" />, text: "Applying AI textures..." },
    { icon: <Sparkles className="w-4 h-4" />, text: "Rendering final preview..." }
  ];

  useEffect(() => {
    let interval: any;
    if (isProcessing) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResultImage(null);
        setPickedColor(null);
        setSelection(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isPickingColor || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSelection({ x1: x, y1: y, x2: x, y2: y });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selection || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSelection({ ...selection, x2: x, y2: y });
  };

  const handleMouseUp = () => {
    if (!isDragging || !selection || !imageRef.current || !canvasRef.current) return;
    setIsDragging(false);
    
    const img = imageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Natural Dimensions for mapping
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    const rect = img.getBoundingClientRect();
    
    // Scale factor between screen and natural image
    const scaleX = naturalWidth / rect.width;
    const scaleY = naturalHeight / rect.height;

    // Define selection area in natural pixels
    const sx = Math.max(0, Math.min(selection.x1, selection.x2) * scaleX);
    const sy = Math.max(0, Math.min(selection.y1, selection.y2) * scaleY);
    const sw = Math.abs(selection.x2 - selection.x1) * scaleX;
    const sh = Math.abs(selection.y2 - selection.y1) * scaleY;

    // Draw the natural image to the hidden canvas to sample pixels
    canvas.width = naturalWidth;
    canvas.height = naturalHeight;
    ctx.drawImage(img, 0, 0);

    // Sample the area (clamped to 1x1 if selection was just a click)
    const finalW = Math.max(1, Math.round(sw));
    const finalH = Math.max(1, Math.round(sh));
    
    try {
      const imageData = ctx.getImageData(sx, sy, finalW, finalH).data;
      let r = 0, g = 0, b = 0;
      const totalPixels = imageData.length / 4;

      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
      }

      const avgR = Math.floor(r / totalPixels);
      const avgG = Math.floor(g / totalPixels);
      const avgB = Math.floor(b / totalPixels);

      const hex = `#${((1 << 24) + (avgR << 16) + (avgG << 8) + avgB).toString(16).slice(1)}`;
      setPickedColor(hex);
    } catch (err) {
      console.error("Sampling failed:", err);
    }

    setIsPickingColor(false);
    setSelection(null);
  };

  const processVisualization = async () => {
    if (!image) return;
    setIsProcessing(true);
    try {
      const base64 = image.split(',')[1];
      const result = await GeminiService.generateVisualizedRoom(
        base64, 
        userPrompt || "Modern minimalist botanical wallpaper with dark green tones",
        pickedColor || undefined
      );
      setResultImage(result.imageUrl);
      setDescription(result.description);
      setShowComparison(true);
    } catch (err) {
      alert("Failed to process room. Please check your API key.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'ai-designed-room.png';
    link.click();
  };

  const handleShare = async () => {
    if (!resultImage) return;
    try {
      const response = await fetch(resultImage);
      const blob = await response.blob();
      const file = new File([blob], 'my-designed-room.png', { type: 'image/png' });
      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: 'Check out my new room design!',
          text: 'Generated with Building Innovations AI Visualizer',
        });
      } else {
        alert("Sharing not supported on this browser.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const reset = () => {
    setImage(null);
    setResultImage(null);
    setDescription('');
    setUserPrompt('');
    setShowComparison(false);
    setPickedColor(null);
    setIsPickingColor(false);
    setSelection(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative bg-[#1a1c1e] w-full max-w-6xl max-h-[95vh] rounded-[48px] overflow-hidden border border-white/10 shadow-[0_0_100px_-20px_rgba(37,99,235,0.4)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-8 bg-white/[0.03] border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-2xl shadow-blue-500/30 ring-1 ring-white/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Design Studio PRO</h2>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mt-1">AI-Powered Virtual Renovation</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-white/10 rounded-full transition-all border border-transparent hover:border-white/10 shadow-inner"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 min-h-[500px] flex flex-col">
            {!image ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex-1 border-2 border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/[0.04] transition-all group relative overflow-hidden shadow-inner"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl border border-white/5 ring-1 ring-white/10">
                  <Camera className="w-12 h-12 text-white/30" />
                </div>
                <div className="text-center relative z-10 px-6">
                  <p className="font-bold text-2xl text-white/90">Click to upload room</p>
                  <p className="text-sm text-white/40 mt-2 max-w-[320px]">High resolution photos work best for accurate AI mapping and texture blending</p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept="image/*" 
                />
              </div>
            ) : (
              <div 
                className="relative w-full flex-1 rounded-[40px] overflow-hidden bg-black/40 border border-white/10 shadow-2xl group/preview"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => isDragging && handleMouseUp()}
              >
                {/* Hidden canvas for color sampling */}
                <canvas ref={canvasRef} className="hidden" />

                {resultImage && showComparison ? (
                  <div className="relative w-full h-full cursor-col-resize select-none">
                    <img src={image} className="absolute inset-0 w-full h-full object-contain" alt="Original" />
                    <div 
                      className="absolute inset-0 overflow-hidden" 
                      style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                    >
                      <img src={resultImage} className="absolute inset-0 w-full h-full object-contain" alt="AI Generated" />
                    </div>
                    {/* Slider Line */}
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.4)] ring-4 ring-black/20">
                        <Split className="w-6 h-6 text-black" />
                      </div>
                    </div>
                    {/* Control Input */}
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={sliderPosition} 
                      onChange={(e) => setSliderPosition(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-30"
                    />
                    <div className="absolute bottom-6 left-6 px-5 py-2.5 bg-black/60 backdrop-blur-xl rounded-2xl text-xs font-bold border border-white/10 z-20 shadow-2xl ring-1 ring-white/5">Original</div>
                    <div className="absolute bottom-6 right-6 px-5 py-2.5 bg-blue-600/80 backdrop-blur-xl rounded-2xl text-xs font-bold border border-white/20 z-20 shadow-2xl ring-1 ring-white/10">AI Visualized</div>
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center select-none">
                    <img 
                      ref={imageRef}
                      src={resultImage || image} 
                      className={`max-w-full max-h-full object-contain ${isPickingColor ? 'cursor-crosshair' : ''}`} 
                      alt="Room preview" 
                      draggable={false}
                    />
                    
                    {/* Selection Visual Overlay */}
                    {isPickingColor && selection && (
                      <div 
                        className="absolute border-2 border-white border-dashed bg-blue-500/10 pointer-events-none z-50 shadow-[0_0_0_9999px_rgba(0,0,0,0.3)] transition-all duration-75"
                        style={{
                          left: Math.min(selection.x1, selection.x2),
                          top: Math.min(selection.y1, selection.y2),
                          width: Math.abs(selection.x2 - selection.x1),
                          height: Math.abs(selection.y2 - selection.y1),
                        }}
                      />
                    )}
                  </div>
                )}
                
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center z-[60]">
                    <div className="relative mb-12">
                      <div className="absolute inset-0 bg-blue-500/40 blur-[50px] rounded-full scale-150 animate-pulse" />
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <Loader2 className="w-20 h-20 text-blue-500 animate-spin absolute" strokeWidth={1} />
                        <Sparkles className="w-10 h-10 text-white animate-pulse" />
                      </div>
                    </div>
                    
                    <div className="space-y-8 max-w-sm w-full">
                      <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1.5px] shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 via-indigo-400 to-blue-600 bg-[length:200%_100%] animate-[shimmer_2s_infinite_linear] transition-all duration-1000 ease-out shadow-[0_0_25px_rgba(59,130,246,0.7)] rounded-full" 
                          style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                        />
                      </div>
                      <style>{`
                        @keyframes shimmer {
                          0% { background-position: 200% 0; }
                          100% { background-position: -200% 0; }
                        }
                      `}</style>
                      <div className="flex items-center justify-center h-16">
                        <span className="animate-in fade-in slide-in-from-bottom-4 duration-1000 flex items-center gap-4 bg-white/[0.04] px-8 py-3 rounded-3xl border border-white/10 shadow-2xl ring-1 ring-white/5 text-lg font-medium">
                          {loadingMessages[loadingStep].icon}
                          {loadingMessages[loadingStep].text}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Picking Instructions */}
                {isPickingColor && !isDragging && (
                  <div className="absolute inset-0 flex items-center justify-center z-[55] pointer-events-none">
                    <div className="bg-black/60 border border-white/20 backdrop-blur-xl px-8 py-4 rounded-[32px] flex flex-col items-center gap-4 animate-in zoom-in duration-300 shadow-2xl ring-1 ring-white/10">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                         <MousePointer2 className="w-6 h-6 text-blue-400 animate-pulse" />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-bold text-lg">Area Sampler Active</p>
                        <p className="text-white/40 text-xs mt-1">Click and drag to select a range for averaging</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Controls overlay */}
                {image && !isProcessing && (
                  <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover/preview:opacity-100 transition-all duration-300 z-40 transform translate-y-2 group-hover/preview:translate-y-0">
                    {resultImage && (
                      <>
                        <button 
                          onClick={handleDownload}
                          className="p-4 bg-white/10 backdrop-blur-2xl rounded-2xl text-white hover:bg-white hover:text-black transition-all border border-white/20 shadow-2xl group/tip relative"
                          title="Download Design"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={handleShare}
                          className="p-4 bg-white/10 backdrop-blur-2xl rounded-2xl text-white hover:bg-white hover:text-black transition-all border border-white/20 shadow-2xl"
                          title="Share Design"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button 
                      onClick={reset}
                      className="p-4 bg-red-500/20 backdrop-blur-2xl rounded-2xl text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/30 shadow-2xl"
                      title="Clear Design"
                    >
                      <RefreshCcw className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="w-full lg:w-[420px] flex flex-col gap-10">
            <div className="space-y-10">
              {/* Color Picker Integration */}
              {image && !resultImage && (
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] mb-4 block ml-2">
                    Decor Harmony
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPickingColor(!isPickingColor)}
                      className={`flex-1 py-4 px-6 rounded-2xl border transition-all flex items-center justify-center gap-3 font-bold ${
                        isPickingColor 
                          ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20 ring-2 ring-white/30' 
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:text-white shadow-inner'
                      }`}
                    >
                      <Pipette className="w-5 h-5" />
                      {isPickingColor ? 'Sampling...' : 'Average Color Tool'}
                    </button>
                    {pickedColor && (
                      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-4 shadow-inner">
                        <div 
                          className="w-8 h-8 rounded-xl border border-white/20 shadow-2xl ring-1 ring-white/10" 
                          style={{ backgroundColor: pickedColor }}
                        />
                        <span className="text-xs font-mono text-white/60 font-bold">{pickedColor.toUpperCase()}</span>
                        <button 
                          onClick={() => setPickedColor(null)}
                          className="text-white/20 hover:text-red-400 transition-colors p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  {pickedColor && (
                    <p className="text-[10px] text-blue-400/80 font-bold italic ml-2 flex items-center gap-2">
                      <Sparkles className="w-3 h-3" />
                      Area-averaged reference captured.
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] mb-4 block ml-2">
                  Style Parameters
                </label>
                <div className="relative group p-[1px] rounded-[32px] bg-gradient-to-br from-white/10 to-transparent focus-within:from-blue-500 transition-all shadow-inner ring-1 ring-white/5">
                  <textarea 
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="Describe your architectural vision (e.g. 'Sultry minimalist charcoal texture with warm brass accents')..."
                    className="relative w-full h-40 bg-[#1e2022] border border-transparent rounded-[31px] p-7 text-sm leading-relaxed focus:outline-none transition-all resize-none placeholder:text-white/10 shadow-inner"
                    disabled={isProcessing}
                  />
                </div>
              </div>

              {description && !isProcessing && (
                <div className="bg-gradient-to-br from-blue-600/[0.1] via-indigo-600/[0.05] to-transparent border border-blue-500/30 rounded-[40px] p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/5">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.03] scale-150">
                    <Wand2 className="w-24 h-24 text-blue-400" />
                  </div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)] animate-pulse" />
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em]">Designer Report</p>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed italic relative z-10 font-medium">
                    "{description.length > 300 ? description.substring(0, 300) + '...' : description}"
                  </p>
                </div>
              )}
            </div>

            <div className="mt-auto space-y-5">
              <button
                onClick={processVisualization}
                disabled={!image || isProcessing}
                className={`w-full py-7 rounded-[28px] font-bold flex items-center justify-center gap-4 transition-all relative overflow-hidden group/btn ${
                  !image || isProcessing 
                    ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/10' 
                    : 'bg-white text-black hover:bg-blue-50 shadow-[0_30px_70px_-15px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] ring-1 ring-white/20'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/30 to-blue-600/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
                {isProcessing ? (
                  <Loader2 className="w-7 h-7 animate-spin" strokeWidth={2.5} />
                ) : (
                  <Sparkles className={`w-7 h-7 ${image ? 'text-blue-600' : ''}`} />
                )}
                <span className="relative z-10 text-xl tracking-tight">{resultImage ? 'Refine Aesthetic' : 'Generate Visualization'}</span>
              </button>

              {resultImage && !isProcessing && (
                <button 
                  onClick={() => {/* Mock shop this look logic */}}
                  className="w-full py-5 rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl font-bold text-white/80 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-3 group/cart ring-1 ring-white/5 shadow-2xl"
                >
                  <Layers className="w-6 h-6 text-blue-500 transition-transform group-hover/cart:rotate-12 group-hover/cart:scale-110" />
                  Order Suggested Materials
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIVisualizerModal;
