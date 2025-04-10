import { Link } from 'react-router';

const BookLog = ({bookLog: {book, status, notes, rating, _id, collections}, handleDeleteBookLog, bookId}) => {
    return (
        <section>
            <h2>{book} Log </h2>
            <p>Status: {status}</p>
            <p>Notes: {notes}</p>
            <p>Rating: {rating}</p>
            <p>Collection: {collections}</p>
            <Link to={`/books/${bookId}/bookLog/${_id}/edit`}>Edit</Link> 
            <button onClick={handleDeleteBookLog}>Delete</button>
        </section>
    );
};

export default BookLog;