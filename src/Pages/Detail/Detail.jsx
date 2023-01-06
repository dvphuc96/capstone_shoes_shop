import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import ShoeCard from '../../Components/ShoeCart/ShoeCard';
import { getStoreJson, USER_LOGIN } from '../../util/config'
import { addCarts, changeCartQuantity, getDetailProductApi } from '../../redux/reducers/productReducer';
import '../../assets/css/style.css'
import { history } from '../../index.js';


const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail, arrCart } = useSelector(state => state.productReducer)

  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const action = getDetailProductApi(id)
    dispatch(action);
  }, [id])
  return (
    <>
      <div className='container'>
        <div className="row mt-2">
          <div className="col-xl-4">
            <img src={productDetail?.image} alt='...' height={350} width={350} style={{ objectFit: 'cover' }}></img>
          </div>
          <div className="col-xl-8">
            <h3>{productDetail?.name}</h3>
            <p>{productDetail?.description}</p>
            <p style={{ fontSize: '24px', fontWeight: '500', color: '#1ED90E' }}>Available size</p>
            <div className='d-flex'>
              {productDetail?.size?.map((size, index) => {
                return <div key={index} style={{ background: '#CCCCCC', width: '50px', height: '50px', textAlign: 'center', lineHeight: '50px', marginRight: '20px' }}>
                  {size}
                </div>
              })}
            </div>
            <h2 style={{ marginTop: '17px', color: '#FC0303' }}>{productDetail?.price} $</h2>
            <div>
              <button className='btn' style={{ width: '50px', height: '50px', background: 'linear-gradient(180deg, #6181F3 0%, #7C97F5 99.48%)', color: '#FFFCFC' }} onClick={() => {
                setQuantity(quantity + 1)
              }}>+</button>
              <span>{quantity}</span>
              <button className='btn' style={{ width: '50px', height: '50px', background: 'linear-gradient(180deg, #6181F3 0%, #7C97F5 99.48%)', color: '#FFFCFC' }} onClick={() => {
                if (quantity > 1)
                  setQuantity(quantity - 1)
              }}>-</button>
            </div>
            {/* con thieu check userLogin -> chuyen huong qua /cart */}

            <button className='btn' style={{ background: 'linear-gradient(270deg, rgba(62, 32, 248, 0.9) 5.14%, #D017EE 89.71%)', width: '175px', height: '64px', marginTop: '7px' }} onClick={() => {
              const userLogin = getStoreJson(USER_LOGIN)
              if (userLogin) {
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
                history.push('/cart')
              } else {
                history.push('/login')
              }
            }}>Add to card</button>
          </div>
        </div>
        <div className="realateProdcut">
          <h3 className='mt-2 text-center'>-Realate Product-</h3>
          <div className="container">
            <div className="realate-content">
              <div className="realateItem-group row" id="product-list">
                {productDetail?.relatedProducts.map((prod, index) => {
                  return <div className="col-xl-4 col-md-6 mt-sm-3 realateItem">
                    <ShoeCard prod={prod} key={index} />
                  </div>

                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Detail;