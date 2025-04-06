import { useState } from 'react';

const BookForm = (props) => {

    const [formData, setFormData] = useState({
        book: props.book.title,
        status: '',
        notes: '',
        rating: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleAddBookLog(formData);
    };

    return (
        <>
            <h2>Add Book:</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='book'>Book:</label>
                    <input
                        required
                        type='text'
                        name='book'
                        id='book'
                        value={formData.book}
                        onChange={handleChange}
                    />
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
                        <option value='want to read'>Want To Read</option>
                        <option value='currently reading'>Currently Reading</option>
                        <option value='read'>Read</option>
                        <option value='did not finish'>Did Not Finish</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='notes'>Notes:</label>
                    <textarea
                        required
                        name='notes'
                        id='notes'
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='rating'>Rating:</label>
                    <input
                        required
                        type='text'
                        name='rating'
                        id='rating'
                        value={formData.rating}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit'>Add {props.book.title}</button>
            </form>
        </>
    );
};

export default BookForm;