import React, { createContext, useContext, useState, ReactNode } from 'react';

type MovieContextType = {
    movieData: movieData | undefined;
    setMovieData: React.Dispatch<React.SetStateAction<movieData | undefined>>;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    selectedGenres: number[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
};

type movieData = {
    page: number;
    results: any[];
    total_pages: number;
    total_results: number;
}

const defaultContextValue: MovieContextType = {
    movieData: undefined,
    setMovieData: () => {},
    input: '',
    setInput: () => {},
    selectedGenres: [],
    setSelectedGenres: () => {},
};

const MovieContext = createContext<MovieContextType>(defaultContextValue);

export function MovieProvider({ children }: { children: ReactNode }) {
    const [movieData, setMovieData] = useState<movieData | undefined>(undefined);
    const [input, setInput] = useState<string>('');
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

    return (
        <MovieContext.Provider value={{ movieData, setMovieData, input, setInput, selectedGenres, setSelectedGenres }}>
            {children}
        </MovieContext.Provider>
    );
}

export function useMovieContext() {
    return useContext(MovieContext);
}