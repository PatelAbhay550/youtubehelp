import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ThumbnailExtractor = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [error, setError] = useState(null);

  const extractThumbnails = async () => {
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
      const response = await axios.get(apiUrl);

      // Extract thumbnails from the API response
      const snippet = response.data.items[0]?.snippet;
      if (snippet) {
        const extractedThumbnails = [
          { type: "default", ...snippet.thumbnails.default },
          { type: "high", ...snippet.thumbnails.high },
          { type: "maxres", ...snippet.thumbnails.maxres },
          { type: "medium", ...snippet.thumbnails.medium },
          { type: "standard", ...snippet.thumbnails.standard },
        ];

        setThumbnails(extractedThumbnails);
        setError(null);
      } else {
        setError("Failed to extract thumbnails. Please try again.");
      }
    } catch (error) {
      console.error("Error extracting thumbnails:", error.message);
      setThumbnails([]); // Clear thumbnails in case of an error
      setError("Failed to extract thumbnails. Please try again.");
    }
  };

  return (
    <div className="md:min-h-screen min-h-screen bg-gradient-to-r from-sky-400 to-rose-500 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-lg shadow-md w-full md:w-1/2">
        <h1 className="text-3xl font-bold mb-4 text-center">
          YouTube Thumbnail Extractor
        </h1>
        <p className="mb-2">Get thumbnails of any YouTube video.</p>
        <input
          type="text"
          placeholder="Enter YouTube Video URL"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button
          className="bg-blue-500 mr-2 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={extractThumbnails}
        >
          Extract Thumbnails
        </button>
        <Link to="/">
          <button className="mt-4  bg-sky-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none">
            Go Back
          </button>
        </Link>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {thumbnails.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">
              Extracted Thumbnails:
            </h2>
            {thumbnails.map((thumbnail) => (
              <div key={thumbnail.type} className="mb-4">
                <p className="font-semibold">{thumbnail.type}:</p>
                <img
                  src={thumbnail.url}
                  alt={thumbnail.type}
                  className="w-full rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailExtractor;
