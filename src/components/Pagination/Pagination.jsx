import PropTypes from "prop-types";
import "./Pagination.scss";
import right from "../../assets/Icons/right.png";
import left from "../../assets/Icons/left.png";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <ul>
        <li onClick={handlePreviousPage}>
          <img src={left} alt="left arrow icon" />
        </li>
        <li
          onClick={() => handlePageClick(currentPage)}
          className="current-page"
        >
          {currentPage}
        </li>
        {/* {currentPage < totalPages && (
          <> */}
        <li onClick={() => handlePageClick(currentPage + 1)}>
          {currentPage + 1}
        </li>
        <li>...</li>
        {/* <li onClick={() => handlePageClick(totalPages)}>{totalPages}</li> */}
        {/* </>
        )} */}
        <li onClick={handleNextPage}>
          <img src={right} alt="right arrow icon" />
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
