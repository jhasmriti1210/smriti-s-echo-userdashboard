"use client";
import { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaMicrophone,
  FaTimesCircle,
  FaVolumeUp,
  FaFeatherAlt,
} from "react-icons/fa";
import Footer from "../../../components/Footer";
import SimplePoetryCard from "@/components/news/items/SimplePoetryCard";
import { base_api_url } from "@/config/Config";

const DictionaryPage = () => {
  const [word, setWord] = useState("");
  const [language, setLanguage] = useState("english");
  const [meanings, setMeanings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [poetryList, setPoetryList] = useState([]);
  const recognitionRef = useRef(null);
  const speechRef = useRef(null);
  const [randomInspirationalLine, setRandomInspirationalLine] = useState("");

  const inspirationalLines = [
    "If love were truly without conditions, No one would be betrayed.",
    "Poetry is the voice of the soul, echoing what words alone cannot express.",
    "In the silence of the heart, poetry speaks its truest form.",
    "Shayari is the art of painting emotions with words.",
    "The beauty of poetry lies in its simplicity and depth, revealing the unspoken truth.",
    "When words fall short, poetry stands tall, telling stories the world has yet to hear.",
    "Every line of poetry is a doorway to a different world of emotions and thoughts.",
  ];

  // Only generate random line client-side
  useEffect(() => {
    const randomLine =
      inspirationalLines[Math.floor(Math.random() * inspirationalLines.length)];
    setRandomInspirationalLine(randomLine);
  }, []);

  useEffect(() => {
    const fetchPoetry = async () => {
      try {
        const response = await fetch(`${base_api_url}/api/all/poetry`);
        const data = await response.json();
        const poetryData = data?.poetry;

        // Flatten and limit to 3-4 items
        const flattened = Object.values(poetryData).flat().slice(0, 2);
        setPoetryList(flattened);
      } catch (err) {
        console.error("Failed to fetch poetry:", err);
      }
    };

    fetchPoetry();
  }, []);

  const handleSearch = async () => {
    if (!word) {
      setError("Please enter a word.");
      return;
    }

    setLoading(true);
    setError("");
    setMeanings([]);

    try {
      const response = await fetch(
        `/api/dictionary?word=${word}&lang=${language}`
      );
      const data = await response.json();

      if (data.error || !data.meanings || data.meanings.length === 0) {
        setError("No meaning found.");
      } else {
        setMeanings(data.meanings);
      }
    } catch (err) {
      setError("An error occurred while fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const spokenWord = event.results[0][0].transcript;
      setWord(spokenWord);
    };

    recognition.onerror = (event) => {
      if (event.error === "abort") {
        setError("Speech recognition was aborted. Please try again.");
      } else {
        setError(`Speech recognition error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
    };

    recognition.start();
  };

  const handleClear = () => {
    setWord("");
    setError("");
    setMeanings([]);
  };

  const handleTextToSpeech = (text) => {
    if (speechRef.current && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    } else {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
      speechRef.current = speech;

      speech.onend = () => {
        window.speechSynthesis.pause();
      };

      setTimeout(() => {
        window.speechSynthesis.pause();
      }, 5000);
    }
  };

  return (
    <div className="mt-28 bg-[#fefaf3]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 min-h-screen flex flex-col lg:flex-row gap-8 mt-6">
        {/* Left Side - Dictionary Section */}
        <div className="lg:w-2/3">
          <h1 className="text-5xl font-sans font-bold mt-6 text-black mb-4 ">
            Poetry Dictionary
          </h1>
          <p className="text-lg text-gray-700 mb-10 max-w-3xl">
            Discover meanings of words often used in{" "}
            <span className="italic">sher o shayari</span>. Enter a word or use
            voice search to explore its poetic essence.
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter word or use voice"
                className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={startListening}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
                title="Speak"
              >
                <FaMicrophone />
              </button>
              <button
                onClick={handleClear}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-800"
                title="Clear"
              >
                <FaTimesCircle />
              </button>
            </div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full md:w-1/4 p-4 border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8C4F38]"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="urdu">Urdu</option>
            </select>

            <button
              onClick={handleSearch}
              className="p-4 bg-[#8C4F38] text-white rounded-lg hover:bg-[#8C4F38] focus:ring-2 focus:ring-[#8C4F38] w-full md:w-auto"
            >
              <FaSearch />
            </button>
          </div>

          {loading && <div className="text-gray-500 text-lg">Loading...</div>}
          {error && <div className="text-red-500 text-lg">{error}</div>}

          {meanings.length > 0 && (
            <div className="mt-8 max-w-5xl px-0">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">
                Smriti's dictionary
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {meanings.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-200"
                  >
                    <h3 className="text-xl font-semibold text-blue-800 mb-2 capitalize">
                      {word}
                    </h3>

                    <div className="mb-4">
                      <p className="font-medium text-gray-800">Definition:</p>
                      <p className="text-gray-700">{item.definition}</p>
                    </div>

                    <button
                      onClick={() => handleTextToSpeech(item.definition)}
                      className="text-green-600 flex items-center gap-2 mb-4 hover:text-green-800"
                      title="Listen to meaning"
                    >
                      <FaVolumeUp /> Listen
                    </button>

                    {item.synonyms && item.synonyms.length > 0 && (
                      <div className="mb-4">
                        <p className="font-medium text-purple-800">
                          Best Words to Use in Your Poetry:
                        </p>
                        <p className="text-sm text-gray-700 italic">
                          {item.synonyms.slice(0, 5).join(", ")}
                          {item.synonyms.length > 5 ? "..." : ""}
                        </p>
                      </div>
                    )}

                    {item.example && (
                      <div className="mb-4">
                        <p className="font-medium text-green-700">Example:</p>
                        <p className="text-sm text-gray-700">
                          "{item.example}"
                        </p>
                      </div>
                    )}

                    <div className="text-sm text-blue-600 italic mt-2">
                      You can use <span className="font-bold">{word}</span> in
                      your poetry to convey emotions like "
                      {item.definition.toLowerCase()}."
                    </div>

                    {language === "hindi" && item.hindiMeaning && (
                      <div className="mt-4">
                        <p className="font-medium text-gray-800">
                          Hindi Meaning:
                        </p>
                        <p className="text-gray-700">{item.hindiMeaning}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Poetry Corner */}
        <div className="lg:w-[70vh] bg-gradient-to-br bg-[#fefaf3] p-6 rounded-xl shadow-md border border-gray-200 -mr-16">
          <div className="flex items-center gap-2 mb-4">
            <FaFeatherAlt className="text-green-600 text-2xl" />
            <h2 className="text-2xl font-bold text-green-900">Poetry Corner</h2>
          </div>
          <p className="text-gray-800 mb-6 italic">
            Words have a soul, and poetry gives them wings.
          </p>

          <blockquote className="border-l-4 border-green-600 pl-4 mb-6 text-gray-700 italic">
            {randomInspirationalLine}
            <br />
            <span className="text-right block mt-2 font-medium text-green-800">
              – Smriti Jha
            </span>
          </blockquote>

          <div className="mt-4 bg-white p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Inspirational Line:
            </h3>
            <p className="text-gray-600">
              "हर लफ्ज़ में बस एक एहसास छुपा होता है, शायरी में वो बेनाम जज़्बात
              लिखा होता है।"
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {poetryList.map((item, index) => (
              <SimplePoetryCard item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DictionaryPage;
