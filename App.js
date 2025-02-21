import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [jsonInput, setJsonInput] = useState('{"data": ["A", "C", "z"] }');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      setError(null);
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post("https://your-backend-url.com/bfhl", parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON or API error");
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    
    const filteredResponse = {};
    if (selectedFilters.includes("Alphabets")) filteredResponse.alphabets = response.alphabets;
    if (selectedFilters.includes("Numbers")) filteredResponse.numbers = response.numbers;
    if (selectedFilters.includes("Highest Alphabet")) filteredResponse.highest_alphabet = response.highest_alphabet;

    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Full Stack Challenge</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows="4"
        className="border p-2 w-full"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Submit</button>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        <label className="block font-bold">Filter Response:</label>
        <select multiple onChange={(e) => setSelectedFilters([...e.target.selectedOptions].map(o => o.value))}>
          <option value="Alphabets">Alphabets</option>
          <option value="Numbers">Numbers</option>
          <option value="Highest Alphabet">Highest Alphabet</option>
        </select>
      </div>
      <div className="mt-4">{renderResponse()}</div>
    </div>
  );
}
