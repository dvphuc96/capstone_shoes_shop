import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetailProductApi } from '../../redux/reducers/productReducer';

const Carts = () => {
  const {productDetail} = useSelector(state=>state.productReducer)

  return (
    <div className='container'>
      <div className="cart-content">
        <h1>Cart</h1>
        <div className="shoeCart">
          <table className='table text-center'>
            <thead>
              <tr>
                <td></td>
                <td>id</td>
                <td>img</td>
                <td>name</td>
                <td>price</td>
                <td>quantity</td>
                <td>total</td>
                <td colSpan="2">action</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox"/></td>
                <td>id</td>
                <td><img src={productDetail.image}width={50} height={50} alt="" /></td>
                <td>product 1</td>
                <td>10000</td>
                <td>
                  <button className='btn btn-primary'>-</button> <span><input type="text" value={'1'} /></span> <button>+</button>
                </td>
                <td>1000</td>
                <td><button className="btn btn-success">Edit</button></td>
                <td><button className="btn btn-danger">Delete</button></td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Carts