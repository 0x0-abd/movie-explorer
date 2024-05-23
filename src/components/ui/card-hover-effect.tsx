import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image"
 
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
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-15",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.title}
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
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{!item.overview && "Description for the movie not available"}{truncateTitle(item.overview, 250)}</CardDescription>
          </Card>
        </Link>
      ))}
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
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-background border b-2 dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50 lg:flex">
        {poster_path && <Image
        className="block m-auto w-auto h-auto"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={200}
            height={500}
         />}
        <div className="p-4">{children}</div>
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
    <h4 className={cn("text-primary font-bold tracking-wide mt-4", className)}>
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
        "mt-8 text-foreground tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};