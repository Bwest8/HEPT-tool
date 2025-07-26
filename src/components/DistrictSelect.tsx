import React, { useState, useRef, useEffect } from 'react';
import { District, pennsylvaniaDistricts } from '../data/districts';
import { Search, X } from 'lucide-react';

interface DistrictSelectProps {
  value: string;
  onChange: (districtName: string, aun: string) => void;
  error?: boolean;
}

export const DistrictSelect: React.FC<DistrictSelectProps> = ({ value, onChange, error }) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter districts based on search term (name or AUN)
  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredDistricts([]);
      setIsOpen(false);
      return;
    }

    const searchTerm = inputValue.toLowerCase().trim();
    const filtered = pennsylvaniaDistricts.filter(district => 
      district.name.toLowerCase().includes(searchTerm) || 
      district.aun.includes(searchTerm)
    ).slice(0, 10); // Limit to 10 results for performance

    setFilteredDistricts(filtered);
    setIsOpen(filtered.length > 0);
    setHighlightedIndex(-1);
  }, [inputValue]);

  // Handle clicks outside component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update input value when prop value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Clear selection if input doesn't match current value
    if (newValue !== value) {
      onChange('', '');
    }
  };

  const handleDistrictSelect = (district: District) => {
    setInputValue(district.name);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onChange(district.name, district.aun);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('', '');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredDistricts.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredDistricts.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredDistricts.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredDistricts.length) {
          handleDistrictSelect(filteredDistricts[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const highlightMatch = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-gray-900">{part}</mark>
      ) : part
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search by district name or AUN..."
          className={`
            w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
            text-gray-900 placeholder-gray-500 bg-white
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
            }
          `}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && filteredDistricts.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            {filteredDistricts.map((district, index) => (
              <button
                key={district.aun}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleDistrictSelect(district);
                }}
                className={`
                  w-full px-4 py-3 text-left transition-colors border-b border-gray-100 last:border-b-0
                  ${index === highlightedIndex 
                    ? 'bg-blue-50 text-blue-900' 
                    : 'hover:bg-gray-50 text-gray-900'
                  }
                `}
              >
                <div className="font-medium">
                  {highlightMatch(district.name, inputValue)}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  AUN: {highlightMatch(district.aun, inputValue)}
                </div>
              </button>
            ))}
          </div>
          {filteredDistricts.length === 10 && (
            <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t">
              Showing first 10 results. Type more to narrow search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};