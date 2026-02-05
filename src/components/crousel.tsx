"use client"
import Image from 'next/image';
import { useState } from 'react';

const slides = [
  {
    id: 1,
    image: '/images/hero1.jpg',
    title: 'Discover Our New Collection',
    description: 'High-quality fabrics for every need.',
  },
  {
    id: 2,
    image: '/images/hero2.jpg',
    title: 'Luxurious Linen Fabrics',
    description: 'Experience the best of linen fabrics.',
  },
  {
    id: 3,
    image: '/images/hero3.jpg',
    title: 'Premium Silk Fabrics',
    description: 'Silk fabrics that feel like luxury.',
  },
];

export default function Carousel2() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <>


<section className='relative'>

    <div className="mx-auto lg:flex lg:items-center">
    <div className="mx-auto text-center w-full overflow-hidden">
      <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} 
        className="w-full  flex-shrink-0 relative"
          >
            <Image 
          width={500}
          height={500} 
          src={slide.image} alt={slide.title} 
          className="w-full h-full object-cover" 
      />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
              <h2 className="text-3xl font-bold sm:text-5xl">{slide.title}</h2>
              <p className="mt-4 max-w-lg sm:text-xl/relaxed">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} 
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full">
        &#10094;
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full">
        &#10095;
      </button>
    </div>
    </div>
    </section>
    </>

  );
}
