"use client"

import { Clapperboard, Search } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Input } from "@/components/ui/input";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
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
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import genres from "@/lib/genres";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    searchQuery: z.string()
})

type movieData = {
    page: number;
    results: any[];
    total_pages: number;
    total_results: number;
}

export default function Movies() {

    const [movieData, setMovieData] = useState<movieData | undefined>()
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: "",
        },
    })

    const genreNames = ["Action", "Mystery", "Romance", "Drama", "Thriller", "Science Fiction", "Adventure", "History", "Comedy", "War", "Crime", "Horror"]

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios(`/search/${values.searchQuery}`)
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

    useEffect(() => {
        onSubmit({ searchQuery: "" })
    }, [])

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
            onSubmit({ searchQuery: "" });
        }
    }, [selectedGenres]);

    return (
        <main>
            <nav className="sticky top-0 flex h-16 justify-between items-center gap-4 px-4 z-50 md:px-6 border-b-2 bg-background ">
                <div className="text-2xl flex gap-4 md:gap-6">
                    <Clapperboard className="text-primary" />
                    <p>Movies</p>
                </div>
                <div className="flex gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="searchQuery"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Search movies..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
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