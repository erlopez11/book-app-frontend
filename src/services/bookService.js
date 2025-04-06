const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/books`;

const show = async (bookId) => {
    try {
        const res = await fetch(`${BASE_URL}/${bookId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

const createBookLog = async (bookId, bookFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${bookId}/bookLog`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookFormData),
        });
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

export {
    show,
    createBookLog,
}