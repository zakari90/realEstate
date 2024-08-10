
import React from 'react';
import EmailjsComponent from './emailjsComponent';

export default function ContactSection({title, description}:{
  title:string, description:string
}) {
  return (
    <section id='contact' 
    className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
   <></>
    <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
    <div className="relative  flex flex-wrap md:flex-nowrap lg:h-screen lg:items-center">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <p className="mt-4">
            {description}
          </p>
        </div>
        <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <EmailjsComponent/>
        </div>
      </div>
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <iframe
          className="absolute inset-0 h-full w-full object-cover"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d141036.6478226325!2d-9.581362438945167!3d30.41983019474468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sma!4v1717348079580!5m2!1sen!2sma"
          width="600"
          height="450"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      </div>
    </section>
  );
}

