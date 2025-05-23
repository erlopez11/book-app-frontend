import { useState, useEffect, useCallback } from "react";
import BookCard from "../BookCard/BookCard";
import "./BookGrid.css";
import { getAllBooks } from "../../services/bookService";
import { useNavigate, useSearchParams } from "react-router";

const BookGrid = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 12; // Number of books per page (3 rows, 4 columns)
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q")
    ? searchParams.get("q")
    : "award winning";

  const navigateToBookDetails = (id) => {
    navigate(`/books/${id}`);
  };
  const fetchBooks = useCallback(
    async (index) => {
      try {
        setLoading(true);
        // Fetch books from Google Books API with pagination
        const books = await getAllBooks(searchQuery, index, maxResults);
        setBooks(books);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    fetchBooks(startIndex);
  }, [startIndex, fetchBooks]);

  const handlePrevious = () => {
    if (startIndex >= maxResults) {
      setStartIndex(startIndex - maxResults);
    }
  };

  const handleNext = () => {
    setStartIndex(startIndex + maxResults);
  };

  return (
    <div className="book-grid-container">
      {loading ? (
        <div className="loading">Loading books...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <>
          {books.length > 0 ? (
            <>
              <div className="book-grid">
                {books.map((book) => (
                  <div key={book.id} className="book-card-wrapper">
                    <BookCard
                      id={book.id}
                      title={book.title}
                      author={book.author}
                      thumbnailUrl={book.thumbnailUrl}
                      onClick={() => navigateToBookDetails(book.id)}
                    />
                  </div>
                ))}
              </div>
              <div className="pagination">
                <button
                  className="pagination-button"
                  onClick={handlePrevious}
                  disabled={startIndex === 0}
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {Math.floor(startIndex / maxResults) + 1}
                </span>
                <button className="pagination-button" onClick={handleNext}>
                  Next
                </button>
              </div>
            </>
          ) : (
            <div>
              <h1 style={{ color: "rgba(255, 255, 255, 0.87)" }}>
                No books found :(
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookGrid;
