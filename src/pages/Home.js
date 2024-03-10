import React, {useEffect, useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { baseURL } from '../constants/alpha-env.constant';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import ProductCard  from '../components/ProductCard'
export default function Home() {
  const [getProducts,setProducts] = useState([])
  useEffect(() => {
    async function fetchProductList() {
      try {
        const{data:res} = await axios.get(`${baseURL}/product-ms/getProductList`);
         setProducts(res.data)
      } catch (error) {
        console.error("Error fetching car list:", error);
      }
    }

    fetchProductList();
  }, []);
  return (
    <main>
        
        <section className="py-5 text-left container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8">
              <h1 className="fw-light">Bid Your <br/> <span className='primary-color fw-bold' style={{fontSize:"100px"}}>Dream </span></h1>
              <p className="lead text-muted">We’re constantly bringing new properties market so keep visiting our website that you don't miss out on the next opportunity.</p>
              <button className='btn btn-primary fs-5 px-5 py-2'>Get Start</button>
            </div>
            <div className="col-lg-6 col-md-8 text-center" style={{marginTop:"-40px"}}>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper "
              style={{paddingBottom:"30px"}}
            >
              <SwiperSlide>
                <img src={require('../assets/img-banner-3.jpg')} alt="" style={{height:'400px'}}/>
              </SwiperSlide>
              <SwiperSlide>
              <img src={require('../assets/img-banner-car.png')} alt="" style={{height:'400px'}}/>
              </SwiperSlide>
              <SwiperSlide>
              <img src={require('../assets/img-banner-home.png')} alt="" style={{height:'400px'}}/>
              </SwiperSlide>
            </Swiper>
            </div>
          </div>
        </section>

        <div className="album py-5">
          <div className="container">
            <h3 className="fw-light fw-bold mb-4">Live Auction<br/>
              {/* <span className='fw-light fs-6'>Closing Within 24 Hours</span> */}
            </h3>
            <div className="row  g-3">
            <Swiper
              slidesPerView={4}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                '@0.00': {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                '@0.75': {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                '@1.00': {
                  slidesPerView: 4,
                  spaceBetween: 40,
                }
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {
                getProducts.length > 0 && (
                  getProducts.map((image, index) => (
                    <SwiperSlide  key={index} >
                      <ProductCard getImage={image}/>
                    </SwiperSlide>
                  ))
                )
              }
              
            </Swiper>
            
            </div>
          </div>
        </div>
        <section className='container'>
          <div className="row mb-2">
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex align-items-center">
                  <h3 className="mb-0 fs-1 fw-bold">Houses & <br/>Apartments</h3>
                </div>
                <div className="col-auto d-none d-lg-block">
                <img src={require('../assets/img-banner-home.png')} alt="" style={{height:'195px'}}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex align-items-center">
                  <h3 className="mb-0 fs-1 fw-bold">Buy & <br/>Sell Used Cars</h3>
                  
                </div>
                <div className="col-auto d-none d-lg-block">
                  
                <img src={require('../assets/img-banner-car.png')} alt="" style={{height:'195px'}}/>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="album py-5">
          <div className="container">
            <h3 className="fw-bold mb-4">Upcoming Auctions
              
            </h3>
            <div className="row  g-3">
            <Swiper
              slidesPerView={4}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                '@0.00': {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                '@0.75': {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                '@1.00': {
                  slidesPerView: 4,
                  spaceBetween: 40,
                }
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <ProductCard/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard/>
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard/>  
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard/>
              </SwiperSlide>
            </Swiper>
            
            </div>
          </div>
        </div>
        <section className='container'>
          <div className="row mb-2">
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex align-items-center">
                  <h3 className="mb-0 fs-1 fw-bold">Watches</h3>
                </div>
                <div className="col-auto d-none d-lg-block">
                <img src={require('../assets/watches.png')} alt="" style={{height:'195px'}}/>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex align-items-center">
                  <h3 className="mb-0 fs-1 fw-bold">Jewelry</h3>
                  
                </div>
                <div className="col-auto d-none d-lg-block">
                  
                <img src={require('../assets/img-jwelery.png')} alt="" style={{height:'195px'}}/>
                </div>
              </div>
            </div>
          </div>
        </section>
        
    </main>
  )
}
