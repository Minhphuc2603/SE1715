import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:9999/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setProduct(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <Container className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Product Detail</h2>
      {error && <p className="text-danger">Error: {error.message}</p>}
      <Card className="custom-card">
        <Card.Body>
          <Card.Title className="h4">{product.name}</Card.Title>
          <Card.Text className="text-muted">Product ID: {id}</Card.Text>
          <Card.Text>Description: {product.description}</Card.Text>
          <Card.Text>Price: {product.price}</Card.Text>
          <Card.Text>Category: {product.category}</Card.Text>
          <Card.Text className="text-muted">Created At: {product.createdAt}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetail;
