import "./Card.scss";
import PropTypes from "prop-types";

const Card = ({ imageUrl, artistName, title }) => {
  return (
    <div
      className="card-item"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <h1>{title}</h1>
      <div className="author-name">{artistName}</div>
    </div>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
