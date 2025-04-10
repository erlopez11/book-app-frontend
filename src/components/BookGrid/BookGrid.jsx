import { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import './BookGrid.css';

const BookGrid = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 12; // Number of books per page (3 rows, 4 columns)

  const fetchBooks = async (index) => {
    try {
      setLoading(true);
      // Fetch books from Google Books API with pagination
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=${maxResults}&startIndex=${index}&orderBy=relevance`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        setBooks([]);
        setError('No books found.');
        setLoading(false);
        return;
      }
      
      // Transform data to match BookCard component props
      const formattedBooks = data.items.map(book => ({
        id: book.id,
        title: book.volumeInfo.title || 'Unknown Title',
        author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown Author',
        thumbnailUrl: book.volumeInfo.imageLinks?.thumbnail || ''
      }));
      
      setBooks(formattedBooks);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(startIndex);
  }, [startIndex]);

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
          <div className="book-grid">
            {books.map(book => (
              <div key={book.id} className="book-card-wrapper">
                <BookCard 
                  title={book.title}
                  author={book.author}
                  thumbnailUrl={book.thumbnailUrl}
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
            <span className="page-info">Page {Math.floor(startIndex / maxResults) + 1}</span>
            <button 
              className="pagination-button" 
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookGrid;
