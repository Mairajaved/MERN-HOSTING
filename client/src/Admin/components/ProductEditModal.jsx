import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { storage } from "../utils/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { HiOutlinePencilAlt } from "react-icons/hi";

function ProductEditModal({
  recallData,
  Name,
  Category,
  Brand,
  Price,
  Desc,
  ID,
}) {
  const [show, setShow] = useState(false);
  const [brand, setBrand] = useState(Brand);
  const [category, setCategory] = useState(Category);
  const [productName, setProductName] = useState(Name);
  const [description, setDescription] = useState(Desc);
  const [price, setPrice] = useState(Price);

  //API VALUES
  const [brandVal, setBrandVal] = useState([]);
  const [CategoryVal, setCategoryVal] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    axios
      .get("/api/get-all-brands")
      .then((json) => {
        setBrandVal(json.data.brands);
        axios.get("2121api/get-all-products").then((json) => {
          setCategoryVal(json.data.categories);
          setShow(true);
        });
      })
      .catch((err) => console.log(err));
  };

  const updateProduct = (e) => {
    e.preventDefault();
    const payload = {
      productName,
      brand,
      category,
      price,
      description,
      _id: ID,
    };

    console.log(payload);
    axios
      .put("/api/update-products", payload)
      .then((json) => {
        recallData(json.data.products);
        console.log(json.data);
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <HiOutlinePencilAlt />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={updateProduct}>
            <div className="row">
              <div className="col">
                <FloatingLabel
                  controlId="productname"
                  label="Product Name"
                  className="mb-3 text-secondary"
                >
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </FloatingLabel>
              </div>
              <div className="col">
                <FloatingLabel
                  controlId="price"
                  label="Product Price ($)"
                  className="mb-3 text-secondary"
                >
                  <Form.Control
                    type="number"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FloatingLabel>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingSelectBrand"
                    label="Select Brand"
                  >
                    <Form.Select
                      aria-label="Please Select a Brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <option>Please Select a Brand</option>
                      {brandVal.map((val, key) => (
                        <option key={key} value={val.BrandName}>
                          {val.BrandName}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="selectCategory"
                    label="Select Category"
                  >
                    <Form.Select
                      aria-label="Please Select a Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Please Select a Category</option>
                      {CategoryVal.map((val, key) => (
                        <option key={key} value={val.CategoryName}>
                          {val.CategoryName}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </div>
            </div>

            <FloatingLabel
              controlId="floatingTextarea2"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            <button type="submit" className="btn btn-theme text-white">
              Update
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductEditModal;
