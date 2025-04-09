import { useState, useEffect } from 'react';
import BookForm from '../BookForm/BookForm';
import BookLog from '../BookLog/BookLog';
import { useParams, useNavigate } from 'react-router';
import { showBook, createBookLog, deleteBookLog, updateBookLog } from '../../services/bookService';

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
    const[message, setMessage] = useState('');
    const { bookId, bookLogId } = useParams();
    const navigate = useNavigate();


    const handleAddBookLog = async (bookFormData) => {
        const newBookLog = await createBookLog(bookId, bookFormData);
        setBookLog(newBookLog);
        setMessage('');
    };

    const handleDeleteBookLog = async () => {
        const deletedBookLog = await deleteBookLog(bookId, bookLog._id);
        setBookLog(null);
        setMessage('Delete Successful!');
    };

    const handleUpdateBookLog = async (bookId, bookLogId, bookFormData) => {
        const updatedBookLog = await updateBookLog(bookId, bookLogId, bookFormData);
        setBookLog(updatedBookLog);
        navigate(`/books/${bookId}`);
    }

    useEffect(() => {
        const fetchBook = async () => {
            const bookData = await showBook(bookId);
            setBook(bookData);
        };
        fetchBook();
    }, [bookId]);

    if (!book) return <main>Loading...</main>

    return (
        <main>
            <section>
                <img src={book[0].thumbnailUrl} />
                <h1>{book[0].title}</h1>
                <h2>{book[0].author}</h2>
                <p>ISBN: {book[0].isbn}</p>
                <p>Page Count: {book[0].numberOfPages}</p>
                <div>
                    {removeHTMLTags(book[0].description)}
                </div>
            </section>
            <section>
                <p>{message}</p>
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