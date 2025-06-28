import { useState } from 'react';
import { GripVertical } from 'lucide-react';
export default function DragHandle({ onDrag, isResizing, orientation = "vertical" }) {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = orientation === "vertical" 
    ? "relative flex items-center justify-center w-2 cursor-col-resize" 
    : "relative flex items-center justify-center h-2 cursor-row-resize";
    
  const hoverClasses = orientation === "vertical"
    ? (isHovered ? 'w-3' : 'w-2')
    : (isHovered ? 'h-3' : 'h-2');

  return (
    <div
      className={`
        ${baseClasses}
        bg-slate-200 dark:bg-slate-700 
        hover:bg-slate-300 dark:hover:bg-slate-600 
        transition-all duration-200
        ${isResizing ? 'bg-emerald-500 dark:bg-emerald-600' : ''}
        ${hoverClasses}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={onDrag}
    >
      <div className={`
        absolute ${orientation === "vertical" ? "inset-y-0 left-1/2 transform -translate-x-1/2" : "inset-x-0 top-1/2 transform -translate-y-1/2"} 
        flex items-center justify-center
        ${isHovered || isResizing ? 'opacity-100' : 'opacity-60'}
        transition-opacity duration-200
      `}>
        <GripVertical 
          className={`text-slate-500 dark:text-slate-400 ${
            orientation === "vertical" ? "w-3 h-6" : "w-6 h-3 rotate-90"
          }`} 
        />
      </div>
      
      {/* Hover area extension */}
      <div className={`absolute ${
        orientation === "vertical" ? "inset-y-0 -left-2 -right-2" : "inset-x-0 -top-2 -bottom-2"
      }`} />
      
      {/* Visual feedback dots */}
      <div className={`
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        flex ${orientation === "vertical" ? "flex-col" : "flex-row"} gap-1 transition-opacity duration-200
        ${isHovered || isResizing ? 'opacity-100' : 'opacity-0'}
      `}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-0.5 h-0.5 rounded-full ${
              isResizing ? 'bg-white' : 'bg-slate-400 dark:bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}