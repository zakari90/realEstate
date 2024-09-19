"use client"
import React from 'react'

function LogoComponent() {
    const isBrowser = () => typeof window !== 'undefined';

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  
  return (
    <div className="flex justify-center sm:justify-start hover:cursor-pointer" onClick={scrollToTop}>
        <span className="sr-only">Real Estate Company</span>
        <svg className="h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
          </g><g id="SVGRepo_iconCarrier">
             <path d="M8 3V3.41667M3.41667 8H3M4.66667 4.66667L4.25 4.25M11.3333 4.66667L11.75 4.25M4.66667 11.3333L4.25 11.75M9.73244 7C9.38663 6.4022 8.74028 6 8 6C6.89543 6 6 6.89543 6 8C6 8.74028 6.4022 9.38663 7 9.73244M6 15L12.4083 9.01893C12.7929 8.65995 12.9852 8.48046 13.2041 8.41266C13.3969 8.35296 13.6031 8.35296 13.7959 8.41266C14.0148 8.48046 14.2071 8.65995 14.5917 9.01893L21 15M8 13.1333V19.4C8 19.9601 8 20.2401 8.10899 20.454C8.20487 20.6422 8.35785 20.7951 8.54601 20.891C8.75992 21 9.03995 21 9.6 21H17.4C17.9601 21 18.2401 21 18.454 20.891C18.6422 20.7951 18.7951 20.6422 18.891 20.454C19 20.2401 19 19.9601 19 19.4V13.1333" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  </div>
  )
}

export default LogoComponent

