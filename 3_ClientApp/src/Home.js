import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:9999/products`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
                console.log(result);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);
    const handleDelete = (id) => {
        if (window.confirm("Do you want to remove?")) {
            fetch(`http://localhost:9999/notification/${id}`, {
                method: "DELETE"
            })
                .then(() => {
                    // Reload the page
                    alert("Delete success.");
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="text-4xl font-bold mb-4">Product Manager</h1>
            {error && <p className="text-danger">{error.message}</p>}
            <Link to="/products/add">Create</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.createdAt}</td>
                            <td>
                                <Link to={`/products/${product._id}`}>Detail</Link>
                                &emsp;&emsp;&emsp;&emsp;&emsp;
                                <Link onClick={() => handleDelete(product._id)}>Delete</Link>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
