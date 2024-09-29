"use client"

import { Clapperboard, Search } from "lucide-react";
import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words"
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Image from "next/image";

const formSchema = z.object({
  searchQuery: z.string()
})

export default function Home() {
  const router = useRouter()
  const [query, setQuery] = useState<string>();
  const [carouselData, setCarouselData] = useState<any[]>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  })

  useEffect(()=>  {
    const getCarouselData = async() => {
      try {
        const response = await axios(`/search/`)
        console.log(response.data)
        setCarouselData(response.data.results)
        console.log(carouselData)
      } catch(e) {
        console.log(e)
      }
    }
    getCarouselData();
  }, [])

  const onSubmit = (values: z.infer<typeof formSchema>) => {

    console.log(values)
    setQuery(values.searchQuery)
    router.push('/movies')
  }

  const genreNames = ["Action", "Mystery", "Romance", "Drama", "Thriller", "Science Fiction", "Adventure", "History", "Comedy", "War", "Crime", "Horror"]

  return (
    <main className="h-screen">
      <nav className="sticky top-0 flex h-16 justify-between items-center gap-4 px-4 z-50 md:px-6 border-b-2 bg-background">
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

      </nav>
      <div className="flex flex-col w-full h-full text-center justify-around" style={{ height: "calc(100% - 4rem)" }}>
        <Carousel>
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3"><Image alt="something" src="https://image.tmdb.org/t/p/w500/fqv8v6AycXKsivp1T5yKtLbGXce.jpg" width={500} height={300} /></CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3"><Image alt="something" src="https://image.tmdb.org/t/p/w500/z121dSTR7PY9KxKuvwiIFSYW8cf.jpg" width={500} height={300} /></CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3"><Image alt="something" src="https://image.tmdb.org/t/p/w500/3TNSoa0UHGEzEz5ndXGjJVKo8RJ.jpg" width={500} height={300} /></CarouselItem>
          </CarouselContent>
        </Carousel>
        <div className="flex flex-col py-4 px-4">

          <div className="text-3xl md:text-7xl font-bold dark:text-white w-full">Want <FlipWords words={genreNames} className=" font-bold" /></div>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >

            <div className="font-extralight text-xl md:text-4xl dark:text-neutral-200 py-4">
              We have it all.
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
