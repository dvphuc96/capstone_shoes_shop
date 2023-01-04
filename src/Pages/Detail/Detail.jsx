import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import ShoeCard from '../../Components/ShoeCart/ShoeCard';
import { addCarts, changeCartQuantity, getDetailProductApi } from '../../redux/reducers/productReducer';

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
            }}>Add to card</NavLink>
          </div>
        </div>
        <h3 className='mt-2 text-center'>-Realate Product-</h3>
        <div className="container">
          <div className="realate-content">
            <div className="realateItem-group row" id="product-list">
              {productDetail?.relatedProducts.map((prod, index) => {
                return <div className="col-xl-4 col-md-6 mt-sm-3">
                  <ShoeCard prod={prod} key={index} />
                </div>

              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Detail;