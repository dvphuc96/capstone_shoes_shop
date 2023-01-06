import React from 'react'
import { NavLink } from 'react-router-dom'

const ShoeCard = ({ prod, index }) => {
  return (
    <div className="card" key={index}>
      <i className="fa-solid fa-heart position-absolute  end-0 mx-2 mt-2" style={{ fontSize: 20, color: 'red' }}></i>
      <img id="hinhAnh" src={prod.image} alt="" />
      <div className="card-body">
        <p id="name">{prod.name}</p>
        <p id="mota">{prod.description.length > 80 ? prod.description.substr(0, 80) + '...' : prod.description}.</p>
        <div id="buttons" className="row">
          <NavLink className='col-6 btn btnBuyNow' to={`/detail/${prod.id}`}>Buy now</NavLink>
          <button className='col-6 btn btnPrice'>{prod.price}$</button>
        </div>
      </div>
    </div>
  )
}

export default ShoeCard