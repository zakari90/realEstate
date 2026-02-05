"use client"; // This must be the first line in the file

import { Mail } from 'lucide-react';
import React from 'react';

const EmailLink = ({ agentEmail, subject, body }: { 
  agentEmail?: string; 
  subject?: string; 
  body?: string; 
}) => {
  const handleEmailClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default anchor click behavior
    const email = agentEmail || 'default@example.com';
    const emailSubject = subject ? encodeURIComponent(subject) : 'Inquiry';
    const emailBody = body ? encodeURIComponent(body) : 'Hello! I am interested in your product.';
    
    const url = `mailto:${email}?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = url; // Redirect to mailto URL
  };

  return (
    <a
      className="group flex justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
      href="#"
      onClick={handleEmailClick}
    >
      <Mail className="mr-2 h-5 w-5"/>
      <span className="sr-only">بريد الوكيل</span>
      </a>
  );
};

export default EmailLink;
