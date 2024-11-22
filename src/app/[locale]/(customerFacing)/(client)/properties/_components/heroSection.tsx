"use client"
import { InvestmentDTO, PropertyDTO, searchInvestmentsByLocation, searchPropertiesByLocation } from "@/_actions/client/actions";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Download, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [property, setProperty] = useState<boolean>(false);
    const [inverstment, setInvestment] = useState<boolean>(false);

    // This function will be triggered when the user clicks on "Run Search"
    const handleSearch = async () => {
        if (!searchTerm) return; // If there's no search term, do nothing

        // Prepare the search parameters
        const queryParams = new URLSearchParams();
        queryParams.set('location', searchTerm.toLocaleLowerCase());
        queryParams.set('property', String(property));
        queryParams.set('investment', String(inverstment));
        // Redirect to the results page with query parameters
        router.push(`/search-results?${queryParams.toString()}`);
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
                        sale a property in installments
                    </p>
                    <p className="mt-4 text-lg text-gray-700 sm:text-xl text-center sm:text-left">
                        Looking for investors
                    </p>
                    <div>
                    <div className="space-y-2">
                    <div className="flex ">
                        <Input
                        id="input-20"
                        className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
                        placeholder="Location"
                        type="text"
                        />
                        <button
                        className="inline-flex w-9 items-center justify-center rounded-e-lg border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Subscribe"
                        onClick={handleSearch}
                        >
                        <Search size={16} strokeWidth={2} aria-hidden="true" />
                        </button>
                    </div>
                    </div>
                    <div className="flex gap-3">
                    <div className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={property}
                            onChange={() => setProperty(!property)}
                        />
                        <label>Property</label>
                    </div>
                    <div className="flex items-center gap-1">
                        <Input
                            type="checkbox"
                            checked={inverstment}
                            onChange={() => setInvestment(!inverstment)}
                        />
                        <label>Inverstor</label>
                    </div>
                    </div>

                    </div>
                </CardContent>
            </Card>
        </section>
    )
}
