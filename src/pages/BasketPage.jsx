import React, { useEffect, useState } from "react";
import cartStyle from "../styles/BasketPage.module.css";
import instance from "../api/instance";
import { CART_API } from "../api/api_constants";
import { useNavigate } from "react-router-dom";
import { MAIN_PAGE } from "../constants/Components_constants";
const BasketPage = () => {
  const [cartItem, setCartItem] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`${CART_API}`);
        setCartItem(response.data.result.items);
        console.log(response.data.result.items);
      } catch (error) {
        console.error("장바구니 데이터 불러오기 에러", error);
      }
    };
    fetchData();
  }, []);

  const handleCountChange = (action) => {
    if (action === "plus") {
      setCount((prevCount) => prevCount + 1);
    } else if (action === "minus" && count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const handleShop = () => {
    navigate(MAIN_PAGE)
  }

  
  return (
    <div className={cartStyle.cartWrap}>
      <h1 className={cartStyle.cartText}>장바구니</h1>
      {cartItem.length === 0 ? (
        <div className={cartStyle.emptyCart}>
          <p>장바구니가 비어 있습니다.</p>
          <button className={cartStyle.shopButton} onClick={handleShop}>쇼핑하러 가기</button>
        </div>
      ) : (
        cartItem.map((item) => (
          <div className={cartStyle.cartItem} key={item.id}>
            <div className={cartStyle.img}>
              <img src={item.product.imgSrc} alt={item.product.brand.nameKr} />
            </div>
            <div className={cartStyle.cartItemText}>
              <p className={cartStyle.names}>
                {item.product.brand.nameKr}/{item.product.brand.nameEn}
              </p>
              <p className={cartStyle.name}>{item.product.name}</p>
              <p className={cartStyle.priceText}>
                <span className={cartStyle.originalPrice}>
                  ₩{item.product.originalPrice.toLocaleString()}
                </span>
                ₩{item.product.price.toLocaleString()}
              </p>
              <p className={cartStyle.onlineStock}>
                {item.product.deliveryType} | 잔여재고 {item.product.onlineStock}
                ea
              </p>
            </div>
            <div className={cartStyle.buttonWrap}>
              <button
                className={cartStyle.minus}
                onClick={() => handleCountChange("minus")}
              >
                -
              </button>
              <span className={cartStyle.count}>{count}</span>
              <button
                className={cartStyle.plus}
                onClick={() => handleCountChange("plus")}
              >
                +
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BasketPage;
