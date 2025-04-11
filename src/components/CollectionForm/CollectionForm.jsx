import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { getCollection } from '../../services/collectionService';
import BookGrid from '../BookGrid/BookGrid';
import './CollectionForm.css';

const CollectionForm = (props) => {
    const { collectionId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q");

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
            const collectionData = await getCollection(collectionId);
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
            {searchQuery ? (
                // If there's a search query, show the BookGrid component
                <BookGrid />
            ) : (
                // Otherwise, show the collection form
                <>
                    <div className='collection-form-container'>
                        <h1>{collectionId ? 'Edit Collection' : 'Add New Collection'}</h1>
                        <form className="collection-form" onSubmit={handleSubmit}>
                            <div className='form-data'>
                                <label htmlFor='title'>Collection Title:</label>
                                <input
                                    type='text'
                                    name='title'
                                    id='title'
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-data'>
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
                                <button className='collection-form-btn' type='submit'>Update Collection</button>
                            </>) : (<>
                                <button className='collection-form-btn' type='submit'>Add Collection</button>
                            </>)}
                        </form>
                    </div>
                </>
            )}
        </main>
    );
}

export default CollectionForm;
