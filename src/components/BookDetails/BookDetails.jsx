import { useState, useEffect } from 'react';
import BookForm from '../BookForm/BookForm';
import { useParams } from 'react-router';
import { show, createBookLog } from '../../services/bookService';


const BookDetails = () => {
    const [book, setBook] = useState(null);
    const [bookLog, setBookLog] =useState(null);
    const { bookId } = useParams();

    const handleAddBookLog = async (bookFormData) => {
        const newBookLog = await createBookLog(bookId, bookFormData);
        setBookLog({...bookLog, newBookLog });
    };

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
                <BookForm handleAddBookLog={handleAddBookLog} book={book}/>
            </section>
        </main>
    );
};

export default BookDetails;