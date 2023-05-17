import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import backIcon from "../../assets/Icons/back.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Art.scss";

const Art = () => {
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(false);

  let { id } = useParams();

  async function getArt(id) {
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.rijksmuseum.nl/api/en/collection/${id}?key=2esrTh6M`
      );
      const data = await response.json();
      console.log(" data art  ===> ", data.artObject);
      setArt(data.artObject);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getArt(id);
  }, [id]);

  return (
    <div className="container art">
      <div className="art-content">
        <SearchBar />
        <div className="go-back">
          <img src={backIcon} alt="back icon" />
          <span>
            <Link to="/">Back to the list</Link>
          </span>
        </div>

        {loading ? (
          <AiOutlineLoading3Quarters className="loading" />
        ) : (
          art && (
            <>
              <div
                className="art-image-and-title"
                style={{
                  backgroundImage: `url(${art.webImage.url})`,
                }}
              >
                {art.ngTitle}
              </div>
              <div className="info-table">
                <span>Title</span>
                <div>{`${art.longTitle}`}</div>
                <span>Artist</span>
                <div>{`${art.principalMaker}`}</div>
                <span>Object Type</span>
                <div>{`${art.objectTypes[0]}`}</div>
                <span>Measurements</span>
                <div>{`height ${art.dimensions[0].value}cm x widht ${art.dimensions[1].value}cm x depth ${art.dimensions[2].value}cm`}</div>
                <span>Description</span>
                <div>{`${art.label.description}`}</div>
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
