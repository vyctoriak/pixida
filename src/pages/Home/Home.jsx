import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";
import Pagination from "../../components/Pagination/Pagination";
import imagePlaceholder from "../../assets/image-placeholder.png";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const [artObjects, setArtObjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const itemsPerPage = 9;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q");
  const history = useNavigate();

  const handleSearch = (query) => {
    const searchParams = new URLSearchParams();
    searchParams.set("q", query);

    if (location.pathname === "/") {
      history(`/?${searchParams.toString()}`);
    } else {
      history(`/art/?${searchParams.toString()}`);
    }
    console.log("arts ---> ", artObjects);
  };

  const fetchArtObjects = async (page, itemsPerPage, searchQuery) => {
    setLoading(true);

    try {
      let apiUrl = `https://www.rijksmuseum.nl/api/en/collection?key=2esrTh6M&ps=${itemsPerPage}&p=${page}`;
      if (searchQuery) {
        const searchTerms = searchQuery.split(" ");

        if (searchTerms.length > 1) {
          const wildCardQuery = searchTerms.map((term) => `${term}+`).join("");
          apiUrl += `&q=${wildCardQuery}`;
        } else {
          apiUrl += `&q=${searchQuery}`;
        }
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      setCount(data.count);
      setArtObjects(data.artObjects);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtObjects(currentPage, itemsPerPage, searchQuery);
  }, [currentPage, itemsPerPage, searchQuery]);

  const totalPages = Math.ceil(count / itemsPerPage);

  return (
    <div className="container">
      <div className="home-content">
        <SearchBar onSearch={handleSearch} />

        <h1>
          {searchQuery
            ? `Found ${count} results for: ${searchQuery}`
            : "All artwork"}
        </h1>

        {loading ? (
          <AiOutlineLoading3Quarters
            className="loading"
            id="loading"
            data-testid="loading"
          />
        ) : (
          <div className="card-container">
            <div className="card-list">
              {artObjects.map((artObject) => (
                <Link
                  to={`/art/${artObject.objectNumber}`}
                  key={artObject.objectNumber}
                >
                  <Card
                    imageUrl={
                      artObject.webImage
                        ? artObject.webImage.url
                        : imagePlaceholder
                    }
                    artistName={artObject.principalOrFirstMaker}
                    title={artObject.title}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <Footer />
    </div>
  );
};

export default Home;
