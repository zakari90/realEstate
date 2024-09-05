"use client"
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import "./animatedBanner.css";
import { Input } from '@/components/ui/input';

function MainBanner() {
  return (
    <section >
        <div className='relative'>
            <Carousel
        opts={{
        loop: true,
        align: "start",
        }}
        plugins={[
        Autoplay({
            delay: 5000,
        }),
        ]} 
    >
        <CarouselContent >
        {["/images/cotton/cotton1.jpg", "/images/cotton/cotton2.jpg", "/images/cotton/cotton3.jpg", "/images/cotton/cotton-plant.jpg"].map((img, index) => (
            <CarouselItem key={index} className=' basis-1/3'>
            <img className='rounded-full w-96 h-96' src={`${img}`} alt={`Slide ${index + 1}`} />
            </CarouselItem>
        ))}

    </CarouselContent>

            </Carousel>
            <div className='w-2/3 h-full bg-slate-400 blur-sm absolute top-0 left-0'>
                
            </div>
            <div className="circle" >
                <span>
                LUN DEV YOUTUBE - coding and design website - coding and design website
                </span>
            </div>
        </div>

        {/* <p className='z-10'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam labore rerum doloribus quos, dignissimos numquam quisquam dolores nesciunt, necessitatibus, maiores voluptates aperiam facilis nemo! Quidem quisquam natus similique quae at!</p> */}
        </section>
  )
}

export default MainBanner