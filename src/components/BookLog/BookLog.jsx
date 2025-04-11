import { Link } from 'react-router';
import './BookLog.css';

const BookLog = ({ bookLog: { book, status, notes, rating, _id, collection }, handleDeleteBookLog, bookId }) => {
    return (
        <section className='book-log-container'>
            <h2>{book} Log </h2>
            <div className='book-log-details'>
                <div>
                    <p><span className='bold-text'>Reading Status:</span></p>
                    <p>{status}</p>
                </div>
                <div>
                    <p><span className='bold-text'>Notes:</span></p>
                    <p>{notes}</p>
                </div>
                <div>
                    <p><span className='bold-text'>Rating:</span></p>
                    <p>{rating}</p>
                </div>
                <div>
                    <p><span className='bold-text'>Collection:</span></p>
                    <p>{collection}</p>
                </div>

                <Link className="link-btn" to={`/books/${bookId}/bookLog/${_id}/edit`}>Edit</Link>
                <button className='delete-btn' onClick={handleDeleteBookLog}>Delete</button>

            </div>
        </section>
    );
};

export default BookLog;