import { useNavigate } from 'react-router';
import './Collections.css';

const AddCollectionCard = ({ onAddCollection }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/collections/new');
  };

  return (
    <div className="collection-card add-collection-card" onClick={handleClick}>
      <div className="collection-card-content add-collection-content">
        <h3 className="collection-title">+ Add a collection</h3>
      </div>
    </div>
  );
};

export default AddCollectionCard;
