import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProducts = () => {
    const [genre, setGenres] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:9999/genre");
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setGenres(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Failed to fetch categories");
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const product = { title, year, genre: selectedCategory };
                const response = await fetch('http://localhost:9999/movie/create', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(product)
                });
                console.log(response)

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("Unauthorized: Access token is invalid or expired.");
                    } else {
                        const errorData = await response.json();
                        throw new Error(errorData.message);
                    }
                }
                toast.success("Add successful");
                navigate("/");
            } catch (error) {
                console.error('Error adding product:', error);
                console.log('Error stack:', error.stack);
                

            }
        }
    };



    const validateForm = () => {
        let isValid = true;

        if (!title || title.trim() === "") {
            isValid = false;
            console.log("Invalid title");
        }
        if (!year || year.trim() === "" || year <= 0) {
            isValid = false;
            console.log("Invalid year");
        }
        if (!selectedCategory || selectedCategory.trim() === "") {
            isValid = false;
            console.log("Genre is required");
        }

        return isValid;
    }

    return (
        <Col className="offset-md-2 col-md-8" style={{ border: "1px solid red", marginTop: "100px", padding: "30px" }}>
            <Row>
                <Col style={{ textAlign: "center" }}>
                    <h3>Add Movie</h3>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6} className="offset-md-3">
                                <Form.Group>
                                    <Form.Text>
                                        Title <span style={{ color: "red" }}>*</span>
                                    </Form.Text>
                                    <Form.Control
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} className="offset-md-3">
                                <Form.Group>
                                    <Form.Text>Year</Form.Text>
                                    <Form.Control type="number" value={year} onChange={e => setYear(e.target.value)} />
                                    {year <= 0 && <Form.Text style={{ color: 'red' }}>Please enter year &gt; 0</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} className="offset-md-3">
                                <Form.Group>
                                    <Form.Text>
                                        Genre <span style={{ color: "red" }}>*</span>
                                    </Form.Text>
                                    <Form.Control
                                        as="select"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="">Select genre</option>
                                        {genre.map((genre, index) => (
                                            <option key={index} value={genre._id}>{genre.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} className="offset-md-3" style={{ textAlign: "center", paddingTop: "20px" }}>
                                <Button className="btn btn-success" type="submit">Save</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Link to={"/"} className="btn btn-danger">Back Home</Link>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Col>
    );
};

export default AddProducts;
