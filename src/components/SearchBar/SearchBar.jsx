import logo from "../../assets/logo.svg";
import "./SearchBar.scss";

const SearchBar = () => {
  const handleSearchClick = () => {
    console.log("clicked");
  };

  return (
    <div className="search-bar">
      <div className="logo-and-title">
        <img src={logo} alt="logo" />
        <h4>Art API</h4>
      </div>

      <div className="input-and-button">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Please type in your search"
          aria-label="Search"
        />
        <button className="btn-primary" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
