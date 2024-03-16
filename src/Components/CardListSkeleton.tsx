// CardListSkeleton.tsx
import React from 'react';
import CardSkeleton from './CardSectionSkeleton';

const CardListSkeleton = () => {
  const numberOfSkeletons = 3; // You can adjust this based on your requirements

  return (
    <div className="flex">
      {[...Array(numberOfSkeletons)].map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CardListSkeleton;
