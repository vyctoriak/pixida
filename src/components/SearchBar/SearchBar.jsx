import { useState } from "react";
import PropTypes from "prop-types";
import logo from "../../assets/logo.svg";
import "./SearchBar.scss";
import { Link } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchClick = () => {
    performSearch();
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearchResults = () => {
    setSearchQuery("");
    onSearch("");
  };

  const handleInputKeyDown = (event) => {
    if (event.keyCode === 13) {
      performSearch();
    }
  };

  const performSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="search-bar">
      <div className="logo-and-title">
        <img src={logo} alt="logo" />
        <h4>
          <Link to="/" onClick={clearSearchResults}>
            Art API
          </Link>
        </h4>
      </div>

      <div className="input-and-button">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Please type in your search"
          aria-label="Search"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <button className="btn-primary" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
