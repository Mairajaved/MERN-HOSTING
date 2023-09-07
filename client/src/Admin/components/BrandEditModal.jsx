import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AppRoute } from "../../App";

function BrandEditModal({ recallData, Name, ID, onUpdate }) {
  const [show, setShow] = useState(false);
  const [brandName, setBrandName] = useState(Name || "");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateBrand = (e) => {
    e.preventDefault();
    const payload = {
      brandN: brandName,
      _id: ID,
    };

    axios
      .put(`${AppRoute}api/update-brand`, payload)
      .then((response) => {
        const updatedBrand = response.data.brands; // Assuming the API returns a single updated brand object
        onUpdate(updatedBrand);
        handleClose(); // Close the modal after successful update
      })
      .catch((err) => {
        console.error("Error updating brand:", err);
      });
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <HiOutlinePencilAlt />
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={updateBrand}>
            <div className="mb-3">
              <label htmlFor="brandName" className="form-label">
                Brand Name
              </label>
              <input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                type="text"
                className="form-control"
                id="brandName"
                aria-describedby="brandNameHelp"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BrandEditModal;
