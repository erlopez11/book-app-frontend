import { useState, useEffect } from 'react';
import BookForm from '../BookForm/BookForm';
import BookLog from '../BookLog/BookLog';
import { useParams, useNavigate } from 'react-router';
import { show, createBookLog, deleteBookLog, updateBookLog } from '../../services/bookService';


const BookDetails = () => {
    const [book, setBook] = useState(null);
    const [bookLog, setBookLog] = useState(null);
    const { bookId, bookLogId } = useParams();
    const navigate = useNavigate();


    const handleAddBookLog = async (bookFormData) => {
        const newBookLog = await createBookLog(bookId, bookFormData);
        setBookLog(newBookLog);
    };

    const handleDeleteBookLog = async () => {
        const deletedBookLog = await deleteBookLog(bookId, bookLog._id);
        setBookLog(null);
    };

    const handleUpdateBookLog = async (bookId, bookLogId, bookFormData) => {
        const updatedBookLog = await updateBookLog(bookId, bookLogId, bookFormData);
        setBookLog(updatedBookLog);
        navigate(`/books/${bookId}`);
    }

    useEffect(() => {
        const fetchBook = async () => {
            const bookData = await show(bookId);
            setBook(bookData);
        };
        fetchBook();
    }, [bookId]);

    if (!book) return <main>Loading...</main>

    return (
        <main>
            <section>
                <img src={book.thumbnailUrl} />
                <h1>{book.title}</h1>
                <h2>{book.author}</h2>
                <p>ISBN: {book.isbn}</p>
                <p>Page Count: {book.numberOfPages}</p>
                <div>
                    {book.description}
                </div>
            </section>
            <section>
                {bookLog && !bookLogId ? (
                    <BookLog
                        bookLog={bookLog}
                        handleDeleteBookLog={handleDeleteBookLog}
                        bookId = {bookId}
                    />
                ) : (
                    <BookForm handleAddBookLog={handleAddBookLog} handleUpdateBookLog={handleUpdateBookLog} book={book} />
                )}
            </section>
        </main>
    );
};

export default BookDetails;