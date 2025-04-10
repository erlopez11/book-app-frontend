import './BookCard.css';

const BookCard = ({ title, author, thumbnailUrl }) => {
  return (
    <div className="book-card">
      <div className="book-card-image">
        <img src={thumbnailUrl} alt={`Cover of ${title}`} />
      </div>
      <div className="book-card-content">
        <p className="book-title"><strong>Title:</strong> {title}</p>
        <p className="book-author"><strong>Author:</strong> {author}</p>
      </div>
      <button className="add-button">Add to Collection</button>
    </div>
  );
};

export default BookCard;
