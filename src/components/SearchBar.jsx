/**
 * SearchBar.jsx
 * 
 * Purpose:
 * Enables students to search and filter notes dynamically by title and subject.
 * As the user types or selects a subject, state in App.jsx updates,
 * filtering the displayed notes in real time.
 */

import React from 'react';
import { SearchIcon, FilterIcon, CloseIcon } from './Icons';
import { SUBJECTS_LIST } from '../data/sampleNotes';

function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  selectedSubject, 
  onSubjectChange, 
  onClearFilters,
  totalResults 
}) {
  const hasActiveFilters = searchTerm.trim() !== '' || selectedSubject !== 'All';

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar-container">
        {/* Title / Keyword search input */}
        <div className="search-input-group">
          <SearchIcon className="search-field-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search notes by title, topic, or keyword..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-input-btn"
              onClick={() => onSearchChange('')}
              title="Clear search text"
              type="button"
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {/* Subject filter dropdown */}
        <div className="filter-select-group">
          <FilterIcon className="filter-field-icon" />
          <select
            className="subject-select"
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            aria-label="Filter by subject"
          >
            {SUBJECTS_LIST.map((subj) => (
              <option key={subj} value={subj}>
                {subj === 'All' ? 'All Subjects' : subj}
              </option>
            ))}
          </select>
        </div>

        {/* Reset button shown when filtering is active */}
        {hasActiveFilters && (
          <button 
            className="btn btn-ghost clear-all-btn"
            onClick={onClearFilters}
            type="button"
          >
            Reset
          </button>
        )}
      </div>

      {/* Results counter indicator */}
      <div className="search-results-info">
        <span>
          Showing <strong>{totalResults}</strong> {totalResults === 1 ? 'note' : 'notes'}
          {selectedSubject !== 'All' && <span> in <em>"{selectedSubject}"</em></span>}
          {searchTerm.trim() !== '' && <span> matching <em>"{searchTerm}"</em></span>}
        </span>
      </div>
    </div>
  );
}

export default SearchBar;
