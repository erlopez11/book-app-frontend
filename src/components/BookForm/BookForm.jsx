import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { showBookLog } from "../../services/bookService";
import { getCollections } from "../../services/collectionService";

const BookForm = (props) => {
    const { bookId, bookLogId } = useParams();
    const [formData, setFormData] = useState({
        book: props.book.title,
        author: props.book.author,
        thumbnailUrl: props.book.thumbnailUrl,
        status: '',
        notes: '',
        rating: 'no rating',
        collections: '',
    });
    const [collections, setCollections] = useState([]);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

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

    useEffect(() => {
        const fetchCollections = async () => {
            const response = await getCollections();
            setCollections(response);
        };
        fetchCollections();
    }, []);

    return (
        <>
            <h2>Add Book:</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        readOnly
                        type='hidden'
                        name='book'
                        id='book'
                        value={formData.book}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        readOnly
                        type='hidden'
                        name='author'
                        id='author'
                        value={formData.author}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        readOnly
                        type='hidden'
                        name='thumbnailUrl'
                        id='thumbnailUrl'
                        value={formData.thumbnailUrl}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="status">Add To Collection :</label>
                    <select
                        required
                        name="collection"
                        id="collection"
                        value={formData.collection}
                        onChange={handleChange}
                    >
                        <option>Select Collection</option>
                        {collections.map((collection) => (
                            <option key={collection._id} value={collection.id}>
                                {collection.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor='status'>Reading Status:</label>
                    <select
                        required
                        name='status'
                        id='status'
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option>Select Reading Status</option>
                        <option value='want to read'>Want To Read</option>
                        <option value='currently reading'>Currently Reading</option>
                        <option value='read'>Read</option>
                        <option value='did not finish'>Did Not Finish</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='notes'>Notes:</label>
                    <textarea
                        name='notes'
                        id='notes'
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='rating'>Rating:</label>
                    <select
                        required
                        name='rating'
                        id='rating'
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
                    <button type='submit'>Edit Log</button>
                ) : (
                    <button type='submit'>Add {props.book.title}</button>
                )}
            </form>
        </>
    );
};

export default BookForm;
