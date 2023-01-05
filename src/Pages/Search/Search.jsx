import { Input } from 'antd'
import '../../assets/css/pages/search.scss'
import React from 'react'
import { getListProductSearchApi } from '../../redux/reducers/productReducer'
import { useDispatch, useSelector } from 'react-redux'
import ShoeCard from '../../Components/ShoeCart/ShoeCard'

const Search = () => {
  const dispatch = useDispatch()
  const { keyword } = useSelector(state => state.productReducer)
  const onSearch = (value) => {
    const getListProductSearch = getListProductSearchApi(value)
    dispatch(getListProductSearch)
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
      <div className='contaier'>
        <div className='row'>
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