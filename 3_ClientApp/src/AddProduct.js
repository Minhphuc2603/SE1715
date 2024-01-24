import { Button, Col, Form, Row } from "react-bootstrap";
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const AddProducts = () => {


    const [nameProduct, setNameProduct] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState();

    const IsValidate = () => {
        let isproceed = true;

        if (nameProduct === null || nameProduct.trim() === "") {
            isproceed = false;
            //   toast.warning('Please enter the value in name Room');
        }
        if (price <= 0 || price.trim() === "") {
            isproceed = false;
            // toast.warning('Please enter the value in number Bed');
        }

        return isproceed;
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        if (IsValidate()) {
            const product = { name: nameProduct, price, description, category };
            console.log(product);
            fetch('http://localhost:9999/products', {
                method: "POST",
                headers: { "Content-Type": "application/json" },  // Fix the typo here
                body: JSON.stringify(product)
            })
            .then(() => {
                toast.success("Add successfull")
                navigate("/");
            })
            .catch(error => {
                console.error('Error adding product:', error);
                // Handle error appropriately (e.g., show error message to the user)
            });
        }
    };
    


    const navigate = useNavigate();


    return (
        <Col
            className="offset-md-2 col-md-8"
            style={{ border: "1px solid red", marginTop: "100px", padding: "30px" }}
        >
            <Row>
                <Col style={{ textAlign: "center" }}>
                    <h3>Edit Room</h3>
                </Col>

            </Row>
            <Row>
                <Col md={12}>
                    <Form onSubmit={handelSubmit}>
                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>
                                    Name <span style={{ color: "red" }}>*</span>
                                </Form.Text>
                                <Form.Control
                                    value={nameProduct}
                                    onChange={(e) => setNameProduct(e.target.value)}
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>
                                description <span style={{ color: "red" }}>*</span>
                                </Form.Text>
                                <Form.Control
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>
                                category <span style={{ color: "red" }}>*</span>
                                </Form.Text>
                                <Form.Control
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                                
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="col-md-12">
                                <Form.Text>Price</Form.Text>
                                <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} />
                                {price <= 0 && <Form.Text style={{ color: 'red' }}>Please enter product price &gt; 0</Form.Text>}
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col className="col-md-12" style={{ textAlign: "center", padding: "25px" }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Button className="btn btn-success" type="submit">
                                    Save
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Link to={"/managerroom"} className="btn btn-danger">
                                    Back Home
                                </Link>
                            </Col>
                            <Col className="col-md-6"></Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Col>
    );
};

export default AddProducts;