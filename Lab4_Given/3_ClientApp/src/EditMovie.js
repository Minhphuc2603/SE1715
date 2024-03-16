import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditMovie = () => {
    const [genre, setGenres] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");

    const {id} = useParams();


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
                // Handle error appropriately (e.g., show error message to the user)
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:9999/movie/" + id);
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setTitle(data.title);
                setYear(data.year);
                setSelectedCategory(data.genre.name);
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Handle error appropriately (e.g., show error message to the user)
            }
        };

        fetchCategories();
    }, []);

    // const IsValidate = () => {
    //     let isproceed = true;

    //     if (!title || title.trim() === "") {
    //         isproceed = false;
    //     }
    //     if (!year || year.trim() === "" || year <= 0) {
    //         isproceed = false;
    //     }
    //     if (!selectedCategory || selectedCategory.trim() === "") {
    //         isproceed = false;
    //     }

    //     return isproceed;
    // }

    const handelSubmit = (e) => {
        e.preventDefault();
        // if (IsValidate()) {
            const product = { title: title, year: year, genre: selectedCategory, };
            console.log(product);
            fetch( `http://localhost:9999/movie/edit/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(product)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to add product');
                    }
                    return response.json();
                })
                .then(() => {
                    toast.success("Add successful")
                    navigate("/");
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                    // Xử lý lỗi
                });
        
    };






    return (
        <Col className="offset-md-2 col-md-8" style={{ border: "1px solid red", marginTop: "100px", padding: "30px" }}>
            <Row>
                <Col style={{ textAlign: "center" }}>
                    <h3>Edit Movie</h3>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form onSubmit={handelSubmit}>
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

export default EditMovie;
