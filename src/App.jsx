import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import BookDetails from './components/BookDetails/BookDetails';
import CollectionDetails from './components/CollectionDetails/CollectionDetails';
import CollectionForm from './components/CollectionForm/CollectionForm';

import { createCollection, indexCollection, deleteCollection, updateCollection } from './services/collectionService';

import { UserContext } from './contexts/UserContext';


function App() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [collections, setCollections] = useState([]);

  const handleAddCollection = async (collectionFormData) => {
    const newCollection = await createCollection(collectionFormData);
    setCollections([...collections, newCollection]);
    navigate('/collections');
  };

  const handleDeleteCollection = async (collectionId) => {
    const deletedCollectionId = collectionId;
    const deletedCollection = await deleteCollection(collectionId)
    setCollections(collections.filter((collection) => collection._id !== deletedCollectionId));
    navigate('/collections');
  }

  const handleUpdateCollection = async (collectionId, collectionFormData) => {
    const updatedCollection = await updateCollection(collectionId, collectionFormData);
    setCollections(collections.map((collection) => (
      collectionId === collection._id ? updatedCollection : collection
    )));
    navigate(`/collections/${collectionId}`);
  };

  useEffect(() => {
    const fetchAllCollections = async () => {
        const collectionsData = await indexCollection();
        setCollections(collectionsData);
    };
    if (user) fetchAllCollections();
}, [user]);


  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={user ? <Dashboard /> : <Landing />}
        />
        {user ? (
          <>
            <Route
              path="/books/:bookId"
              element={<BookDetails />}
            />
            <Route
              path="/books/:bookId/bookLog/:bookLogId/edit"
              element={<BookDetails />}
            />
            <Route
              path="/collections/new"
              element={<CollectionForm handleAddCollection={handleAddCollection}/>}
            />
            <Route
              path="/collections/:collectionId"
              element={<CollectionDetails handleDeleteCollection={handleDeleteCollection} />}
            />
            <Route
              path="/collections/:collectionId/edit"
              element={<CollectionForm handleUpdateCollection={handleUpdateCollection}/>}
            />
          </>
        ) : (
          <>
            <Route
              path='/sign-up'
              element={<SignUpForm />}
            />
            <Route
              path='/sign-in'
              element={<SignInForm />}
            />
          </>
        )}
      </Routes>
    </>
  )
}

export default App
