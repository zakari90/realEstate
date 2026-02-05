import { useTranslations } from 'next-intl';
import Image from 'next/image'
import React from 'react'

export default function AboutSection({}) {
  const t = useTranslations('aboutSection');

  return (
      <section id='about'      
      className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1 className='mt-6 text-3xl font-bold  sm:text-3xl md:text-4xl'>{t('title')}</h1>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative my-auto h-50 overflow-hidden sm:h-80 lg:h-1/2 rounded-sm">
      <Image
      width={500}
      height={500}
        alt=""
        src="/images/about-pic.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      />
      </div>
      <div className="lg:py-16">
        <article className="space-y-4 ">
        <p>
          {t('introduction')}
          </p>
          <h2 className="text-2xl font-bold">{t('aboutSectionElements.commitment')}</h2>
          <p><span className="p-6"></span>{t('commitment')}</p>

          <h2 className="text-2xl font-bold">{t('aboutSectionElements.sustainability')}</h2>
          <p><span className="p-6"></span>{t('sustainability')}</p>
          <h2 className="text-2xl font-bold">{t('aboutSectionElements.productsRange')}</h2>
          <p><span className="p-6"></span>{t('productsRange')}</p>
          <h2 className="text-2xl font-bold">{t('aboutSectionElements.conclusion')}</h2>
          <p><span className="p-6"></span>{t('conclusion')}</p>
        </article>
      </div>
    </div>

</section>
  )
}

