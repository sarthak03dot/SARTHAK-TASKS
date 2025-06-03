import React, { useState } from "react";
import axios from "axios";

function CatFact() {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCatFact = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://catfact.ninja/fact");
      setFact(response.data.fact);
    } catch (error) {
      setFact("Failed to fetch a cat fact.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Cat Fact</h1>
      <button onClick={fetchCatFact}>
        {loading ? "Loading..." : "Get a Cat Fact"}
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {fact && <p><b>{fact}</b></p>}
      </div>
    </div>
  );
}

export default CatFact;
