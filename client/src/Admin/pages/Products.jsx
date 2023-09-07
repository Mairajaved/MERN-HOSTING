import { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { AppRoute } from "../../App";
import ProductEditModal from "../components/ProductEditModal";

export default function Products() {
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`${AppRoute}api/get-all-products`)
      .then((json) => setProduct(json.data.products))
      .catch((err) => console.log(err));
  }, []);

  const deleteProduct = (_id) => {
    console.log(_id);
    axios
      .delete("/api/delete-products", { data: { _id } })
      .then((json) => setProduct(json.data.products))
      .catch((err) => console.log(err));
  };
  // const dummy =(params)=>console.log("called",params)

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-theme p-2 my-3 rounded">
        <span className="fs-4 fw-bold text-white">Products</span>
        <ProductModal recallData={setProduct} />
      </div>

      <div className="container">
        {Product.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Product Name</th>
                <th scope="col">Category </th>
                <th scope="col">Brand </th>
                <th scope="col">Price </th>
                <th scope="col">Description </th>
                <th scope="col">Action </th>
              </tr>
            </thead>
            <tbody>
              {Product.map((val, key) => (
                <tr key={key}>
                  <td>
                    <img
                      src={val.thumbnail}
                      className="img-fluid"
                      style={{ height: "5vh", objectFit: "contain" }}
                      alt=""
                    />
                  </td>
                  <td>{val.productName}</td>
                  <td>{val.category}</td>
                  <td>{val.brand}</td>
                  <td>{val.price}</td>
                  <td>{val.description}</td>
                  <td className="d-flex justify-content-around">
                    <button
                      className="btn btn-dark"
                      onClick={() => deleteProduct(val._id)}
                    >
                      <AiOutlineDelete />
                    </button>
                    {/* <button className="btn btn-dark"><HiOutlinePencilAlt /></button> */}
                    <ProductEditModal
                      recallData={setProduct}
                      Name={val.productName}
                      Category={val.category}
                      Brand={val.brand}
                      Price={val.price}
                      Desc={val.description}
                      ID={val._id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-center">No Products</h2>
        )}
      </div>
    </div>
  );
}
