import { ProductDetails } from '@/Pages/ProductDetails';
import React from 'react'

export const ProductDetail = ( { params }: {
  params: {id: string}
} ) => {
  return (
    <main className="flex min-h-0 flex-col">
      <ProductDetails id={params.id.split("_")[0]} />
    </main>
  )
}

export default ProductDetail;