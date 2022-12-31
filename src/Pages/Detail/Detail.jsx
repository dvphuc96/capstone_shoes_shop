// rafce
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import ShoeCard from '../../Components/ShoeCart/ShoeCard';
import { getDetailProductApi } from '../../redux/reducers/productReducer';

const Detail = () => {
  const {productDetail} = useSelector(state=>state.productReducer)

  const dispatch =useDispatch();
  const params = useParams();

  useEffect(()=>{
    const actionAsync = getDetailProductApi(params.id);
    dispatch(actionAsync);
  },[params.id])
  return (
    <div className='container'>
      <div className="row mt-3">
        <div className="col-4">
          <img src={productDetail?.image} alt="" />
        </div>
        <div className="col-8">
          <h3>{productDetail?.name}</h3>
          <p>{productDetail?.description}</p>
          <NavLink className ="btn btn-secondary" to={`/cart`}>cart</NavLink>
        </div>
      </div>
      <section className="realateProdcut">
        
      <h1 className=""> - Product Feature- </h1>
        <div className="container">
          <div className="realate-content">
            <div className="realateItem-group row" id="product-list">
            {productDetail?.relatedProducts?.map((item,index)=>{
            return <div className="col-4 realateItem" key={index}>
              <ShoeCard prod={item}/>
            </div>
          })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Detail
