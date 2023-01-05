import { Input } from 'antd'
import '../../assets/css/pages/search.scss'
import React from 'react'

const Search = () => {
  const onSearch = (value) => {
    console.log(value)
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
    </>

  )
}

export default Search