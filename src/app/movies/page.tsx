"use client"

import { Clapperboard, Search } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useState, useEffect, useRef } from "react";
import axios from "@/lib/axios";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { genres } from "@/lib/genres";
import { Button } from "@/components/ui/button";
import useDebounce from "@/components/debounce";


type movieData = {
    page: number;
    results: any[];
    total_pages: number;
    total_results: number;
}

export default function Movies() {

    const [movieData, setMovieData] = useState<movieData | undefined>();
    const [input, setInput] = useState<string>('');
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const debouncedInput = useDebounce(input, 250)


    const genreNames = ["Action", "Mystery", "Romance", "Drama", "Thriller", "Science Fiction", "Adventure", "History", "Comedy", "War", "Crime", "Horror"]

    const onSubmit = async (value: string) => {
        try {
            const response = await axios(`/search/${value}`)
            setMovieData(response.data)
            // console.log(response.data)
        } catch (e) {
            console.error(e)
        }
        // console.log(values)
    }

    const handleGenreButtonClick = async (genreNum: number) => {
        setSelectedGenres((prevSelectedGenres) => {
            if (prevSelectedGenres.includes(genreNum)) {
                return prevSelectedGenres.filter((id) => id !== genreNum);
            } else {
                return [...prevSelectedGenres, genreNum];
            }
        })
    }

    // useEffect(() => {
    //     onSubmit("")
    // }, [])

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            try {
                const response = await axios.post(`/genre/`, {
                    genres: selectedGenres
                });
                // console.log(selectedGenres);
                setMovieData(response.data);
            } catch (e) {
                console.error(e);
            }
        };
        if (selectedGenres.length > 0) {
            fetchMoviesByGenre();
        } else {
            onSubmit("");
        }
    }, [selectedGenres]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`/search/${debouncedInput}`)
                setMovieData(response.data)
                // console.log(response.data)
            } catch (e) {
                console.error(e)
            }
        }
        fetchData()
    }, [debouncedInput])

    return (
        <main>
            <nav className="sticky top-0 flex h-16 justify-between items-center gap-4 px-4 z-50 md:px-6 border-b-2 bg-background ">
                <div className="text-2xl">
                    <Link href="/" className="flex gap-4 md:gap-6">
                        <Clapperboard className="text-primary" />
                        <p>Movies</p>
                    </Link>
                </div>
                <div className="flex gap-4">
                    <Input type="text" placeholder="Search movies..." onChange={e => setInput(e.target.value)} />
                    <ModeToggle />
                </div>

            </nav >
            <div className="flex flex-col w-full h-full text-center justify-around">
                <div className="hidden md:flex flex-wrap justify-center gap-2 px-3 py-6 self-center" style={{ maxWidth: "1336px" }}>
                    {genres.map(value => (<Button key={value.id} className={`${selectedGenres.includes(value.id) ? '' : ''}`} variant={selectedGenres.includes(value.id) ? undefined : "outline"} onClick={() => handleGenreButtonClick(value.id)}>{value.name}</Button>))}
                </div>
                <div className="md:hidden self-center pt-4 pb-2">
                    <Drawer>
                        <DrawerTrigger asChild><Button>Select Genres</Button></DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle className="text-center">Choose Genre(s)</DrawerTitle>
                            </DrawerHeader>
                            <DrawerFooter>
                                <div className="flex flex-wrap justify-center gap-2 px-3 py-6 self-center" style={{ maxWidth: "1336px" }}>
                                    {genres.map(value => (<Button key={value.id} className={`${selectedGenres.includes(value.id) ? '' : ''}`} variant={selectedGenres.includes(value.id) ? undefined : "outline"} onClick={() => handleGenreButtonClick(value.id)}>{value.name}</Button>))}
                                </div>
                                <DrawerClose asChild>
                                    <Button variant="outline">Done!</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
                {movieData?.results?.length as number === 0 ? (
                    <>No movie found</>
                ) : (
                    <></>
                )}
                {movieData?.results && movieData?.results?.length as number > 0 && <HoverEffect items={movieData?.results} />}
            </div>
        </main >
    )
}