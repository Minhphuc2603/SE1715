import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:9999/movie`);
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
    
    const handleSearch = () => {

        const filteredData = data.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filteredData;
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <h1 className="text-4xl font-bold mb-4">List of Movie</h1>
                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {error && <p className="text-danger">{error.message}</p>}
            <div className="d-flex justify-content-between mb-3">
                <Link to="/movie/add" className="btn btn-primary">Create</Link>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>genre</th>
                        {/* <th>Created At</th> */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {handleSearch().map((m) => (
                        <tr key={m._id}>
                            <td>{m._id}</td>
                            <td>{m.title}</td>
                            <td>{m.year}</td>
                            <td>{m.genre.name}</td>
                            {/* <td>{product.createdAt}</td> */}
                            <td>
                                <Link style={{ marginRight: 10 }} to={`/movie/${m._id}`}>Detail</Link>

                                <Link style={{ marginRight: 10 }} to={`/edit/${m._id}`}>Edit</Link>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
