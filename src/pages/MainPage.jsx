import React, { useEffect, useState } from "react";
import MainStyles from "../styles/MainPage.module.css";
import instance from "../api/instance";
import { GET_PRODUCTS_API } from "../api/api_constants";
import Brands from "../components/Brands/Brands";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PRODUCT_PAGE } from "../constants/Components_constants";

const MainPage = () => {
  const isModalOpen = useSelector((state) => state.BrandModal.isModalOpen)
  const navigation = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(GET_PRODUCTS_API);
        setItems(response.data.result);
        console.log(response.data.result);
      } catch (error) {
        console.error("데이터 불러오기 에러", error);
      }
    };
    fetchData();
  }, []);

  const handleProductClick = (itemId) => {
    navigation(`${PRODUCT_PAGE}/${itemId}`);
  };
  return (
    <main className={MainStyles.mainWrap}>
      {isModalOpen && <Brands/>}
      
      <h1 className={MainStyles.mainText}>Trending</h1>
      <ul className={MainStyles.itemWrap}>
        {items.map((item) => (
          <li key={item.id} className={MainStyles.items}onClick={() => handleProductClick(item.id)}>
            <div className={MainStyles.itemImage}>
              <img src={item.imgSrc} alt={item.nameKr}/>
            </div>
            <div className={MainStyles.itemBrands}>
              <p className={MainStyles.title}>{item.brand.nameEn}</p>
              <p className={MainStyles.description}>{item.name}</p>
              <p className={MainStyles.priceWrap}>
                <span className={MainStyles.cost}>₩{item.originalPrice.toLocaleString()}</span>₩{item.price.toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default MainPage;
