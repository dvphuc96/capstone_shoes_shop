import React from 'react'
import { NavLink } from 'react-router-dom'

const ShoeCard = ({prod}) => {
  return (
            <div className="card">
              <i class="fa-solid fa-heart position-absolute text-danger top-0 end-0 p-2"></i>
              <img id="hinhAnh" src={prod.image} alt=""/>
              <div className="card-body">
                <p id="name">{prod.name}</p>
                <p id="mota">{prod.description.length >100?prod.description.substr(0,100)+'...':prod.description}.</p>
                <div id="buttons" className="row">
                  <NavLink className='col-6 btn btnBuyNow' to={`/detail/${prod.id}`}>Buy now</NavLink>
                  <button className='col-6 btn btnPrice'>{prod.price}$</button>
                </div>
              </div>
            </div>
        
       
   
  )
}

export default ShoeCard