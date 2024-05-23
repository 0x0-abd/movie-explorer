"use client"

import { Clapperboard, Search } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";


export default function Movies({ params }: {
    params: {
        movieId: number;
    }
}) {

    const [movieData, setMovieData] = useState<any>()

    const genres = [
        { "id": 28, "name": "Action" },
        { "id": 12, "name": "Adventure" },
        { "id": 16, "name": "Animation" },
        { "id": 35, "name": "Comedy" },
        { "id": 80, "name": "Crime" },
        { "id": 99, "name": "Documentary" },
        { "id": 18, "name": "Drama" },
        { "id": 10751, "name": "Family" },
        { "id": 14, "name": "Fantasy" },
        { "id": 36, "name": "History" },
        { "id": 27, "name": "Horror" },
        { "id": 10402, "name": "Music" },
        { "id": 9648, "name": "Mystery" },
        { "id": 10749, "name": "Romance" },
        { "id": 878, "name": "Science Fiction" },
        { "id": 10770, "name": "TV Movie" },
        { "id": 53, "name": "Thriller" },
        { "id": 10752, "name": "War" },
        { "id": 37, "name": "Western" }
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`/search/id/${params.movieId}`);
                setMovieData(response.data);
                console.log(response.data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, [params.movieId]);


    return (
        <main>
            <nav className="sticky top-0 flex h-16 justify-between items-center gap-4 px-4 z-50 md:px-6 border-b-2 bg-background ">
                <div className="text-2xl flex gap-4 md:gap-6">
                    <Clapperboard className="text-primary" />
                    <p>Movies</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/movies" className="text-primary content-center underline"><div>Explore</div></Link>
                    <ModeToggle />
                </div>

            </nav >
            <div className="flex flex-col w-full text-center justify-around content-center" style={{ height: "calc(100% - 4rem)" }}>

                {/* {movieData?.results?.length as number === 0 ? (
                    <>No movie found</>
                ) : (
                    <></>
                ) }
                {movieData?.results && movieData?.results?.length as number > 0 && <HoverEffect items={movieData?.results}/>} */}

                {movieData ? (
                    <>
                        <h1 className="text-4xl">{movieData?.title}</h1>
                        <p>{movieData?.overview}</p>
                        <p>{movieData.runtime} minutes</p>
                    </>
                ) : (
                    <div className="text-3xl"> 
                        Movie data not available
                    </div>
                )}
            </div>
        </main >
    )
}