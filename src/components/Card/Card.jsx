import "./Card.scss";
import PropTypes from "prop-types";

const Card = ({ imageUrl, artistName, title }) => {
  return (
    <div
      data-testid="card-item"
      className="card-item"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 34.32%, rgba(0, 0, 0, 0.72) 72.5%), url(${imageUrl})`,
      }}
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
