import EmailjsComponent from '@/components/emailjsComponent'
import LogoComponent from '@/components/logoComponents'
import { Separator } from '@/components/ui/separator'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function ClientFooter() {
  return (
    <footer className="bg-gray-800 text-white py-8 flex text-center">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">عن الشركة</h3>
          <div className="text-gray-300">
            <LogoComponent/>
          موقع مخصص لمساعدتك في العثور على الملكية المناسبة وإجراء استثمارات ذكية.          
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
          <ul className="space-y-2">
            <li><Link href="/properties" className="hover:text-blue-400 transition duration-300">الملكيات</Link></li>
            <li><Link href="/investments" className="hover:text-blue-400 transition duration-300">الاستثمارات</Link></li>
            <li><Link href="/about" className="hover:text-blue-400 transition duration-300">من نحن</Link></li>
          </ul>
        </div>
        <div className='m-auto'>
            <EmailjsComponent/>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
        <p>جميع الحقوق محفوظة © {new Date().getFullYear()} شركة الملكيات الخاصة بك</p>
      </div>
    </div>
  </footer>
  )
}