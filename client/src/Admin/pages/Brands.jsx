import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import BrandModal from "../components/BrandModal";
import BrandEditModal from "../components/BrandEditModal";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("2121api/get-all-brands");
      setBrands(response.data.brands || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const deleteBrand = async (_id) => {
    try {
      const response = await axios.delete("2121api/delete-brand", {
        data: { _id },
      });
      setBrands(response.data.brands || []);
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  const updateBrand = async (_id, updatedBrandName) => {
    try {
      const response = await axios.put("2121api/update-brand", {
        _id,
        updatedBrandName,
      });
      setBrands(response.data.brands || []);
      setSelectedBrand(null); // Clear the selected brand
    } catch (error) {
      console.error("Error updating brand:", error);
    }
  };

  // Function to handle editing a brand
  const handleEditBrand = (brand) => {
    setSelectedBrand(brand);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-theme p-2 my-3 rounded">
        <span className="fs-4 fw-bold text-white">Brands</span>
        <BrandModal recallData={setBrands} />
      </div>

      <div className="container">
        {brands.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Brand Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((val, key) => (
                <tr key={key}>
                  <td>{val._id}</td>
                  <td>{val.BrandName}</td>
                  <td className="d-flex justify-content-around">
                    <button
                      className="btn btn-dark"
                      onClick={() => deleteBrand(val._id)}
                    >
                      <AiOutlineDelete />
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditBrand(val)}
                    >
                      <AiOutlineEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-center">No Brand</h2>
        )}
      </div>

      {selectedBrand && (
        <BrandEditModal
          recallData={setBrands}
          brand={selectedBrand}
          updateBrand={updateBrand}
        />
      )}
    </div>
  );
}
