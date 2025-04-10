import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import CollectionCard from './CollectionCard';
import AddCollectionCard from './AddCollectionCard';
import { getCollections, createCollection } from '../../services/collectionService';
import './Collections.css';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const data = await getCollections();
      setCollections(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching collections:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  // This will be implemented by Elainy
  const handleAddCollection = () => {
    console.log('Add collection clicked');
  };

  const handleCollectionClick = (collectionId) => {
    navigate(`/collections/${collectionId}`);
  };

  return (
    <div className="collections-container">
      
      {loading && collections.length === 0 ? (
        <div className="loading">Loading collections...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <div className="collection-grid">
          <AddCollectionCard onAddCollection={handleAddCollection} />
          
          {collections.map(collection => (
            <div key={collection._id} className="collection-card-wrapper">
              <CollectionCard 
                title={collection.title}
                bookCount={collection.books ? collection.books.length : 0}
                books={collection.books || []}
                onClick={() => handleCollectionClick(collection._id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
