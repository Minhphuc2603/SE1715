import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:9999/movie/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setMovie(result);
        setGenres(result.genre.name)
      } catch (error) {
        setError(error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <Container className="mt-16">
      <h2 className="text-2xl font-bold mb-4">Movie Detail</h2>
      {error && <p className="text-danger">Error: {error.message}</p>}
      <Card className="custom-card">
        <Card.Body>
          <Card.Title className="h4">{movie.title}</Card.Title>
          <Card.Text className="text-muted">Product ID: {id}</Card.Text>
          <Card.Text>Year: {movie.year}</Card.Text>
          <Card.Text>Genre: {genres}</Card.Text>
          <Link to={"/"} className="btn btn-primary">Back Home</Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MovieDetail;
