import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { showCollection } from '../../services/collectionService';

const CollectionForm = (props) => {
    const { collectionId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (collectionId) {
            props.handleUpdateCollection(collectionId, formData);
        } else {
            props.handleAddCollection(formData);
        };

        setFormData({
            title: '',
            description: '',
        })
    };

    useEffect(() => {
        const fetchCollection = async () => {
            const collectionData = await showCollection(collectionId);
            setFormData(collectionData);
        };
        if (collectionId) fetchCollection();
        return () => setFormData({
            title: '',
            description: '',
        })
    }, [collectionId]);

    return (
        <main>
            <h1>{collectionId ? 'Edit Collection' : 'Add New Collection'}</h1>
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
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                {collectionId ? (<>
                    <button type='submit'>Update Collection</button>
                </>) : (<>
                    <button type='submit'>Add Collection</button>
                </>)}
            </form>
        </main>
    );
}

export default CollectionForm;