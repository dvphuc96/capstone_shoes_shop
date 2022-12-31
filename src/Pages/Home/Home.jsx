import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShoeCard from '../../Components/ShoeCart/ShoeCard'
import {getProductApi} from '../../redux/reducers/productReducer' 
import '../../assets/css/style.css'
import { NavLink } from 'react-router-dom'


const Home = () => {
  const {arrProduct} = useSelector(state=>state.productReducer)
  const dispatch=useDispatch();;

  const getAllProductApi = async()=>{
    const action = getProductApi()
    dispatch(action);
  }
  useEffect(()=>{
    getAllProductApi();
  },[])
  
        
        
 

  return (
    <div>
      <section className="carosel-product ">
        <div id="carouselExampleIndicators" className="carousel slide w-100" data-bs-ride="true">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
          </div>
          <div className="carousel-inner ">
            <div className="carousel-item active">
              <div className="carosel-content row">
                <div className="col-7 text-center">
                  <img className="pro-1" src='./img/image5.png'  alt="" />
                </div>
                <div className="col-5  d-flex">
                  <div className="product-desc1">
                    <h3>name</h3>
                    <p>decs</p>
                    <NavLink className="btn btn-buynow buynow1 text-white"to=''>Buy now</NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carosel-content row">
                <div className="col-7 text-center">
                  <img className="pro-2" src='./img/image6.png' alt="" />
                </div>
                <div className="col-5  d-flex">
                  <div className="product-desc2">
                    <h3>nsne</h3>
                    <p>desc</p>
                    <NavLink className="btn btn-buynow  buynow2 text-white"to=''>Buy now</NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carosel-content row">
                <div className="col-7 text-center">
                  <img className="pro-3" src='./img/image7.png'  alt="" />
                </div>
                <div className="col-5 d-flex">
                  <div className="product-desc3">
                    <h3 id="name">name</h3>
                    <p id="product-description">decs</p>
                    <NavLink className="btn btn-buynow buynow3 text-white" to=''>Buy now</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <i className="fa fa-caret-left"></i>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <i className="fa fa-caret-right"></i>
          </button>
        </div>
      </section>
      <section className="realateProdcut">
        
      <h1 className=""> - Product Feature- </h1>
        <div className="container">
          <div className="realate-content">
            <div className="realateItem-group row" id="product-list">
            {arrProduct.map((item,index)=>{
          return <div className="col-4 realateItem" key={index}>
          <ShoeCard  prod={item}/>
        </div>
        })}
            </div>
          </div>
        </div>
      </section>

      
   
    </div>
  )
}

export default Home