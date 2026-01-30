import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './MainPage.css';

const MainPage = () => {
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [productList, setProductList] = useState([]);


  useEffect(() => {
    // 알고리즘 추천 데이터 (나중엔 Spring에서 받아올 것)
    const dummyRecommended = [
      { id: 101, name: "Single breasted Long Coat", category: "TOP", price: "289,000", img: "/cc.png" },
      { id: 102, name: "Hand Wash", category: "BEST", price: "35,000", img: "/handsope.png" },
    ];
    // 일반 상품 목록
    const dummyProducts = [
      { id: 1, name: "오로라 시그니처 핸드워시", price: "20,000", img: "/handsope.png", tag: "NEW" },
      { id: 2, name: "내추럴 린넨 오버핏 셔츠", price: "59,000", img: "/B.png", tag: "BEST" },
      { id: 3, name: "클래식 울 슬랙스", price: "68,000", img: "/c.png", tag: "" },
      { id: 4, name: "세라믹 핸드메이드 머그", price: "32,000", img: "/f.png", tag: "" },
    ];

    setRecommendedItems(dummyRecommended);
    setProductList(dummyProducts);
  }, []);

  const handleActionLog = (productId, actionType) => {
    // actionType: 'view', 'click', 'wish' 등
    console.log(`[ALGORITHM LOG] Product: ${productId} | Action: ${actionType}`);
    // 여기서 axios나 fetch로 Spring 서버 전송 ㄱㄱ 
  };

  return (
    <div className="main-wrapper">
      {/* 고정 상단바 */}
      <nav className="top-nav">
        <div className="nav-inner">
          <div className="nav-logo">SIUUGIL.</div>
          <ul className="nav-menu">
            <li>SHOP</li>
            <li>COLLECTION</li>
            <li>COMMUNITY</li>
            <li>MYPAGE</li>
          </ul>
          <div className="nav-icons">
            <i className="search-icon">Login</i> /
            <i className="cart-icon">Sign up</i>
          </div>
        </div>
      </nav>

      {/* 추천 알고리즘 슬라이드 부분 */}
      <section className="main-hero">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          loop={true}
        >
          {recommendedItems.map(item => (
            <SwiperSlide key={item.id} onClick={() => handleActionLog(item.id, 'recommend_click')}>
              <div className="hero-slide-item">
                <div className="hero-img-box">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="hero-text-box">
                  <span className="category-tag">{item.category}</span>
                  <h2>{item.name}</h2>
                  <p className="price">{item.price} KRW</p>
                  <button className="btn-shop">SHOP NOW</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 상품 그리드 리스트 */}
      <section className="content-section">
        <div className="section-header">
          <h3>WEEKLY BEST ITEMS</h3>
          <p>이번 주 가장 사랑받는 아이템을 만나보세요.</p>
        </div>
        
        <div className="product-grid">
          {productList.map(product => (
            <div key={product.id} className="product-card" onClick={() => handleActionLog(product.id, 'list_click')}>
              <div className="product-img-wrapper">
                {product.tag && <span className="badge">{product.tag}</span>}
                <img src={product.img} alt={product.name} />
                <div className="overlay-icons">
                   <span>❤️</span>
                   <span>🛒</span>
                </div>
              </div>
              <div className="product-desc">
                <p className="p-name">{product.name}</p>
                <p className="p-price">{product.price}원</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;