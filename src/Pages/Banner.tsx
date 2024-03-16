"use client"

import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SkeletonCard from '../Components/SkeletonCard';
import Image from 'next/image';

interface BannerItem {
    url: string;
    width: number;
    height: number;
}

export const Banner = () => {
    const [banner, setBanner] = useState<BannerItem[]>([]);
    const [bannerDiscount, setBannerDiscount] = useState<BannerItem[]>([]);
    const [loaderBanner, setLoaderBanner] = useState<boolean>(true);
    const [loaderBannerDis, setLoaderBannerDis] = useState<boolean>(true);

    const bannerItems = [
        {banner: "Banner1", path: "https://dl.dropboxusercontent.com/scl/fi/7a8v4stgzhn5kl8qozbop/Banner1.gif?rlkey=gojdrqr2v3yl8mbjhclx3xirp&dl=0"},
        {banner: "Banner2", path: "https://dl.dropboxusercontent.com/scl/fi/kuykx01feu22ksg4m9ltu/Banner2.gif?rlkey=g286olceiggh2g9t92rlyhnfq&dl=0"},
        {banner: "Banner3", path: "https://dl.dropboxusercontent.com/scl/fi/phzfx4mwhjbg6cnxhew1g/Banner3.gif?rlkey=x5vmp5vpiq4am4v74et3b4vmk&dl=0"},
    ]

    const bannerDiscountItems = [
        {banner: "Banner-d-1", path: "https://dl.dropboxusercontent.com/scl/fi/hqihv97mm5mymejvyf0f4/Banner-Ongkir-1.jpg?rlkey=sv1xx9e0mfl7slo59l3pdjmc7&dl=0"},
        {banner: "Banner-d-2", path: "https://dl.dropboxusercontent.com/scl/fi/q19zt61jbxbyw9dgly3ym/Banner-Ongkir-2.jpg?rlkey=jdise8d97fuf61wo3clr0qm8g&dl=0"},
        {banner: "Banner-d-3", path: "https://dl.dropboxusercontent.com/scl/fi/i4e0e55r9ku9rscsv65rc/Banner-Ongkir-3.jpg?rlkey=wubpctcd1stkivh6ihv5b3nav&dl=0"},
    ]

    useEffect(() => {

        async function fetchBanner() {
            try{
                // const corsAnywhereURL = 'https://cors-anywhere.herokuapp.com/';
                const imageUrl = await Promise.all(bannerItems.map(async (banner) =>
                {
                    const response = await fetch(banner.path, {
                        headers: {
                            'Origin': 'http://localhost:3000',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                    });
                    return {
                        url: URL.createObjectURL(await response.blob()),
                        width: 1920,
                        height: 1080,
                    }
                }));
                setLoaderBanner(false);
                setBanner(imageUrl);
            }catch(error){
                console.log(error)
            }
        }
        async function fetchBannerDiscount() {
            try{
                // const corsAnywhereURL = 'https://cors-anywhere.herokuapp.com/';
                const imageUrl = await Promise.all(bannerDiscountItems.map(async (banner) =>
                {
                    const response = await fetch(banner.path, {
                        headers: {
                            'Origin': 'http://localhost:3000',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                    });
                    return {
                        url: URL.createObjectURL(await response.blob()),
                        width: 1920,
                        height: 1080,
                    }
                }));
                setLoaderBannerDis(false);
                setBannerDiscount(imageUrl);
            }catch(error){
                console.log(error)
            }
        }
        fetchBanner();
        fetchBannerDiscount()
    }, [])

    return (
        <div className='bg-primayBG py-12 x1:px-28 px-4 relative'>
            <div className='flex justify-center'>
                    {loaderBanner ? (
                        <SkeletonCard className='w-[50%] h-[350px]' />
                    ) : (
                        <Carousel  
                            autoPlay 
                            infiniteLoop 
                            dynamicHeight 
                            emulateTouch 
                            showStatus={false} 
                            showThumbs={false} 
                            swipeable={false}
                            interval={5000}
                            showArrows={false}
                            className='w-[50%] h-auto'
                            >
                                {banner && banner.map((banner, index) => (
                                    <div key={index} className='flex justify-center h-auto w-full'>
                                        <Image
                                            src={banner.url}
                                            alt=''
                                            width={banner.width || 1920} // Default width (1920)
                                            height={banner.height || 1080} // Default height (1080)
                                            className='max-w-full max-h-full object-cover'
                                        />
                                    </div>
                                ))}
                        </Carousel>
                    )}
            </div>
            <div className='mb-6 md:mb-8 lg:mb-5 lg:mt-12'>
                <div className='post-type-wrapper banner-wrapper flex justify-center'>
                    {loaderBannerDis ? (
                            <SkeletonCard className='w-[50%] h-[350px]' />
                        ) : (
                        <div className='banner__details-wrapper'>
                            <div 
                                className='lg:mb-5 font-bold text-2xl font-sans post-type__title truncated truncated--two-lines margin-bottom text-center'>
                                SALORA Gratis Ongkir ? Emang Iya
                            </div>
                            <div className='flex justify-center'>
                                <Carousel 
                                    autoPlay 
                                    infiniteLoop 
                                    dynamicHeight 
                                    emulateTouch 
                                    showStatus={false} 
                                    showThumbs={false} 
                                    swipeable={false}
                                    interval={5000}
                                    showArrows={false}
                                    className='w-[50%] h-auto'
                                    >
                                        {bannerDiscount && bannerDiscount.map((banner, index) => (
                                            <div key={index} className='flex justify-center h-auto w-full'>
                                               <Image
                                                    src={banner.url}
                                                    alt=''
                                                    width={banner.width || 1920} // Default width (1920)
                                                    height={banner.height || 1080} // Default height (1080)
                                                    className='max-w-full max-h-full object-cover'
                                                />
                                            </div>
                                        ))}
                                </Carousel>
                            </div>
                        </div>
                      )}
                </div>
            </div>
        </div>
    )
}

export default Banner;