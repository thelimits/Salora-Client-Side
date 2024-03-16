import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = ({ className }: { className?: string }) => {
    return (
        <div className={`Skeleton relative w-[50%] h-[350px] ${className}`}>
          <Skeleton className="Skeleton relative w-full h-full" />
        </div>
    );
  };
  export default SkeletonCard;
