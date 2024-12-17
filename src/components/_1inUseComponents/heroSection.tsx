"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AArrowDownIcon, ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import required modules
import { ReactTyped } from "react-typed";

export default function HeroSection() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [property, setProperty] = useState<boolean>(true);
    const [inverstment, setInvestment] = useState<boolean>(true);

    const handleSearch = async () => {
        if (!searchTerm) return;
        const queryParams = new URLSearchParams();
        queryParams.set('location', searchTerm.toLocaleLowerCase());
        queryParams.set('property', String(property));
        queryParams.set('investment', String(inverstment));        
        router.push(`/search-results?${queryParams.toString()}`);
    };

    // Add event listener for keyboard input (Enter key)
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleSearch(); // Trigger search on Enter key press
            }
        };

        // Attach the event listener
        window.addEventListener('keydown', handleKeyPress);

        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []); // Re-run effect when searchTerm, property, or investment changes

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

            <Card className=" relative z-10 w-full max-w-lg mx-4 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-3xl font-extrabold sm:text-5xl">
                    تبحث عن
                    <ReactTyped className="block mt-3 font-extrabold text-rose-700" 
                    strings={["ملكية بالتقسيط", "ملكية مشتركة", "مستثمر او شريك"]} 
                    loop typeSpeed={100} />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className=" m-auto flex-col md:flex-row items-center space-y-2 ">
                    <div className="flex w-full md:w-2/3 ">
                    <Input
                            id="input-20"
                            className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
                            placeholder="المكان"
                            type="text"
                            value={searchTerm} // Bind the state to the input value
                            onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
                        />
                        <button
                            className={`inline-flex w-9 items-center justify-center rounded-e-lg border border-input text-sm text-muted-foreground/80 ring-offset-background transition-shadow focus:z-10 focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${searchTerm !== "" ? 'bg-blue-500 text-white' : 'bg-background'}`}
                            aria-label="Subscribe"
                            onClick={handleSearch}
                        >
                            {
                                searchTerm !== "" ? 
                                <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" /> :
                                <Search size={16} strokeWidth={2} aria-hidden="true" />
                            }
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
                </CardContent>
            </Card>
        </section>
    )
}
