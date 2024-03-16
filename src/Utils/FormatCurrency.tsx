import React from 'react';

interface FormatCurrencyProps {
  angka: number | string; // Assuming angka can be either number or string
}

const FormatCurrency: React.FC<FormatCurrencyProps> = ({ angka }) => {
  // Fungsi untuk mengubah angka menjadi format mata uang rupiah
  const formatRupiah = (angka: number | string): string => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
    return formatter.format(parseInt(angka as string, 10));
  };

  return (
    <h4 className='text-red-500'>
      {formatRupiah(angka)}
    </h4>
  );
};

export default FormatCurrency;
