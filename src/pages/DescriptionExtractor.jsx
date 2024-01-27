import React, { useState } from "react";
import { Link } from "react-router-dom";

const DescriptionExtractor = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [desc, setDesc] = useState([]);
  const [error, setError] = useState(null);

  const extractdescription = async () => {
    try {
      if (!videoUrl.trim()) {
        setError("Please enter a valid YouTube Video URL");
        return;
      }

      // Extract video ID from the URL
      const videoIdMatch = videoUrl.match(/[?&]v=([^&]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (!videoId) {
        setError("Invalid YouTube Video URL");
        return;
      }

      // Fetch video details using the YouTube API
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Extract tags from the API response
      const videodescription = data.items[0]?.snippet?.description || [];
      setDesc(videodescription);
      setVideoUrl([]);
      setError(null);
    } catch (error) {
      console.error("Error extracting tags:", error.message);
      setDesc([]); // Clear tags in case of an error
      setError("Failed to extract tags. Please try again.");
    }
  };

  const handleCopyDesc = () => {
    if (desc.length > 0) {
      const descString = desc;
      navigator.clipboard.writeText(descString);
      alert("Description copied to clipboard!");
    }
  };

  return (
    <div className=" min-h-screen md:min-h-screen bg-gradient-to-r from-sky-400 to-rose-500 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
        <h1 className="text-3xl font-bold mb-4 text-center">
          YouTube Description Extractor
        </h1>
        <p className="mb-2">
          Extract Description from YouTube videos with ease.
        </p>
        <input
          type="text"
          placeholder="Enter YouTube Video URL"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button
          className="bg-blue-500 mr-2 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={extractdescription}
        >
          Extract Description
        </button>
        <Link to="/">
          <button className="mt-4  bg-sky-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none">
            Go Back
          </button>
        </Link>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {desc.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              Extracted Description:
            </h2>

            <div className="flex overflow-hidden w-[300px] md:w-full items-center space-x-2 flex-col md:flex-row">
              <span>{desc}</span>
            </div>
            <button
              className="mt-4 mr-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
              onClick={handleCopyDesc}
            >
              Copy Description
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionExtractor;
