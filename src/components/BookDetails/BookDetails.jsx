import { useState, useEffect } from "react";
import BookForm from "../BookForm/BookForm";
import BookLog from "../BookLog/BookLog";
import BookGrid from "../BookGrid/BookGrid";
import { useParams, useNavigate, useSearchParams } from "react-router";
import {
  show,
  createBookLog,
  deleteBookLog,
  updateBookLog,
  showBookLog,
} from "../../services/bookService";
import {
  getCollections,
  removeBookFromCollection,
} from "../../services/collectionService";
import './BookDetails.css';

const removeHTMLTags = (string) => {
  try {
    let parsedString = new DOMParser().parseFromString(string, "text/html");
    return parsedString.body.textContent;
  } catch (error) {
    console.error(error);
    return string;
  }
};

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const [bookLog, setBookLog] = useState(null);
  const [collections, setCollections] = useState([]);
  const { bookId, bookLogId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const currentCollection = collections.find((collection) =>
    collection.books.find((book) => book.googleId === bookId)
  );

  const fetchCollections = async () => {
    const collectionData = await getCollections();
    setCollections(collectionData);
  };

  const handleAddBookLog = async (bookFormData) => {
    const newBookLog = await createBookLog(bookId, bookFormData);

    fetchCollections();
    setBookLog(newBookLog);
  };

  const handleDeleteBookLog = async () => {
    const deletedBookLog = await deleteBookLog(bookId, bookLog._id);
    if (currentCollection) {
      await removeBookFromCollection(currentCollection._id, bookId);
    }
    setBookLog(null);
  };

  const handleUpdateBookLog = async (bookId, bookLogId, bookFormData) => {
    const updatedBookLog = await updateBookLog(bookId, bookLogId, bookFormData);
    setBookLog(updatedBookLog);
    navigate(`/books/${bookId}`);
  };

  useEffect(() => {
    const fetchBook = async () => {
      const bookData = await show(bookId);
      setBook(bookData);
    };
    const fetchBookLog = async () => {
      const bookLogData = await showBookLog(bookId);
      setBookLog(bookLogData);
    };

    fetchBook();
    fetchCollections();
    fetchBookLog();
  }, [bookId]);

  if (!book) return <main>Loading...</main>;

  return (
    <main className="book-details-container">
      {searchQuery ? (
        // If there's a search query, show the BookGrid component
        <BookGrid />
      ) : (
        // Otherwise, show the book details
        <>
          <section className="book-details">
            <img src={book.thumbnailUrl} />
            <div className="book-details-text">
              <h1>{book.title}</h1>
              <h2>{book.author}</h2>
              <p><span className="bold-text">ID:</span> {book.id}</p>
              <p><span className="bold-text">Page Count:</span> {book.numberOfPages}</p>
              <div>
                {removeHTMLTags(book.description)}
              </div>
            </div>
          </section>
          <section className="book-data">
            {bookLog && !bookLogId ? (
              <BookLog
                bookLog={bookLog}
                handleDeleteBookLog={handleDeleteBookLog}
                bookId={bookId}
                currentCollection={currentCollection}
              />
            ) : (
              <BookForm
                handleAddBookLog={handleAddBookLog}
                handleUpdateBookLog={handleUpdateBookLog}
                book={book}
                collections={collections} />
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default BookDetails;
