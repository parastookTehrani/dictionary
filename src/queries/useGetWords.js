import { useQuery } from "@tanstack/react-query";
import { client } from "../lib/axios";

const getWords = (word) => client.get(`v2/entries/en/${word}`)

export const useGetWords = () => 
    useQuery({
        queryKey: ['words'],
        queryFn: (word) => getWords(word)
    })