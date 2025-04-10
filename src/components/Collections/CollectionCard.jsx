import './Collections.css';

const CollectionCard = ({ title, bookCount, books = [], onClick }) => {
  // Get the 4 latest books (or fewer if there are less than 4)
  const latestBooks = books.slice(-4).reverse();
  
  // Fill with placeholders if less than 4 books
  const thumbnails = Array(4).fill(null).map((_, index) => {
    if (index < latestBooks.length) {
      return latestBooks[index].thumbnailUrl || '/img/pictures/coverPlaceholder.jpg';
    }
    return '/img/pictures/coverPlaceholder.jpg';
  });

  return (
    <div className="collection-card" onClick={onClick}>
      <div className="collection-card-image">
        <div className="thumbnail-grid">
          {thumbnails.map((url, index) => (
            <div key={index} className="thumbnail">
              <img src={url} alt={`Book ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="collection-card-content">
        <h3 className="collection-title">{title}</h3>
        <p className="collection-book-count">{bookCount} books</p>
      </div>
      <button className="view-button">View Collection</button>
    </div>
  );
};

export default CollectionCard;
