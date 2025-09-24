import { useState } from "react";
import { useGetWords } from "../queries/useGetWords";

export function Dictionary() {
  const [word, setWord] = useState("");
  const [search, setSearch] = useState("");
  const [synonymFilter, setSynonymFilter] = useState("");

  const { data, isLoading, error } = useGetWords(search);

  const handleSearch = () => {
    setSearch(word);
  };

  const synonyms =
    data?.meanings
      ?.map(meaning => meaning.synonyms || [])
      .reduce((acc, curr) => acc.concat(curr), []) || [];

  const filteredSynonyms = synonyms.filter(syn =>
    syn.toLowerCase().includes(synonymFilter.toLowerCase())
  );

  return (
    <div className="m-4 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="input input-primary"
        />
        <button
          onClick={handleSearch}
          className="btn btn-soft btn-primary"
        >
          Search
        </button>
      </div>

      {isLoading && <span className="loading loading-spinner text-primary"></span>}

      {!isLoading && (error || !data) && search && (
        <p className="text-red-500">Word not found</p>
      )}

      {data && data.meanings && (
        <div>
          <h3 className="font-semibold">Meaning:</h3>
          <ul className="list-disc pl-5">
            {data.meanings.map((item, idx) => (
              <li key={idx}>
                {item.partOfSpeech}: {item.definitions[0]?.definition}
              </li>
            ))}
          </ul>
        </div>
      )}

      {synonyms.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Synonyms:</h3>
          <input
            type="text"
            placeholder="Filter synonyms..."
            value={synonymFilter}
            onChange={(e) => setSynonymFilter(e.target.value)}
            className="input input-bordered w-full mb-2"
          />
          {filteredSynonyms.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {filteredSynonyms.map((syn, idx) => (
                <li key={idx} className="badge badge-outline">
                  {syn}
                </li>
              ))}
            </ul>
          ) : (
            <p>No synonyms found.</p>
          )}
        </div>
      )}
    </div>
  );
}
