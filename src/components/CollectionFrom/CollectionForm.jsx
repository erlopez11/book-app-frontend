import { useState } from 'react';

const CollectionForm = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setFormData({
            title: '',
            description: '',
        })
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Collection Title:</label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <input
                        type='text'
                        name='description'
                        id='description'
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit'>Add Collection</button>
            </form>
        </main>
    );
}

export default CollectionForm;