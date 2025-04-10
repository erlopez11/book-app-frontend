const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/collections`;

// Get all collections for the current user
export const getCollections = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch collections');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
};

// Get a specific collection by ID
export const getCollection = async (collectionId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${BASE_URL}/${collectionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch collection');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
};

// Create a new collection
export const createCollection = async (collectionData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(collectionData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create collection');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error;
  }
};

// Update an existing collection
export const updateCollection = async (collectionId, collectionData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${BASE_URL}/${collectionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(collectionData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update collection');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating collection:', error);
    throw error;
  }
};

// Delete a collection
export const deleteCollection = async (collectionId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${BASE_URL}/${collectionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete collection');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting collection:', error);
    throw error;
  }
};

//QUAN: This is what I have been using for adding the collection and the
//addToBooks is invoked in handleAddBookLog  fn in book details

// Add a book to a collection
export const addBookToCollection = async (collectionId, bookId, bookFormData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const collection = await getCollection(collectionId);
    console.log(collection);
    const updatedBooks = [...collection.books, bookFormData];
    console.log(updatedBooks);

    return await updateCollection(collectionId, { books: updatedBooks });
  } catch (error) {
    console.error('Error adding book to collection:', error);
    throw error;
  }
};
