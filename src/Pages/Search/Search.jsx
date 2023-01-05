import { Input } from 'antd'
import '../../assets/css/pages/search.scss'
import React from 'react'

const Search = () => {
  const { Search } = Input
  const onSearch = (value) => {
    console.log(value)
  }
  return (
    <div className='search w-50 p-4'>
      <span className='title'>Search</span>
      <Search
        style={{ borderRadius: '5px' }}
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="middlex"
        onSearch={onSearch}
      />
    </div>
  )
}

export default Search