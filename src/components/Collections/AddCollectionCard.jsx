import './Collections.css';

const AddCollectionCard = ({ onAddCollection }) => {
  const handleClick = () => {
    // Just a placeholder - form will be implemented by Elainy
    console.log('Add collection clicked');
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
