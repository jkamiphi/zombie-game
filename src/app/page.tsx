"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: "I want to go to the store",
          conversationHistory: [],
          isStart: true,
        }),
      });

      const { narrative, imagePrompt } = await response.json();

      console.log("Narrative:", narrative);

      fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imagePrompt,
        }),
      })
        .then((res) => res.json())
        .then(console.log);
    };

    fetchData();
  }, []);
  return (
    <div className="font-sans min-h-screen p-8 ">zombie apocalypse game</div>
  );
}
