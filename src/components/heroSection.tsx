import React from 'react'

export default function HeroSection({title, description}:{
  title:string, description:string
}) {
  return (
    <section id='home'
    className="relative bg-[url(/images/fabric-manufacturing.jpg)] bg-cover bg-center bg-no-repeat">
    <div className="absolute inset-0 bg-white/75 sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
    <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
    <div className="max-w-xl ltr:sm:text-left rtl:sm:text-right">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-lg sm:text-xl/relaxed">
        {description}
      </p>
    </div>
  </div>
</section> 
  )
}