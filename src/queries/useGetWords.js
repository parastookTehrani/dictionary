// src/queries/useGetWords.js
import { useQuery } from "@tanstack/react-query";
import { client } from "../lib/axios";

const getWords = async (word) => {
  if (!word) return null;
  const res = await client.get(`/v2/entries/en/${word}`);
  return res.data[0]; // فقط داده واقعی کلمه
};

export const useGetWords = (word) =>
  useQuery({
    queryKey: ["words", word],
    queryFn: () => getWords(word),
    enabled: !!word, // فقط وقتی word مقدار داشته باشه اجرا میشه
  });
