import { useContext } from 'react';
import { Routes, Route } from 'react-router';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import BookGrid from './components/BookGrid/BookGrid';
import BookDetails from './components/BookDetails/BookDetails';
import Collections from './components/Collections/Collections';
import CollectionDetails from './components/CollectionDetails/CollectionDetails';

import { UserContext } from './contexts/UserContext';


function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={user ? <BookGrid /> : <Landing />}
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
              path="/collections"
              element={<Collections />}
            />
            <Route
              path="/collections/:collectionId"
              element={<CollectionDetails />}
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
