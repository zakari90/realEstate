"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import required modules
import { ReactTyped } from "react-typed";

export default function HeroSection() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [property, setProperty] = useState<boolean>(false);
    const [inverstment, setInvestment] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
      setIsMounted(true)
    }, [])
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
                    backgroundImage: "url('herobg.jpg')"
                }}
            >
                <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"></div>
            </div>

            <Card className="  relative z-10 w-full max-w-lg mx-4 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-3xl font-extrabold sm:text-5xl">
                    تبحث عن
                    <ReactTyped className="block mt-3 font-extrabold text-rose-700" 
                    strings={["ملكية بالتقسيط", "ملكية مشتركة", "مستثمر او شريك"]} 
                    loop typeSpeed={100} />
                        {/* <span className="block font-extrabold text-rose-700"> Forever Home. </span> */}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                    <div className="flex-col justify-around md:flex-row items-center m-auto space-y-2 ">
                    <div className="flex w-2/3 ">
                        <Input
                        
                        id="input-20"
                        className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
                        placeholder="المكان"
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
                    <div className=" flex items-center ml-4 gap-3">
                      <div >
                          <input
                          
                              type="checkbox"
                              checked={property}
                              onChange={() => setProperty(!property)}
                          />
                          <label>ملكية</label>
                      </div>
                      <div>
                        <input
                            type="checkbox"
                            checked={inverstment}
                            onChange={() => setInvestment(!inverstment)}
                        />
                          <label>مستثمر</label>
                      </div>
                    </div>
                    </div>

                    </div>
                </CardContent>
            </Card>
        </section>
        

    )
}
