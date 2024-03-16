import Banner from '@/Pages/Banner';
import CardSectionNewItems from '@/Pages/CardSectionNewItems';
import React from 'react'

export const CategoryPage = ( { params }: {
  params: {category: string}
} ) => {
  return (
    <main className="flex min-h-0 flex-col">
      <Banner />
      <CardSectionNewItems category={params.category} />
    </main>
  )
}


export default CategoryPage;