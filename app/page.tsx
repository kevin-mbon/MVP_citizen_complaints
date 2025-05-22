import Header from "@/components/layout/Header";
import HeroSection from "@/components/pages/sections/HeroSection";
import AboutSection from "@/components/pages/sections/AboutSection";
import FAQSection from "@/components/pages/sections/FAQSection";
import Assistant from "@/components/features/Assistant";

export default function Home() {
    return (
        <main className={'min-h-screen w-screen'}>
            <Header/>
            <HeroSection/>
            {/*<AboutSection/>*/}
            {/*<FAQSection/>*/}
            <Assistant/>
        </main>
    );
}
