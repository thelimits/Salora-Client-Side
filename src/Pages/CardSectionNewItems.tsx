"use client"

import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import Images from "../Asset/Images";
import AngkaKeRupiah from "../Utils/FormatCurrency";
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CCardFooter } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CardListSkeleton from '../Components/CardListSkeleton';
import { BaseUrl } from '@/configAPI';

interface ViewCardCategory{
  category: string
}

const CardSectionNewItems: React.FC<ViewCardCategory> = ({category}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [LoaderCard, setLoaderCard] = useState<boolean>(true);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
      };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${BaseUrl}products?category=${category}&size=5`, {
              cache: "no-store",
              next: {
                revalidate: 3600
              }
            });
            const data = await response.json();
            setLoaderCard(false);
            setProducts(data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }, []);

  return (
    <div className='bg-primayBG pb-12 x1:px-28 px-4 relative'>
        <div 
            className='lg:mb-5 font-bold text-2xl font-sans post-type__title truncated truncated--two-lines margin-bottom text-center'>
            Produk Terbaru Di Salora
        </div>
        <div className="content flex items-center justify-center">
            <div className="container">
                {LoaderCard ? (
                    <div className='flex justify-center h-[700px]'>
                        <CardListSkeleton />
                    </div>
                ) : (
                    <Slider {...settings}>
                        {products.map((product, index) => (
                            <div key={index} className='h-[700px] w-auto'>
                                <CCard style={{ width: '23rem',
                                    height: 'auto',
                                    border: '0',
                                    borderRadius: '15px',
                                    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)'}} className='hover:shadow-xl hover:transform hover:translate-x-[10px] hover:translate-y-[30px] hover:border-gray-300 h-full translate-y-10'>
                                    {/* <CCardImage alt='image not found' orientation="top" src={product.imageUrl} className='h-[400px] w-auto object-contain pt-3'/> */}
                                    <CCardBody className='h-48'>
                                        <a href={`/p/${product.id}_${product.description.replace(/[-\s/]+/g, "-")}`} className='no-underline text-black'>
                                            <CCardTitle className='hover:text-blue-500 transition duration-500 ease-in-out'>{product.productName}</CCardTitle>
                                        </a>
                                        <CCardText className='h-14'>
                                            {product.description}
                                        </CCardText>
                                        <CCardFooter >
                                            <AngkaKeRupiah angka={product.price}/>
                                        </CCardFooter>
                                    </CCardBody>
                                </CCard>
                            </div>
                        ))}
                    </Slider>
                  )}
            </div>
        </div> 
    </div>
  )
}

export default CardSectionNewItems;