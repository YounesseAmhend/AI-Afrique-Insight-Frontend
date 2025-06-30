"use client";

import ThemeSwitch from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import { Globe, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { newsApi } from "@/apis/newsApi";

export default function Header() {
    const isMobile = useMobile();
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "News", href: "/news" },
        { name: "Categories", href: "/category" },

        { name: "Authors", href: "/author" },
        { name: "Admin", href: "/admin" },

        { name: "Map", href: "/map" },
        // { name: "About", href: "/about" },
    ];

    const handleDownload = async () => {
        console.log("Download button clicked. Calling API...");
        try {
            await newsApi.downloadNewsAsCsv();
            console.log("Download initiated successfully.");
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unknown error occurred during download.");
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "bg-cyan-600 text-white sticky top-0 z-50 transition-all duration-300",
                scrolled ? "shadow-md py-2" : "py-4",
            )}
        >
            <div className='container mx-auto px-4'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <Link href='/' className='flex items-center'>
                        <div className='relative w-8 h-8 mr-3 overflow-hidden'>
                            <div className='absolute inset-0 bg-white rounded-full opacity-20'></div>
                            <Globe className='absolute inset-0 m-auto text-white h-5 w-5' />
                        </div>
                        <span className='text-xl font-light tracking-wide'>
                            <span className='font-bold'>AI</span>News
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <nav className='hidden md:flex items-center'>
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className='relative mx-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors group'
                                >
                                    {item.name}
                                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full'></span>
                                </Link>
                            ))}
                        </nav>
                    )}

                    {/* Actions */}
                    <div className='flex items-center space-x-1'>
                        {!showSearch ? (
                            <Button
                                variant='ghost'
                                size='icon'
                                onClick={() => setShowSearch(true)}
                                className='text-white/90 hover:text-white hover:bg-cyan-500 rounded-full'
                            >
                                <Search className='h-5 w-5' />
                            </Button>
                        ) : (
                            <div className='flex items-center bg-cyan-500/50 backdrop-blur-sm rounded-full'>
                                <Input
                                    type='search'
                                    placeholder='Search...'
                                    className='bg-transparent border-none text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 w-[180px] h-9 rounded-full'
                                />
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={() => setShowSearch(false)}
                                    className='text-white/90 hover:text-white rounded-full'
                                >
                                    <X className='h-5 w-5' />
                                </Button>
                            </div>
                        )}

                        <ThemeSwitch />

                        <Button
                            onClick={handleDownload}
                            variant='ghost'
                            className='h-9 bg-cyan-500/50 hover:bg-cyan-500 text-white transition-colors duration-200 px-4'
                            aria-label='Download DataSet'
                        >
                            Data-Set
                        </Button>

                        {isMobile && (
                            <Button
                                variant='ghost'
                                size='icon'
                                onClick={() => setShowMenu(!showMenu)}
                                className='md:hidden text-white/90 hover:text-white hover:bg-cyan-500 rounded-full'
                            >
                                {showMenu ? (
                                    <X className='h-5 w-5' />
                                ) : (
                                    <Menu className='h-5 w-5' />
                                )}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobile && showMenu && (
                    <div className='md:hidden py-4 mt-4 border-t border-cyan-500/30 animate-in slide-in-from-top duration-300'>
                        <nav className='flex flex-col space-y-3'>
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className='text-white/90 hover:text-white text-sm font-medium py-2 px-3 hover:bg-cyan-500/30 rounded-md transition-colors'
                                    onClick={() => setShowMenu(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
