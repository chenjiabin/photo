import React, { useState } from 'react';
import { Photo, AiAnalysisResult } from '../types';
import { X, Sparkles, Share2, Printer, Trash2, Loader2 } from 'lucide-react';
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
    <div className="p-4 pb-24 min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-4 px-1">Session Gallery</h2>
      
      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="aspect-[3/4] rounded-xl overflow-hidden relative group cursor-pointer border border-white/10 bg-surface"
            onClick={() => handlePhotoClick(photo)}
          >
            <img 
              src={photo.url} 
              alt="Booth capture" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-xs text-white font-medium">
                {photo.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col animate-in fade-in duration-200">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4">
             <span className="text-slate-400 text-sm">
                {selectedPhoto.timestamp.toLocaleDateString()} • {selectedPhoto.timestamp.toLocaleTimeString()}
             </span>
             <button 
               onClick={() => setSelectedPhoto(null)}
               className="p-2 bg-white/10 rounded-full hover:bg-white/20"
             >
               <X size={20} />
             </button>
          </div>

          {/* Main Image */}
          <div className="flex-1 relative flex items-center justify-center p-4">
             <img 
               src={selectedPhoto.url} 
               className="max-h-full max-w-full rounded-lg shadow-2xl border border-white/10"
               alt="Full view"
             />
             
             {/* AI Analysis Overlay */}
             {analysis && (
               <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-primary/30 animate-in slide-in-from-bottom-4">
                 <div className="flex items-start gap-3">
                   <Sparkles size={20} className="text-primary mt-1 shrink-0" />
                   <div>
                     <p className="text-white text-sm font-medium leading-relaxed">"{analysis.caption}"</p>
                     <div className="flex flex-wrap gap-2 mt-2">
                       {analysis.tags.map(tag => (
                         <span key={tag} className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full">
                           {tag}
                         </span>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
             )}
          </div>

          {/* Actions Bar */}
          <div className="p-6 bg-surface/50 border-t border-white/5 pb-10">
            <div className="flex justify-between items-center gap-4">
               <button 
                 onClick={handleAnalyze}
                 disabled={isAnalyzing}
                 className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
               >
                 {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                 <span>{isAnalyzing ? 'Magic Working...' : 'AI Caption'}</span>
               </button>

               <div className="flex gap-2">
                 <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-white border border-white/5">
                   <Printer size={20} />
                 </button>
                 <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-white border border-white/5">
                   <Share2 size={20} />
                 </button>
                  <button 
                    className="p-3 bg-red-500/10 rounded-xl hover:bg-red-500/20 text-red-400 border border-red-500/20"
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