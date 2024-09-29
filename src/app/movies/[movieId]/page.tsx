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
    const [trailers, setTrailers] = useState<any[]>([]);

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
                const videoResponse = await axios(`${params.movieId}/videos`)
                // console.log(videos.data)
                setTrailers(videoResponse.data);

            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, [params.movieId]);


    return (
        <main>
      <nav className="sticky top-0 flex h-16 justify-between items-center gap-4 px-4 z-50 md:px-6 border-b-2 bg-background">
        <div className="text-2xl">
          <Link href="/" className="flex gap-4 md:gap-6">
            <Clapperboard className="text-primary" />
            <p>Movies</p>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/movies" className="text-primary content-center underline">
            <div>Explore</div>
          </Link>
          <ModeToggle />
        </div>
      </nav>
      <div
        className="flex flex-col w-full justify-around items-center"
        style={{ height: "calc(100% - 4rem)" }}
      >
        {movieData ? (
          <div
            className="md:flex md:flex-row-reverse mt-6"
            style={{ maxWidth: "1336px" }}
          >
            <div className="md:w-4/5 flex justify-around p-4">
              <Image
                alt="Movie_Poster_Image"
                className="rounded-xl"
                src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
                sizes="(min-width: 808px) 90vw, 40vw"
                width={400}
                height={500}
              />
            </div>
            <div className="flex flex-col text-center p-4 md:text-left gap-2 md:gap-4">
              <div>
                <h1 className="text-5xl font-bold text-primary">
                  {movieData?.title}
                </h1>
                <h3 className="text-xl text-muted-foreground">
                  {formatGenres(movieData?.genres)}{" "}
                  <span className="float-right">{movieData?.release_date}</span>
                </h3>
              </div>
              <p>{movieData?.overview}</p>
              <p>{formatRuntime(movieData.runtime)}</p>
              {trailers.length > 0 && (
                <iframe
                  width="840"
                  height="472.5"
                  src={`https://www.youtube.com/embed/${trailers[0].key}`}
                  title={trailers[0].name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg mt-4"
                ></iframe>
              )}
            </div>
          </div>
        ) : (
          <div className="text-3xl">Movie data not available</div>
        )}

        {/* Trailers Section */}
        <div className="mt-8 w-full p-4">
          <h2 className="text-3xl font-bold text-center">Other Trailers</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
            {trailers.length > 0 ? (
              trailers.slice(1).map((trailer) => (
                <iframe
                  key={trailer.id}
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              ))
            ) : (
              <p>No trailers available</p>
            )}
          </div>
        </div>
      </div>
    </main>
    )
}