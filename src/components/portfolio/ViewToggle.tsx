import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onViewModeChange('grid')}
        className={cn(
          'p-2 rounded-md transition-all duration-200 flex items-center gap-2 font-medium',
          viewMode === 'grid'
            ? 'text-amber-600 bg-transparent border-b-2 border-amber-600 rounded-none'
            : 'text-gray-500 hover:text-amber-500 bg-transparent'
        )}
        aria-label="Vista cuadrícula"
      >
        <LayoutGrid size={20} />
        <span className="hidden sm:inline">Grid</span>
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={cn(
          'p-2 rounded-md transition-all duration-200 flex items-center gap-2 font-medium',
          viewMode === 'list'
            ? 'text-amber-600 bg-transparent border-b-2 border-amber-600 rounded-none'
            : 'text-gray-500 hover:text-amber-500 bg-transparent'
        )}
        aria-label="Vista lista"
      >
        <List size={20} />
        <span className="hidden sm:inline">Lista</span>
      </button>
    </div>
  );
};
