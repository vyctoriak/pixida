import "./Card.scss";
import PropTypes from "prop-types";
import imagePlaceholder from "../../assets/image-placeholder.png";

const Card = ({ imageUrl, artistName, title }) => {
  return (
    <div
      data-testid="card-item"
      className="card-item"
      style={
        imageUrl
          ? { backgroundImage: `url(${imageUrl})` }
          : { backgroundImage: `url(${imagePlaceholder})` }
      }
    >
      <h1>{title ? title : "Untitled"}</h1>
      <div className="author-name">
        {artistName ? artistName : "Unknown Artist"}
      </div>
    </div>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
