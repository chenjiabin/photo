import React, { useState } from 'react';
import { Photo, AiAnalysisResult } from '../types';
import { X, Sparkles, Share2, Printer, Trash2, Loader2, Download } from 'lucide-react';
import { analyzePhoto } from '../services/geminiService';

interface GalleryViewProps {
  photos: Photo[];
  onDelete: (id: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ photos, onDelete }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setAnalysis(null); // Reset previous analysis
  };

  const handleAnalyze = async () => {
    if (!selectedPhoto) return;
    setIsAnalyzing(true);
    const result = await analyzePhoto(selectedPhoto.url);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-4 pb-28 min-h-screen">
      <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-2xl font-bold text-slate-800">Gallery <span className="text-slate-300 font-normal ml-2 text-lg">{photos.length}</span></h2>
          <button className="text-primary text-sm font-bold bg-primary/10 px-4 py-2 rounded-full hover:bg-primary/20 transition-colors">
            Select
          </button>
      </div>
      
      {/* Modern Grid */}
      <div className="columns-2 gap-4 space-y-4">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="break-inside-avoid rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
            onClick={() => handlePhotoClick(photo)}
          >
            <img 
              src={photo.url} 
              alt="Booth capture" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                <span className="text-[10px] text-slate-800 font-bold">
                    {photo.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal - Keeping this darkish for focus, but with friendlier UI */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6">
             <div className="flex flex-col">
                 <span className="text-white font-bold text-lg">
                    {selectedPhoto.timestamp.toLocaleDateString()}
                 </span>
                 <span className="text-slate-400 text-xs font-medium">
                    {selectedPhoto.timestamp.toLocaleTimeString()}
                 </span>
             </div>
             <button 
               onClick={() => setSelectedPhoto(null)}
               className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 hover:rotate-90 transition-all"
             >
               <X size={24} />
             </button>
          </div>

          {/* Main Image Area */}
          <div className="flex-1 relative flex items-center justify-center p-4 overflow-hidden">
             <div className="relative shadow-2xl shadow-black/50 rounded-lg overflow-hidden">
                <img 
                src={selectedPhoto.url} 
                className="max-h-[60vh] w-auto object-contain"
                alt="Full view"
                />
                
                {/* AI Analysis Tag */}
                {analysis && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-in slide-in-from-bottom-4">
                    <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-primary to-orange-400 rounded-full shrink-0">
                        <Sparkles size={16} className="text-white" />
                    </div>
                    <div>
                        <p className="text-slate-800 text-sm font-bold leading-tight">"{analysis.caption}"</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                        {analysis.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-md">
                            {tag}
                            </span>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>
                )}
             </div>
          </div>

          {/* Actions Bar */}
          <div className="p-6 bg-white rounded-t-3xl pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between items-center gap-4">
               <button 
                 onClick={handleAnalyze}
                 disabled={isAnalyzing}
                 className="flex-1 bg-slate-900 text-white py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
               >
                 {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} className="text-yellow-400" />}
                 <span>{isAnalyzing ? 'Dreaming...' : 'Generate Caption'}</span>
               </button>

               <div className="flex gap-2">
                 <button className="p-4 bg-slate-100 rounded-2xl hover:bg-slate-200 text-slate-700 transition-colors">
                   <Download size={20} />
                 </button>
                 <button className="p-4 bg-slate-100 rounded-2xl hover:bg-slate-200 text-slate-700 transition-colors">
                   <Printer size={20} />
                 </button>
                  <button 
                    className="p-4 bg-red-50 rounded-2xl hover:bg-red-100 text-red-500 transition-colors"
                    onClick={() => {
                      onDelete(selectedPhoto.id);
                      setSelectedPhoto(null);
                    }}
                  >
                   <Trash2 size={20} />
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};