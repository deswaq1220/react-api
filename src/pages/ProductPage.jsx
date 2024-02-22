import React, { useEffect, useState } from "react";
import productStyles from "../styles/Product.module.css";
import instance from "../api/instance";
import { GET_PRODUCT_API, ADD_ITEM_TO_CART_API, CART_API } from "../api/api_constants";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "../actions/actions";
const ProductPage = () => {
  const [products, setProducts] = useState({});
  const { productId } = useParams();
  const [inCart, setInCart] = useState(false);
  let buttonClass = inCart ? productStyles.removeFromCart : productStyles.shoppingBasket;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth) 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`${GET_PRODUCT_API}/${productId}`);
        setProducts(response.data.result);
        console.log(response.data.result);

        // 해당 상품이 장바구니에 있는지 확인
        const cartResponse = await instance.get(`${CART_API}`);
        const inCart = cartResponse.data.result.items.some(item => item.product.id === response.data.result.id);
        setInCart(inCart);
        console.log("같아??",cartResponse.data.result.items)

      } catch (error) {
        console.log("데이터 불러오기 오류", error);
      }
    };
    fetchData();
  }, [productId]);

  const addItemToCart = async () => {
    try {
      if(!isLoggedIn){
        dispatch(openLoginModal())
        return
      }
      await instance.post(`${ADD_ITEM_TO_CART_API}/${productId}`);
      alert(`${products.name}을 장바구니에 추가했습니다.`);
      setInCart(true)
    } catch (error) {
      alert(error.message)
      console.error("장바구니 추가 에러", error);
    }
  };

  const removeItemFromCart = async () => {
    try {
      await instance.delete(`${ADD_ITEM_TO_CART_API}/${productId}`);
      alert(`${products.name}을 장바구니에서 제거했습니다.`);
      setInCart(false);
    } catch (error) {
      console.error("장바구니 제거 에러", error);
    }
  };



  return (
    <main className={productStyles.main}>
      {products.brand && (
        <section className={productStyles.section}>
          <div className={productStyles.productImg }>
            <img src={products.imgSrc} alt={products.brand.nameKr} />
          </div>
          <div className={productStyles.productWrap}>
            <div className={productStyles.productName}>
              {products.brand.nameKr} / {products.brand.nameEn}
            </div>
            <div className={productStyles.description}>{products.name}</div>
            <div className={productStyles.descriptionWrap}>
              <div className={productStyles.netPrice}>정가</div>
              <div className={productStyles.oriPriceText}>
                ₩{products.originalPrice.toLocaleString()}
              </div>

              <div className={productStyles.sales}>판매가</div>
              <div className={productStyles.priceText}>
                ₩{products.price.toLocaleString()}
              </div>

              <div className={productStyles.delivery}>배송</div>
              <div className={productStyles.deliveryType}>
                {products.deliveryType}
              </div>

              <div className={productStyles.onlineStockText}>잔여재고</div>
              <div className={products.onlineStock}>{products.onlineStock}</div>
            </div>
            <button className={buttonClass} onClick={inCart ? removeItemFromCart : addItemToCart}>
              {inCart ? "장바구니에서 빼기" : "장바구니에 담기"}
            </button>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductPage;
