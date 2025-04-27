"use client";

import React, { useState } from "react";

// Define a dictionary of words and their meanings
const dictionary = {
  attachments:
    "A strong feeling of affection or loyalty towards someone or something.",
  fleeting: "Lasting for a very short time.",
  passion: "A powerful emotion, often intense and sometimes overwhelming.",
  blaze:
    "A bright flame or fire, used metaphorically for a strong and sudden feeling.",
  willingly: "Done or given with readiness, without reluctance.",
  choose:
    "To decide on a particular course of action from several alternatives.",
  fall: "To drop or descend to a lower position, often used metaphorically for emotional decline.",
  bleed:
    "To lose blood, often used metaphorically for emotional pain or suffering.",
  silence:
    "The absence of sound, often used metaphorically for emotional restraint or quiet suffering.",
  wear: "To have something on your body as clothing or accessories.",
  peaceful: "Free from disturbance; calm and tranquil.",
  loyalty: "A strong feeling of support or allegiance to someone or something.",
  affection: "A feeling of fondness or tenderness towards someone.",
};

const DictionaryTooltip = ({ word }) => {
  const meaning = dictionary[word.toLowerCase()];
  if (!meaning) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "0",
        backgroundColor: "#333",
        color: "#fff",
        padding: "5px",
        borderRadius: "5px",
        fontSize: "12px",
        whiteSpace: "nowrap",
        zIndex: 1,
        marginTop: "5px",
      }}
    >
      {meaning}
    </div>
  );
};

// Component to display the text with tooltip on hover
const DictionaryText = ({ text }) => {
  const [tooltipWord, setTooltipWord] = useState(null);

  // Function to handle word hover
  const handleMouseOver = (word) => {
    setTooltipWord(word);
  };

  const handleMouseOut = () => {
    setTooltipWord(null);
  };

  const renderText = () => {
    // Split the text into words and map each word to a span
    return text.split(" ").map((word, index) => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, ""); // Clean word of punctuation
      const isDifficult = dictionary[cleanWord.toLowerCase()]; // Check if it's in the dictionary

      return (
        <span
          key={index}
          onMouseOver={() => handleMouseOver(cleanWord)}
          onMouseOut={handleMouseOut}
          style={{
            position: "relative",
            cursor: isDifficult ? "pointer" : "default",
          }}
          className={isDifficult ? "highlighted-word" : ""}
        >
          {word}{" "}
          {isDifficult && tooltipWord === cleanWord && (
            <DictionaryTooltip word={cleanWord} />
          )}
        </span>
      );
    });
  };

  return <>{renderText()}</>;
};

export default DictionaryText;
