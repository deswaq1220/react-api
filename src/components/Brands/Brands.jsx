import React, { useEffect, useState } from "react";
import instance from "../../api/instance";
import { GET_BRANDS_API } from "../../api/api_constants";
import brandsStyle from "./Brands.module.css";
const Brands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(GET_BRANDS_API);
        setBrands(response.data.result);
        console.log(response.data);
      } catch (error) {
        console.error("데이터 불러오기 에러", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={brandsStyle.navWrap}>
      <nav className={brandsStyle.brandNav}>
        <h1 className={brandsStyle.brandText}>Brands</h1>
        <p className={brandsStyle.brandSubText}>ALL</p>
        <ul className={brandsStyle.brandWrap}>
          {brands.map((item) => (
            <li className={brandsStyle.brandsItem} key={item.id}>
              {item.nameKr}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Brands;
