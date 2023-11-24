import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { addCart } from "../redux/action";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };


  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/items");
      setData(response.data);
      setFilter(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.type === cat);
    setFilter(updatedList);
  };

  useEffect(() => {
    fetchProducts();
  }, [filterProduct]);



  const ShowProducts = () => {
    return (
      <>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" key={product.id}>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h4 className="card-title mb-0">
                      {" "}
                      {product.title}
                    </h4>
                    <p className="card-text lead fw-bold my-3">
                      ${product.price}
                    </p>
                    <p className="lead fw-bolder">
                      Rating: {product.rating_rate} <i className="fa fa-star"></i>{" "}
                    </p>
                    <p className="card-text lead">
                      ${product.description.substring(0, 40)},
                    </p>

                    <button
                      className="btn btn-outline-dark px-4 py-2"
                      onClick={() => addProduct(product)}
                    >
                      Add to Cart
                    </button>
                    <NavLink
                      to="/cart"
                      className="btn btn-dark ms-2 px-3 py-2 my-4"
                    >
                      Go to Cart
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            {/* <h1 className="display-6 fw-bolder text-center">Latest Products</h1> */}
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
