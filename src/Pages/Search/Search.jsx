import { Input, Select } from 'antd'
import '../../assets/css/pages/search.scss'
import React, { useState } from 'react'
import { getListProductSearchApi, getListProductSearchByPriceApi } from '../../redux/reducers/productReducer'
import { useDispatch, useSelector } from 'react-redux'
import ShoeCard from '../../Components/ShoeCart/ShoeCard'

const Search = () => {
  const dispatch = useDispatch()
  const { keyword } = useSelector(state => state.productReducer)
  const onSearch = (value) => {
    const getListProductSearch = getListProductSearchApi(value)
    dispatch(getListProductSearch)
  }
  const handleChange = (value) => {
    dispatch(getListProductSearchByPriceApi(value))
  }
  return (
    <>
      <div className='search p-4'>
        <span className='title ps-2'>Search</span>
        <Input.Search
          className='input-form-login'
          style={{ borderRadius: '5px' }}
          placeholder="Product name"
          allowClear
          enterButton="Search"
          size="middlex"
          onSearch={onSearch}
        />
      </div>
      <div className="title-component my-3">
        <h1>Search result</h1>
      </div>
      <div className='contaier px-4'>
        <Select
          onChange={handleChange}
          style={{ width: '200px' }}
          onSearch={onSearch}
          showSearch={true}
          placeholder="Select account"
        >
          {keyword?.map((item, index) => {
            return <Select.Option key={index} value={item.price}>
              {item.price}
            </Select.Option>
          })}
        </Select>
        <div className='row mt-4'>
          {keyword?.map((prod, index) => {
            return <div className='col-xl-4 mt-2'>
              <ShoeCard prod={prod} index={index} />
            </div>
          })}
        </div>
      </div>
    </>

  )
}

export default Search