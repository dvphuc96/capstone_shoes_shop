import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { https, USER_LOGIN, getStoreJson } from '../../util/config'
import { changeCartQuantity, deleteCart } from '../../redux/reducers/productReducer'

const Carts = () => {
  const {arrCart} = useSelector(state=>state.productReducer)
  // const [num,setNum] =useState(1)
  const dispatch = useDispatch();
  // const minusNum=()=>{
  //   if(num>1){
  //     setNum(num-1)
  //   } else{
  //     setNum(1)
  //   }
  // }
  return (
    <div className='container'>
      <div className="cart-content">
        <h1>Cart</h1>
        <hr />
        <div className="shoeCart">
          <table className='table text-center'>
            <thead>
              <tr >
                <th></th>
                <th>id</th>
                <th>img</th>
                <th>name</th>
                <th>price</th>
                <th>quantity</th>
                <th>total</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {arrCart.map((item,index)=>{
                return (
                  <tr key={index}>
                <td><input type="checkbox"/></td>
                <td>{item.id}</td>
                <td><img src={item.image}width={50} height={50} alt="" /></td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button className='btn btn-primary' onClick={() => {
                            if(item.quantity>1){
                              const action = changeCartQuantity(item.id, item.quantity - 1)
                            dispatch(action)
                            } else {return}
                        }}> - </button> <span><input type="text" value={item.quantity} style={{width:'30px',border:'none'}}/></span> 
                  <button className='btn btn-primary' onClick={() => {
                            const action = changeCartQuantity(item.id, item.quantity + 1)
                            dispatch(action)
                        }}>+</button>
                </td>
                <td>{item.price*item.quantity}</td>
                <td><button className="btn btn-success mx-2">Edit</button>
                <button className="btn btn-danger" onClick={() => {
                        const action = deleteCart(item.id)
                        dispatch(action)
                    }}>Delete</button></td>

              </tr>
                )
              })}
            </tbody>
          </table>
          <button onClick={async () => {
                const orderDetail = arrCart.map((cart, index) => {
                    return {
                        productId: cart.id,
                        quantity: cart.quantity
                    }
                })
                // const userLogin = getStoreJson(USER_LOGIN)
                const payload = {
                    orderDetail,
                    email: 'phuongnga0pn@gmail.com'
                    //doi login roi thay doi cai nay nho userLogin.email
                }
                console.log(payload);
                const result = await https.post('/api/Users/order', payload)
                if(result){
                    alert("Pass")
                }
            }} className='btn' style={{ background: '#F2994A', float: 'right' }}>SUBMIT ORDER</button>
        </div>
      </div>
    </div>
  )
}

export default Carts