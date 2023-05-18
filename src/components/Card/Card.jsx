import "./Card.scss";
import PropTypes from "prop-types";

const Card = ({ imageUrl, artistName, title }) => {
  return (
    <div
      data-testid="card-item"
      className="card-item"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <h1>{title ? title : "Untitled"}</h1>
      <div className="author-name">
        {artistName ? artistName : "Unknown Artist"}
      </div>
    </div>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string,
  artistName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
