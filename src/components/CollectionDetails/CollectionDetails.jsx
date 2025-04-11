import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { getCollection } from "../../services/collectionService";
import BookCard from "../BookCard/BookCard";
import BookGrid from "../BookGrid/BookGrid";
import './CollectionDetails.css';

const CollectionDetails = (props) => {
    const [collection, setCollection] = useState(null);
    const { collectionId } = useParams();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCollection = async () => {
            const collectionData = await getCollection(collectionId);
            setCollection(collectionData);
        };
        fetchCollection();
    }, [collectionId]);

    if (!collection) return <main>Loading...</main>;

    return (
        <main>
            {searchQuery ? (
                // If there's a search query, show the BookGrid component
                <BookGrid />
            ) : (
                // Otherwise, show the collection details
                <>
                    <div className='collection-details-container'>
                        <header className='collection-details-header'>
                            <div>
                                <h1>{collection.title}</h1>
                                <p>{collection.description}</p>
                            </div>
                            <div className='collection-details-btns'>
                                <Link className='collection-link-btn' to={`/collections/${collectionId}/edit`}>Edit</Link>

                                <button className='collection-delete-btn' onClick={() => props.handleDeleteCollection(collectionId)}>Delete</button>

                            </div>

                        </header>

                        <section className='collection-books-grid'>
                            {collection.books.map((book) => (
                                <BookCard
                                    key={book._id}
                                    title={book.title}
                                    author={book.author}
                                    thumbnailUrl={book.thumbnailUrl}
                                    onClick={() => navigate(`/books/${book.googleId}`)}
                                    shouldShowAddButton={false}
                                />
                            ))}
                        </section>

                    </div>
                </>
            )}
        </main>
    );
};

export default CollectionDetails;
