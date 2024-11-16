"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react";

export default function HeroSection() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [property, setProperty] = useState<boolean>(false);
    const [inverstor, setInvestor] = useState<boolean>(false);
  
    const handleSearch = () => {
      console.log('Search Term:', searchTerm);
      console.log('property 1:', property);
      console.log('inverstor 2:', inverstor);
      // Here you can implement the actual search logic
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')"
                }}
            >
                <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"></div>
            </div>

            <Card className="relative z-10 w-full max-w-lg mx-4 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-3xl font-extrabold sm:text-5xl text-center sm:text-left">
                        Let us find your a s
                        <span className="block font-extrabold text-rose-700"> Forever Home. </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mt-4 text-lg text-gray-700 sm:text-xl text-center sm:text-left">
                        Real estate sale in installments
                    </p>
                    <p className="mt-4 text-lg text-gray-700 sm:text-xl text-center sm:text-left">
                        Looking for investors
                    </p>

                    <div className="mt-8 flex justify-around">
                        <Button onClick={handleSearch} size="lg" className="w-full sm:w-auto ">
                                Run Search
                            </Button>
                        <div className="w-2/3 flex flex-col gap-2 sm:w-auto">
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Location"
                            />
                            <div className="flex gap-3">

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={property}
                                    onChange={() => setProperty(!property)}
                                />
                                <label>Property</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={inverstor}
                                    onChange={() => setInvestor(!inverstor)}
                                />
                                <label>Inverstor</label>
                            </div>
                            </div>
                           
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}
