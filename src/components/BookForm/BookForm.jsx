import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { showBookLog } from "../../services/bookService";
import { addBookToCollection } from "../../services/collectionService"
import './BookForm.css';

const BookForm = (props) => {
  const { bookId, bookLogId } = useParams();
  const [formData, setFormData] = useState({
    book: bookId,
    author: props.book.author,
    thumbnailUrl: props.book.thumbnailUrl,
    status: "want to read",
    notes: "",
    rating: "no rating",
    collection: "",
  });
  const navigate = useNavigate();
  // Use collections from props if available, otherwise use empty array
  const collections = props.collections || [];

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // If a collection is selected, add the book to the collection
    if (formData.collection && formData.collection !== "Select Collection") {
      try {
        await addBookToCollection(formData.collection, props.book.id);
        console.log("Book added to collection successfully");
      } catch (error) {
        console.error("Error adding book to collection:", error);
      }
    }

    if (bookId && bookLogId) {
      props.handleUpdateBookLog(bookId, bookLogId, formData);
      navigate(`/books/${bookId}`);
    } else {
      props.handleAddBookLog(formData);
    }
  };

  useEffect(() => {
    const fetchBookLog = async () => {
      const bookLogData = await showBookLog(bookId, bookLogId);
      setFormData(bookLogData);
    };
    if (bookId && bookLogId) fetchBookLog();
  }, [bookId, bookLogId]);

  return (
    <>
      <div className="book-form-container">
        <h2>Add Book:</h2>
        <form className="book-form" onSubmit={handleSubmit}>
          <div>
            <input
              readOnly
              type="hidden"
              name="book"
              id="book"
              value={formData.book}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              readOnly
              type="hidden"
              name="author"
              id="author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              readOnly
              type="hidden"
              name="thumbnailUrl"
              id="thumbnailUrl"
              value={formData.thumbnailUrl}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="status"><span className="bold-text">Add To Collection</span> :</label>
            <select
              required
              name="collection"
              id="collection"
              value={formData.collection}
              onChange={handleChange}
            >
              <option>Select Collection</option>
              {collections.map((collection) => (
                <option key={collection._id} value={collection._id}>
                  {collection.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status"><span className="bold-text">Reading Status:</span></label>
            <select
              required
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="want to read">Want To Read</option>
              <option value="currently reading">Currently Reading</option>
              <option value="read">Read</option>
              <option value="did not finish">Did Not Finish</option>
            </select>
          </div>
          <div>
            <label htmlFor="notes"><span className="bold-text">Notes:</span></label>
            <textarea
              name="notes"
              id="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="rating"><span className="bold-text">Rating:</span></label>
            <select
              required
              name="rating"
              id="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="no rating">No Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          {bookLogId ? (
            <button className="book-form-btn" type="submit">Edit Log</button>
          ) : (
            <button className="book-form-btn" type="submit">Add {props.book.title}</button>
          )}
        </form>
      </div>
    </>
  );
};

export default BookForm;
