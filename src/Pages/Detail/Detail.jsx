import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getProductDetailApi } from '../../redux/reducers/productReducer'

const Detail = () => {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const { productDetail } = useSelector(state => state.productReducer)
  useEffect(() => {
    const action = getProductDetailApi(productId)
    dispatch(action);
  }, [productId])
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
          </div>
        </div>
        <h3 className='mt-2 text-center'>-Realate Product-</h3>
        <div className="row">
          {productDetail?.relatedProducts.map((prod, index) => {
            return <div className="col-xl-4">
              <div className='card mt-3' style={{ height: '650px' }}>
                <div className='icon position-relative'>
                  <i className='fa fa-heart position-absolute top-0 end-0 right-0 mt-2 mx-2' style={{ fontSize: '20px', color: 'red' }}></i>
                  <img className='w-100' src={prod?.image ? prod.image : 'https://i.pravatar.cc?u=2'} alt='...'></img>
                </div>
                <div className='card-body'>
                  <h2 className='card-title'>{prod?.name ? prod.name : 'prod name'}</h2>
                  <p>{prod?.description.length > 100 ? prod?.description.substr(0, 100) + '...' : prod?.description}</p>
                </div>
                <div className='d-flex'>
                  <NavLink to={`detail/${prod?.id}`} className='btn btn-success w-50' style={{ borderRadius: '0px' }}>Buy now</NavLink>
                  <div className='prod-price text-center bg-secondary w-50 text-dark' style={{ lineHeight: '40px' }}>
                    {prod?.price ? prod.price.toFixed() : 'price'}
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default Detail