"use client"
import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import './prdoductsDetails.css';
import Image from 'next/image';
import WhatsAppLink from '@/components/whatsAppComponents';

interface Product {
  id: number;
  name: string;
  description: string;
  pictures: string[];
}

interface ColorsProps {
  colors: string[];
}

const Colors: React.FC<ColorsProps> = ({ colors }) => {
  return (
    <div className='colors'>
      {colors.map((color, index) => (
        <button key={index} style={{ background: color }}></button>
      ))}
    </div>
  );
};

interface DetailsThumbProps {
  images: string[];
  handleImgChange: (index: number) => void;
  smImgsRef: MutableRefObject<HTMLDivElement | null>;
}

const DetailsThumb: React.FC<DetailsThumbProps> = ({ images, handleImgChange, smImgsRef }) => {
  return (
    <div className="thumb overflow-auto" ref={smImgsRef}>
      {images.map((img, index) => (
        <Image
          src={img}
          height={400}
          width={400}
          alt="small img"
          key={index}
          onClick={() => handleImgChange(index)}
        />
      ))}
    </div>
  );
};

export default function ProductDetails({ product }: { product: any }) {
  const [index, setIndex] = useState(0);
  const smImgsRef = useRef<HTMLDivElement | null>(null);

  const handleImgChange = (newIndex: number) => {
    setIndex(newIndex);
    if (smImgsRef.current) {
      const images = smImgsRef.current.children;
      // remove all img active class 
      for (let i = 0; i < images.length; i++) {
        images[i].className = images[i].className.replace("active", "");
      }
      // set current img active class 
      images[newIndex].className = "active";
    }
  };

  // initial img set active class 
  useEffect(() => {
    if (smImgsRef.current) {
      smImgsRef.current.children[index].className = "active";
    }
  }, [index]);

  return (
    <section className='app'>
      <div key={product.id} className="details">
        <div className='large-img-wrapper'>
          <Image
            height={400}
            width={400}
            src={product?.images[index]}
            alt="largeImg"
            className='large-img'
          />
        </div>

        <div className='box'>
          <div className='row'>
            <h2>{product.name}</h2>
            {/* <span>{price} $</span> */}
          </div>
          {/* colors components  */}
          {/* <Colors colors={colors}/> */}
          {/* <p>{description}</p> */}
          <p>{product.description}</p>
          {/* small images components */}
          <DetailsThumb images={product?.images} handleImgChange={handleImgChange} smImgsRef={smImgsRef} />
          <div className='py-4'>
            <WhatsAppLink productName={product.name} />
          </div>
        </div>
      </div>
    </section>
  );
}
