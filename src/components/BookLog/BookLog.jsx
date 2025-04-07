import { Link } from 'react-router';

const BookLog = ({bookLog: {book, status, notes, rating}, handleDeleteBookLog}) => {
    return (
        <section>
            <h2>{book} Log </h2>
            <p>Status: {status}</p>
            <p>Notes: {notes}</p>
            <p>Rating: {rating}</p>
            {/* TODO: Add to= with link to the edit route for the form */}
            <Link>Edit</Link> 
            <button onClick={handleDeleteBookLog}>Delete</button>
        </section>
    );
};

export default BookLog;