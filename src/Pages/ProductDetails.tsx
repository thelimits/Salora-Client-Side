"use client"

import FormatCurrency from '@/Utils/FormatCurrency';
import { BaseUrl } from '@/configAPI';
import HTMLReactParser from 'html-react-parser/lib/index';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Skeleton from 'react-loading-skeleton';
import CardListSkeleton from '@/Components/CardListSkeleton';
import SkeletonCard from '@/Components/SkeletonCard';

interface ViewProduct{
    id: string
}

export const ProductDetails: React.FC<ViewProduct> = ({id}) => {
    const [products, setProducts] = useState<ProductDetails>();

    const [selectedMenu, setSelectedMenu] = useState('detail');

    const handleMenuSelect = (menu: React.SetStateAction<string>) => {
        setSelectedMenu(menu);
    };

    const [zoomStyle, setZoomStyle] = useState({
        transform: 'scale(1)',
        transformOrigin: '50% 50%'
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - left;
        const offsetY = e.clientY - top;
        const scaleX = 1.5; // Faktor zoom horizontal
        const scaleY = 1.5; // Faktor zoom vertikal
        const newTransform = `scale(${scaleX}, ${scaleY})`;
        const originX = (offsetX / width) * 100;
        const originY = (offsetY / height) * 100;
        const newOrigin = `${originX}% ${originY}%`;
        setZoomStyle({
            transform: newTransform,
            transformOrigin: newOrigin
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle({
            transform: 'scale(1)',
            transformOrigin: '50% 50%'
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BaseUrl}products/${id}`, {
                    method: "GET",
                    cache: "no-store",
                    next: {
                        revalidate: 3600
                    }
                });
                const data = await response.json();
                setProducts(data); // Mengatur data produk tunggal ke state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [id]);

    return (
        <div className='bg-primayBG pb-12 x1:px-28 px-4 relative flex justify-center'>
            <div className="content flex justify-between flex-row mt-20">
                {products ? (
                    <div 
                        className="relative w-auto h-auto overflow-hidden rounded-xl mr-10" 
                        onMouseMove={handleMouseMove} 
                        onMouseLeave={handleMouseLeave}
                    >
                        <Image 
                            src={products.imageUrl} 
                            alt={products.productName}
                            width={500} 
                            height={500} 
                            className="object-contain transition-transform duration-300"
                            style={zoomStyle}
                        />
                    </div>
                ) : (
                    <div className='flex justify-center h-[700px]'>
                        <SkeletonCard />
                    </div>
                )}

                {/* Details */}
                {products ? (
                    <div className='flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-[700px]'>
                        <div>
                            <span className='text-violet-500 font-black text-xl'>{products.productName}</span>
                            <h1 className='text-3xl font-bold'>{products.description}</h1>
                        </div>
                        <h6 className='text-2xl font-semibold mt-4 text-red-500'><FormatCurrency angka={products.price}/></h6>
                        <div className="flex gap-4">
                            <a href="#rincian" onClick={(e) => { e.preventDefault(); handleMenuSelect('rincian')}} className={`text-blue-500 font-bold text-lg cursor-pointer ${selectedMenu === 'rincian' && 'border-b-2 border-blue-500'}`}>Rincian</a>
                            <a href="#detail" onClick={(e) => { e.preventDefault(); handleMenuSelect('detail')}} className={`text-blue-500 font-bold text-lg cursor-pointer ${selectedMenu === 'detail' && 'border-b-2 border-blue-500'}`}>Detail</a>
                        </div>
                        <div className="mt-2">
                            {selectedMenu === 'rincian' ? (
                                <p id="rincian" className='text-gray-700 text-sm'>{HTMLReactParser(products.longDescriptions)}</p>
                            ) : (
                                <p id="detail" className='text-gray-700 text-sm'>{HTMLReactParser(products.mediumDescriptions)}</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='h-[700px] w-auto'>
                        <p>Loading</p>
                    </div>
                )}
            </div>
        </div>
    );
}
