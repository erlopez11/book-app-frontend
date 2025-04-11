import "./BookCard.css";

const BookCard = ({ id, title, author, thumbnailUrl, onClick }) => {
  // Use placeholder image if thumbnailUrl is not available
  const coverImage = thumbnailUrl
    ? thumbnailUrl
    : "/img/icons/coverPlaceholder.jpg";

  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-card-image">
        <img src={coverImage} alt={`Cover of ${title}`} />
      </div>
      <div className="book-card-content">
        <p className="book-title">
          <strong>Title:</strong> {title}
        </p>
        <p className="book-author">
          <strong>Author:</strong> {author}
        </p>
      </div>
      <button className="add-button">Add to Collection</button>
    </div>
  );
};

export default BookCard;
