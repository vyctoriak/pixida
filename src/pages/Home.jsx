import Card from "../components/Cards/Card";
import "./Home.scss";
import SearchBar from "../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [artObjects, setArtObjects] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchArtObjects() {
    setLoading(true);

    try {
      const response = await fetch(
        "https://www.rijksmuseum.nl/api/en/collection?key=2esrTh6M&ps=10&p=1"
      );
      const data = await response.json();
      console.log(data.artObjects);
      setArtObjects(data.artObjects);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArtObjects();
  }, []);

  return (
    <div className="conteiner">
      <SearchBar />
      <h1>All artwork</h1>
      <div className="card-list">
        {artObjects.map((artObject) => (
          <Link to="#" key={artObject.id}>
            <Card
              imageUrl={artObject.webImage.url}
              artistName={artObject.principalOrFirstMaker}
              title={artObject.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
