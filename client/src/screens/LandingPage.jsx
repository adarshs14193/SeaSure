import React from "react";
import { OrbitingCirclesDemo } from "@/components/Orbitingcircles";
import SeaSureHero from "@/components/SeaSurehero";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import FreshnessPreview from "@/components/FreshnessPreview";
import WhySeaSure from "@/components/WhySeaSure";
import TechStack from "@/components/TechStack";
import FinalCTA from "@/components/FinalCTA";

export default function LandingPage(){
    return(
        <div className="min-h-screen bg-[#B2EBF2]">
            
            <main className="flex items-center">
            
                <div className="w-full lg:w-1/2 flex items-center justify-center -translate-y-12">
                    <div className="text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-700 tracking-tight">
                        From Sea to Screen 
                    </h1>

                    <h3 className="mt-4 text-lg sm:text-2xl lg:text-3xl font-medium text-orange-400">
                          AI-Verified Fish Freshness <br />
                        So You Know Before You Buy.
                    </h3>

                    <button className="mt-6 bg-[#2F6F4E] hover:bg-green-900 text-white px-4 py-2 rounded-4xl text-lg" onClick={() => window.location.href = '/login'}>
                        Get Started
                    </button>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex justify-center -translate-y-12">
                    <OrbitingCirclesDemo />
                </div>

                
            </main>
            <div className="w-full  flex justify-center">
                <SeaSureHero/>
            </div>
            <div className="w-full  flex justify-center">
                <ProblemSection/>
            </div>
            <div className="w-full  flex justify-center">
                <HowItWorks/>
            </div>
            <div className="w-full  flex justify-center">
                <FreshnessPreview/>
            </div>
            <div className="w-full">
                <WhySeaSure/>
            
                <FinalCTA/>
            </div>
            
                <TechStack/>
            
            
        </div>
    );
}