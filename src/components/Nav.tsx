"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ComponentProps, ReactNode } from 'react'

export function Nav(
    {children}:{children:ReactNode}

) {
  return (
    <nav className='flex flex-col md:flex-row justify-center px-4'>{children}</nav >
  )
}


export function NavLink(props:Omit<ComponentProps< typeof Link> ,"className">) {
    const pathname = usePathname()
    return <Link
    {...props} 
    className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
    
}