"use client"; // This must be the first line in the file

import { Phone } from 'lucide-react';
import React from 'react';

const PhoneCallLink = ({ phone }: { phone?: string }) => {
  const handlePhoneCallClick = () => {
    const phoneNumber = phone || '1234567890';
    const url = `tel:${phoneNumber}`;
    window.location.href = url;
  };

  return (
    <a
      className="group flex justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
      href="#"
      onClick={handlePhoneCallClick}
    >
 <Phone className="mr-2 h-5 w-5" />
 <span className="sr-only">اتصل بالوكيل</span>
 </a>
  );
};

export default PhoneCallLink;