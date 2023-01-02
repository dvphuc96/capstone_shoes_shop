// rafce
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import ShoeCard from '../../Components/ShoeCart/ShoeCard';
import {addCarts, changeCartQuantity, getDetailProductApi } from '../../redux/reducers/productReducer';

const Detail = () => {
  const {productDetail, arrCart} = useSelector(state=>state.productReducer)
  
  const [quantity, setQuantity] = useState(1)
  

  
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
          {/* con thieu check userLogin -> chuyen huong qua /cart */}
          <NavLink to={'/cart'} className='btn' style={{ background: 'linear-gradient(270deg, rgba(62, 32, 248, 0.9) 5.14%, #D017EE 89.71%)', width: '175px', height: '64px', marginTop: '7px' }} onClick={() => {
                        const cart = arrCart.find(cart => cart.id === productDetail.id)
                        if (cart) {
                            const action = changeCartQuantity(productDetail.id, cart.quantity + quantity)
                            dispatch(action)
                        } else {
                            const cartsAction = addCarts({
                                id: productDetail.id, image: productDetail.image, name: productDetail.name, price: productDetail.price, quantity: quantity, total: productDetail.price * quantity
                            })
                            dispatch(cartsAction)
                        }
                    }}>Add to cart</NavLink>
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
