import React from 'react'
import { useParams } from "react-router-dom";
import  ProductCard  from "../components/ProductCard"
export default function ProductDetails() {
    const params = useParams();
    console.log(params.slug);
  return (
    <div className='container'>
      <ProductCard/>
    </div>
    
  )
}
