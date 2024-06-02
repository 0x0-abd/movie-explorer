import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image"
import {display_genre} from "@/lib/genres";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    id: number;
    overview: string;
    poster_path: string;
    adult: boolean;
    release_date: string;
    genre_ids: number[];
    runtime: number;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
 
  const truncateTitle = (title:string, maxLength:number) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };


  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5  py-15 self-center ",
        className
      )}
      style={{maxWidth: "1336px"}}
    >
      {items.map((item, idx) => (
        <Link
          href={`/movies/${item?.id}`}
          key={item?.id}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card title={item.title} poster_path={item.poster_path}>
            <CardTitle className="text-start">{item.title}</CardTitle>
            <CardDescription className="text-start text-muted-foreground ">{item.release_date.substring(0, 4)} <span>{item.adult ? "Adult" : ""}</span></CardDescription>
            {/* <CardDescription>{!item.overview && "Description for the movie not available"}{truncateTitle(item.overview, 250)}</CardDescription> */}
            <CardDescription className="text-start pb-1">{display_genre(item.genre_ids)}</CardDescription>
          </Card>
        </Link>
      ))}``
    </div>
  );
};
 
export const Card = ({
  className,
  children,
  title,
  poster_path
}: {
  className?: string;
  children: React.ReactNode;
  title: string,
  poster_path: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-background border b-2 dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        {poster_path && <Image
        className="block m-auto w-auto h-auto"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={200}
            height={500}
         />}
        <div className="px-2">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-primary font-medium text-xl tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-foreground tracking-wide leading-relaxed text-base",
        className
      )}
    >
      {children}
    </p>
  );
};