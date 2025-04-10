import { useState, useEffect } from "react";
import BookForm from "../BookForm/BookForm";
import BookLog from "../BookLog/BookLog";
import { useParams, useNavigate } from "react-router";
import {
    show,
    createBookLog,
    deleteBookLog,
    updateBookLog,
} from "../../services/bookService";
import { getCollections } from '../../services/collectionService';

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
    const [collections, setCollection] = useState([]);
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
    };

    useEffect(() => {
        const fetchBook = async () => {
            const bookData = await show(bookId);
            setBook(bookData);
        };
        const fetchCollections = async () => {
            const collectionData = await getCollections();
            setCollection(collectionData);
        };

        fetchBook();
        fetchCollections();
    }, [bookId]);

    if (!book) return <main>Loading...</main>;

    return (
        <main>
            <section>
                <img src={book.thumbnailUrl} />
                <h1>{book.title}</h1>
                <h2>{book.author}</h2>
                <p>ID: {book.id}</p>
                <p>Page Count: {book.numberOfPages}</p>
                <div>
                    {removeHTMLTags(book.description)}
                </div>
            </section>
            <section>
                {bookLog && !bookLogId ? (
                    <BookLog
                        bookLog={bookLog}
                        handleDeleteBookLog={handleDeleteBookLog}
                        bookId={bookId}
                    />
                ) : (
                    <BookForm handleAddBookLog={handleAddBookLog} handleUpdateBookLog={handleUpdateBookLog} book={book} collections={collections} />
                )}
            </section>
        </main>
    );
};

export default BookDetails;
