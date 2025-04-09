import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { showCollection } from '../../services/collectionService';

const CollectionDetails = (props) => {
    const [collection, setCollection] = useState(null);
    const { collectionId } = useParams();

    useEffect(() => {
        const fetchCollection = async () => {
            const collectionData = await showCollection(collectionId);
            setCollection(collectionData);
        };
        fetchCollection();
    }, [collectionId]);

    if (!collection) return <main>Loading...</main>


    return (
        <main>
            <header>
                <h1>{collection.title}</h1>
                <p>{collection.description}</p>
            
                <Link to={`/collections/${collectionId}/edit`}>Edit</Link>

                <button onClick={() => props.handleDeleteCollection(collectionId)}>Delete</button>

            </header>

            <section>

            </section>

        </main>
    );
}

export default CollectionDetails;