import React, { useContext, useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import { UserContext } from "../../contexts/UserContext";
import { getAllBooks } from "../../services/bookService";

const BookGrid = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.username) {
      return;
    }

    getAllBooks()
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, [user]);

  return (
    <div>
      {books.map((book) => (
        <BookCard
          key={book.isbn}
          title={book.title}
          author={book.author}
          thumbnailUrl={book.thumbnailUrl}
        />
      ))}
    </div>
  );
};

export default BookGrid;
