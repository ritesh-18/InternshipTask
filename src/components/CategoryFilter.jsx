import React from 'react'

export default function CategoryFilter({selectedCategory , categories, onCategoryChange}) {
   
  return (
    <div className='category-filter'>
        <label >Filter By Category: </label>
        <select value={selectedCategory} onChange={(e)=>{
            onCategoryChange(e.target.value)
            console.log(e.target.value)
        }}>
        <option value="">All Categories</option>
    {
        categories.map((obj)=>{
            return (
                <option key={obj.id} value={obj.slug}>{obj.name}</option>
            )
        })
    }
       
           </select>
    </div>
  )
}
