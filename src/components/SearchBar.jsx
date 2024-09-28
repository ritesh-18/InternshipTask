import React from 'react'

export default function SearchBar({searchTerm , handleSearch}) {
  return (
    <div className='search-bar'>
        <input type="text"
        placeholder='search products'
        value={searchTerm}
        onChange={(e)=>{
            handleSearch(e.target.value)
        }}
        
        />
    </div>
  )
}
