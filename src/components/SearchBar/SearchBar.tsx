import React from 'react';
import { ReactComponent as SearchIcon } from '../../assets/searchIcon.svg';
import './SearchBar.scss';

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      <input placeholder="SEARCH PAWZ..." type="text" className="search-input" />
      <span className="search-icon">
        <SearchIcon />
      </span>
      <button className="search-all">All</button>
      <button className="search-sort">Sort</button>
    </div>
  );
};

export default SearchBar;
