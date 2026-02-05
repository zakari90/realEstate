import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Real State',
    description: 'website for a Real State',
  };

export default function AboutLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return children;
  }
  