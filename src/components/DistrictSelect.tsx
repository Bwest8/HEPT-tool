import React, { useState, useRef, useEffect } from 'react';

// === Data Imports ===
import { District, pennsylvaniaDistricts } from '../data/districts';

// === Icon Imports ===
import { Search, X } from 'lucide-react';

// === Utils ===
import { cn } from '@/lib/utils';

/**
 * Props interface for DistrictSelect component
 */
interface DistrictSelectProps {
  /** Current district name value */
  value: string;
  /** Handler for district selection changes */
  onChange: (districtName: string, aun: string) => void;
  /** Whether the input has validation errors */
  error?: boolean;
}

/**
 * District Select component with integrated search functionality
 * Allows users to search and select Pennsylvania school districts
 * Displays both district name and AUN (Administrative Unit Number)
 */
export const DistrictSelect: React.FC<DistrictSelectProps> = ({ value, onChange, error }) => {
  // === State Management ===
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // === Refs ===
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter districts based on search term
  const filteredDistricts = inputValue.trim() === ''
    ? pennsylvaniaDistricts.slice(0, 10) // Show first 10 districts when no search term
    : pennsylvaniaDistricts.filter(district =>
      district.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      district.aun.includes(inputValue)
    ).slice(0, 10); // Limit to 10 results for performance

  // === Effects ===
  /** Handle clicks outside component to close dropdown */
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

  /** Update input value when prop value changes */
  useEffect(() => {
    if (value) {
      const selectedDistrict = pennsylvaniaDistricts.find(district => district.name === value);
      setInputValue(selectedDistrict ? `${selectedDistrict.name} (${selectedDistrict.aun})` : value);
    } else {
      setInputValue('');
    }
  }, [value]);

  /** Reset highlighted index when filtered results change */
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredDistricts.length]);

  // === Event Handlers ===
  /**
   * Handle input change events
   * @param e - Change event from input element
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true); // Show dropdown when typing

    // Clear selection if input doesn't match current value
    if (newValue !== value) {
      onChange('', '');
    }
  };

  /**
   * Handle input focus to show dropdown
   */
  const handleInputFocus = () => {
    setIsOpen(true);
  };

  /**
   * Handle district selection
   * @param district - Selected district object
   */
  const handleDistrictSelect = (district: District) => {
    setInputValue(`${district.name} (${district.aun})`);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onChange(district.name, district.aun);
  };

  /** Handle clear button click */
  const handleClear = () => {
    setInputValue('');
    onChange('', '');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  /**
   * Handle keyboard navigation in dropdown
   * @param e - Keyboard event
   */
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

  // === Render ===
  return (
    <div className="relative" ref={dropdownRef}>
      {/* === Search Input === */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search by district name or AUN..."
          className={cn(
            "w-full h-12 pl-12 pr-12 py-3 text-base border-2 rounded-none bg-white text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600",
            error
              ? "border-red-500 focus:border-red-600 focus:ring-red-200"
              : "border-gray-400 hover:border-gray-600"
          )}
          aria-describedby={error ? "district-error" : undefined}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* === Dropdown Menu === */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-400 shadow-lg max-h-96 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto" style={{ maxHeight: filteredDistricts.length === 10 ? '288px' : '352px' }}>
            {filteredDistricts.map((district, index) => (
              <div
                key={district.aun}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleDistrictSelect(district);
                }}
                className={cn(
                  "px-4 py-3 cursor-pointer border-b border-gray-200 last:border-b-0 transition-colors duration-150",
                  index === highlightedIndex
                    ? 'bg-blue-50 border-l-4 border-l-blue-600'
                    : 'hover:bg-gray-50 focus:bg-blue-50 focus:border-l-4 focus:border-l-blue-600'
                )}
                role="option"
                aria-selected={index === highlightedIndex}
              >
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-base leading-tight">
                    {district.name}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Administrative Unit Number: {district.aun}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredDistricts.length === 10 && (
            <div className="flex-shrink-0 px-4 py-3 text-sm text-gray-700 bg-blue-50 border-t border-gray-200">
              <strong>Note:</strong> Showing first 10 results. {inputValue.trim() === '' ? 'Start typing to search all districts.' : 'Continue typing to narrow your search.'}
            </div>
          )}
          {filteredDistricts.length === 0 && inputValue.trim() !== '' && (
            <div className="flex-shrink-0 px-4 py-3 text-sm text-gray-700 bg-gray-50 border-t border-gray-200">
              No districts found matching "{inputValue}". Try a different search term.
            </div>
          )}
        </div>
      )}
    </div>
  );
};