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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const formSchema = z.object({
    searchQuery: z.string()
  })

type movieData = {
    page:number;
    results:any[];
    total_pages: number;
    total_results: number;
}

export default function Movies() {

    const [ movieData, setMovieData ] = useState<movieData | undefined>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          searchQuery: "",
        },
      })

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

    const genreNames = ["Action", "Mystery", "Romance", "Drama", "Thriller", "Science Fiction", "Adventure", "History", "Comedy", "War", "Crime", "Horror"]

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios(`/search/${values.searchQuery}`)
            setMovieData(response.data)
            console.log(response.data)
        } catch(e) {
            console.error(e)
        }
        // console.log(values)
    }

    useEffect(() => {
        onSubmit({searchQuery:""})
    }, [])
    

    return (
        <main className="h-screen">
            <nav className="flex h-16 sticky justify-between items-center gap-4 px-4 z-50 md:px-6 border-b-2">
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
            <div className="flex flex-col w-full h-full text-center justify-around" style={{ height: "calc(100% - 4rem)" }}>

                {movieData?.results?.length as number === 0 ? (
                    <>No movie found</>
                ) : (
                    <></>
                ) }
                {movieData?.results && movieData?.results?.length as number > 0 && <HoverEffect items={movieData?.results}/>}
            </div>
        </main >
    )
}