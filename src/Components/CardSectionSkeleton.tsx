import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CardSectionSkeleton = () => {
    return (
        <div className="border rounded overflow-hidden shadow-md m-4 w-[23rem]">
          <div className="bg-gray-300 h-96 p-3">
            <Skeleton className='h-[350px]' />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2 mt-10">
              <Skeleton width={100} />
            </h2>
            <p className="line-clamp-3">
              <Skeleton count={3} />
            </p>
          </div>
        </div>
      );
}

export default CardSectionSkeleton;