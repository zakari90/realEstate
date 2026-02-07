"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AArrowDownIcon, ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import required modules
import { ReactTyped } from "react-typed";

export default function HeroSection() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [property, setProperty] = useState<boolean>(true);
  const [inverstment, setInvestment] = useState<boolean>(true);

  const handleSearch = async () => {
    if (!searchTerm) return;
    const queryParams = new URLSearchParams();
    queryParams.set("location", searchTerm.toLocaleLowerCase());
    queryParams.set("property", String(property));
    queryParams.set("investment", String(inverstment));
    router.push(`/search-results?${queryParams.toString()}`);
  };

  // Add event listener for keyboard input (Enter key)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch(); // Trigger search on Enter key press
      }
    };

    // Attach the event listener
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Re-run effect when searchTerm, property, or investment changes

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform scale-105"
        style={{
          backgroundImage: "url('/herobg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>

      <Card className="relative z-10 w-full max-w-2xl mx-4 bg-white/10 backdrop-blur-md border-white/20 shadow-2xl overflow-hidden rounded-2xl">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-teal-400 via-rose-400 to-teal-400"></div>

        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-4xl font-extrabold sm:text-6xl text-white drop-shadow-lg tracking-tight">
            <span className="block mb-2 text-2xl sm:text-3xl font-medium opacity-90">
              تبحث عن
            </span>
            <div className="h-20 flex items-center justify-center">
              <ReactTyped
                className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-rose-200 drop-shadow-sm"
                strings={["ملكية بالتقسيط", "ملكية مشتركة", "مستثمر او شريك"]}
                loop
                typeSpeed={80}
                backSpeed={50}
                showCursor={false}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="relative group w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-rose-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative flex shadow-xl">
                <Input
                  id="search-input"
                  className="h-14 bg-white/95 border-0 rounded-s-xl rounded-e-none text-lg px-6 focus-visible:ring-0 text-slate-800 placeholder:text-slate-400"
                  placeholder="ابحث عن المدينة أو الحي..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className={`inline-flex w-16 items-center justify-center rounded-e-xl transition-all duration-300 ${searchTerm ? "bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white shadow-lg" : "bg-white/90 text-slate-400 hover:bg-white"}`}
                  aria-label="Search"
                  onClick={handleSearch}
                >
                  {searchTerm !== "" ? (
                    <ArrowLeft size={24} strokeWidth={2.5} />
                  ) : (
                    <Search size={22} strokeWidth={2.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex justify-center gap-6">
              <div
                className="relative flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5 hover:bg-black/30 transition-colors cursor-pointer"
                onClick={() => setProperty(!property)}
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${property ? "bg-teal-500 border-teal-500" : "border-white/50"}`}
                >
                  {property && (
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-white font-semibold select-none">
                  ملكية
                </span>
              </div>

              <div
                className="relative flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5 hover:bg-black/30 transition-colors cursor-pointer"
                onClick={() => setInvestment(!inverstment)}
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${inverstment ? "bg-rose-500 border-rose-500" : "border-white/50"}`}
                >
                  {inverstment && (
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-white font-semibold select-none">
                  مستثمر
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
