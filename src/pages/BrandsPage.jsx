import React, { useEffect, useState } from "react";
import instance from "../api/instance";
import { GET_BRAND_API } from "../api/api_constants";
import { useNavigate, useParams } from "react-router-dom";
import brand from "../styles/BrandsPage.module.css";
import { useSelector } from "react-redux";
import Brands from "../components/Brands/Brands";
import { PRODUCT_PAGE } from "../constants/Components_constants";
const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const { brandId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`${GET_BRAND_API}/${brandId}`);
        setBrands(response.data.result.products);
        console.log("특정브랜드", response.data.result.products);
      } catch (error) {
        console.log("특정 브랜드 불러오기 에러", error);
      }
    };
    fetchData();
  }, [brandId]);

  const handleClick = (productId) => {
    navigate(`${PRODUCT_PAGE}/${productId}`)
  }

  return (
    <main className={brand.wrap}>
      <Brands />
      <div className={brand.brandsWrap}>
        {brands.map((item) => (
          <div key={item.id} className={brand.wrap} onClick={() => handleClick(item.id)}>
            <div className={brand.img}>
              <img src={item.imgSrc} alt={item.name} />
            </div>
            <div className={brand.brandTextWrap}>
              <p className={brand.nameEn}>{item.brand.nameEn}</p>
              <p className={brand.name}>{item.name}</p>
              <p className={brand.priceWrap}>
                {" "}
                <span className={brand.originalPrice}>
                  ₩{item.originalPrice.toLocaleString()}
                </span>
                ₩{item.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        <div></div>
      </div>
    </main>
  );
};

export default BrandsPage;
