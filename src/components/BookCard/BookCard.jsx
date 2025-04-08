const BookCard = ({ title, author, thumbnailUrl }) => {
  return (
    <div>
      <img src={thumbnailUrl} alt={`Cover of ${title}`} />
      <div>
        <p>
          <strong>Title:</strong> {title}
        </p>
        <p>
          <strong>Author:</strong> {author}
        </p>
      </div>
      <button>Add to Collection</button>
    </div>
  );
};

export default BookCard;
