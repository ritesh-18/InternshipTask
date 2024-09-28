import React from 'react'

export default function ProductList({product}) {
  // console.log("product" , product[0].title)
  return (
    <div className='product-list' style={{
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
      padding: '20px',

    }}>
      {product.map((product)=>{
        return(<div key={product.id} className='product-item'>
          <h3 style={{
            color:"white"
          }}>{product.title}</h3>
          <p style={{
            fontSize: '18px',
            color:"#999999"
          }}>{product.description}</p>
          <p>Price: {product.price}</p>
          </div>)
      })}
    </div>
  )
}
