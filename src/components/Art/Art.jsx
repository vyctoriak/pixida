import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";
import imagePlaceholder from "../../assets/image-placeholder.png";
import backIcon from "../../assets/Icons/back.png";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Art.scss";

const Art = () => {
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let { id } = useParams();
  let history = useNavigate();

  async function getArt(id) {
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.rijksmuseum.nl/api/en/collection/${id}?key=2esrTh6M`
      );
      const data = await response.json();
      setArt(data.artObject);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getArt(id);
  }, [id]);

  const renderDimensions = () => {
    if (art && art.dimensions && art.dimensions.length > 0) {
      const dimensions = art.dimensions;
      let dimensionString = "";

      dimensions.forEach((dimension, index) => {
        if (dimension.value) {
          dimensionString += `${dimension.type} ${dimension.value}cm`;
          if (index !== dimensions.length - 1) {
            dimensionString += " x ";
          }
        }
      });

      return (
        <>
          <div>{dimensionString}</div>
        </>
      );
    } else {
      return (
        <>
          <div>No dimensions provided</div>
        </>
      );
    }
  };

  if (error) {
    return (
      <div className="container art" data-testid="art">
        <div>Error occurred: {error.message}</div>
      </div>
    );
  }

  const handleSearch = (query) => {
    history(`/?q=${query}`);
  };

  return (
    <div className="container art" data-testid="art">
      <div className="art-content">
        <SearchBar onSearch={(query) => handleSearch(query)} />

        <div className="go-back">
          <img src={backIcon} alt="back icon" />
          <span>
            <Link to="/">Back to the list</Link>
          </span>
        </div>

        {loading ? (
          <AiOutlineLoading3Quarters
            className="loading"
            data-testid="loading-spinner"
          />
        ) : (
          art && (
            <>
              <div
                className="art-image-and-title"
                style={{
                  backgroundImage: art?.webImage?.url
                    ? `url(${art.webImage.url})`
                    : `url(${imagePlaceholder})`,
                }}
              >
                {art.longTitle}
              </div>
              <div className="info-table">
                <span>Title</span>
                <div>{art.longTitle ? art.longTitle : "No title provided"}</div>
                <span>Artist</span>
                <div>{`${art.principalMaker}`}</div>
                <span>Object Type</span>
                <div>
                  {art.objectTypes == 0
                    ? "No object type provided"
                    : art.objectTypes[0]}
                </div>
                <span>Measurements</span>
                <div>{renderDimensions()}</div>
                <span>Description</span>
                <div>
                  {art?.label?.description
                    ? art.label.description
                    : "No description provided"}
                </div>
              </div>
            </>
          )
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Art;
