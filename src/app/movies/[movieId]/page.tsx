"use client"

import { Clapperboard, Search } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import Image from "next/image";

export default function Movies({ params }: {
    params: {
        movieId: number;
    }
}) {

    const [movieData, setMovieData] = useState<any>()

    const formatGenres = (genres: { id: number; name: string }[]): string => {
        return genres.map((genre) => genre.name).join(", ");
    };

    const formatRuntime = (runtime: number): string => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
            return minutes > 0 ? `${hours} hours ${minutes} minutes` : `${hours} hours`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`/search/id/${params.movieId}`);
                setMovieData(response.data);
                // console.log(response.data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, [params.movieId]);


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
                    <Link href="/movies" className="text-primary content-center underline"><div>Explore</div></Link>
                    <ModeToggle />
                </div>

            </nav >
            <div className="flex flex-col w-full justify-around items-center" style={{ height: "calc(100% - 4rem)" }}>

                {/* {movieData?.results?.length as number === 0 ? (
                    <>No movie found</>
                ) : (
                    <></>
                ) }
                {movieData?.results && movieData?.results?.length as number > 0 && <HoverEffect items={movieData?.results}/>} */}

                {movieData ? (
                    <div className="md:flex md:flex-row-reverse mt-6" style={{ maxWidth: "1336px" }}>
                        <div className="md:w-4/5 flex justify-around p-4">
                            <Image
                                alt="Movie_Poster_Image"
                                className=" rounded-xl"
                                src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
                                sizes="(min-width: 808px) 90vw, 40vw"
                                width={400}
                                height={500}
                            />
                        </div>
                        <div className="flex flex-col text-center p-4 md:text-left gap-4 md:gap-8">
                            <div>
                                <h1 className="text-5xl font-bold text-primary">{movieData?.title}</h1>
                                <h3 className="text-xl text-muted-foreground">{formatGenres(movieData?.genres)} <span className="float-right">{movieData?.release_date}</span></h3>
                            </div>
                            <p>{movieData?.overview}</p>
                            <p>{formatRuntime(movieData.runtime)}</p>
                        </div>

                    </div>
                ) : (
                    <div className="text-3xl">
                        Movie data not available
                    </div>
                )}
            </div>
        </main >
    )
}