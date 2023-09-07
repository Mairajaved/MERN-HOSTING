import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { AppRoute } from "../../App";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios
      .get(`${AppRoute}pi/get-all-brands`)
      .then((json) => setBrands(json.data.brands))
      .catch((err) => alert(err.message));
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of visible brands at a time
    slidesToScroll: 1, // Number of brands to scroll
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="text-center my-5 p-5">
        <h1>Brands</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Exercitationem, nobis ipsam! Vel, reiciendis earum! Dolorum fugiat
          harum nobis minus, impedit rem iste quis dolor aliquid officia,
          assumenda incidunt at aliquam.
        </p>
      </div>
      <div className="container">
        <Slider {...settings}>
          {brands.map((val, key) => (
            <div key={key} className="brand-slider-item">
              <Link to={`brands/${val.BrandName}`}>
                <img
                  className="img-fluid"
                  src={val.BrandImage}
                  alt={val.BrandName}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
