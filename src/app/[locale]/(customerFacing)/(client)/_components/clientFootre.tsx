import EmailjsComponent from '@/components/emailjsComponent'
import LogoComponent from '@/components/logoComponents'
import { Separator } from '@/components/ui/separator'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function ClientFooter() {
  return (
    <footer >
      <Separator className='container m-4'/>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <div className="text-sm">
              <LogoComponent/>
              We are a company dedicated to providing excellent services and products to our customers.
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:underline">Home</Link></li>
              <li><Link href="/about" className="text-sm hover:underline">About</Link></li>
              <li><Link href="/services" className="text-sm hover:underline">Services</Link></li>
              <li><Link href="/contact" className="text-sm hover:underline">Contact</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <EmailjsComponent/>
          </div>
        </div>
        <Separator className='container m-4'/>
        <div className=" border-t border-primary-foreground/10 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Zproprty All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}