const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/collections`;

const indexCollection = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        return res.json();
    } catch (error) {
        console.error(error);
    }
}

const showCollection = async (collectionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${collectionId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

const deleteCollection = async (collectionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${collectionId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
        return res.json('Delete Successful!');
    } catch (error) {
        console.error(error);
    }
};

const updateCollection = async (collectionId, collectionFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${collectionId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collectionFormData),
        });
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

export {
    showCollection,
    indexCollection,
    deleteCollection,
    updateCollection,
}