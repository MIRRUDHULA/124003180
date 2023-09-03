import React, { useState, useEffect } from "react";

function NumberManagementService() {
  const [urls, setUrls] = useState([]);
  const [mergedNumbers, setMergedNumbers] = useState([]);

  useEffect(() => {
    async function fetchDataFromUrl(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const numbers = data.numbers;

        setMergedNumbers((prevMergedNumbers) => {
          return Array.from(new Set([...prevMergedNumbers, ...numbers])).sort(
            (a, b) => a - b
          );
        });
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    }

    Promise.all(urls.map((url) => fetchDataFromUrl(url))).then(() => {
      console.log("All data fetched and merged:", mergedNumbers);
    });
  }, [urls]);

  const handleUrlChange = (e) => {
    const newUrls = e.target.value.split("\n").filter((url) => url.trim() !== "");
    setUrls(newUrls);
  };

  return (
    <div>
      <h1>Number Management Service</h1>
      <div>
        <h2>Enter URLs:</h2>
        <textarea
          rows="5"
          cols="50"
          onChange={handleUrlChange}
          placeholder="Enter one URL per line...."
        ></textarea>
      </div>
      <div>
        <h2>Merged Unique Numbers:</h2>
        <pre>{JSON.stringify(mergedNumbers, null, 2)}</pre>
      </div>
    </div>
  );
}

export default NumberManagementService;
