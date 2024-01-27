import React, { useState } from "react";

const Thumbnailsize = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [customTitle, setCustomTitle] = useState("");
  const [selectedView, setSelectedView] = useState("homeLargeBrowser"); // Default to home large browser view
  const [previews, setPreviews] = useState([]);

  const deviceViews = {
    appleDevice: { width: 512, aspectRatio: "auto 512 / 288", height: 288 },
    mobileDevice: { width: 375, aspectRatio: "auto 375 / 211", height: 211 },
    mobileInColumn: { width: 160, aspectRatio: "auto 160 / 90", height: 90 },
    watchLaterList: { width: 160, aspectRatio: "auto 160 / 90", height: 90 },
    watchLaterLarge: {
      width: 312,
      aspectRatio: "auto 312 / 175.5",
      height: 175.5,
    },
    channelPageSmall: {
      width: 210,
      aspectRatio: "auto 210 / 117.5",
      height: 117.5,
    },
    channelPageLarge: {
      width: 424,
      aspectRatio: "auto 424 / 238",
      height: 238,
    },
    sidebar: { width: 168, aspectRatio: "auto 168 / 94", height: 94 },
    homeSmallBrowser: {
      width: 240,
      aspectRatio: "auto 240 / 135",
      height: 135,
    },
    homeLargeBrowser: {
      width: 360,
      aspectRatio: "auto 360 / 202",
      height: 202,
    },
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomTitle = () => {
    if (uploadedImage && customTitle) {
      // Add the new preview to the list
      const newPreview = {
        id: new Date().getTime(),
        image: uploadedImage,
        title: customTitle,
        profileName: "John Doe", // Dummy profile name
        profileImage: "https://via.placeholder.com/50", // Dummy profile image
        time: "2 hours ago", // Dummy time
      };

      setPreviews((prevPreviews) => [...prevPreviews, newPreview]);

      // Reset state for the next upload
      setUploadedImage(null);
      setCustomTitle("");
    }
  };

  const handleRemovePreview = (id) => {
    setPreviews((prevPreviews) =>
      prevPreviews.filter((preview) => preview.id !== id)
    );
  };

  return (
    <div className="h-screen bg-gradient-to-r from-sky-400 to-rose-500 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Thumbnail Previews
        </h1>

        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-2"
          />
          <input
            type="text"
            placeholder="Enter Custom Title"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mt-2"
            onClick={handleAddCustomTitle}
          >
            Add Preview
          </button>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${deviceViews[selectedView].width}px, 1fr))`,
            gap: "1rem",
            justifyContent: "center", // Center the grid items
          }}
        >
          {previews.map((preview) => (
            <div
              key={preview.id}
              className="relative  bg-gray-100 rounded"
              style={{
                width: `${deviceViews[selectedView].width}px`,
                aspectRatio: deviceViews[selectedView].aspectRatio,
                height: `${deviceViews[selectedView].height}px`,
              }}
            >
              <img
                src={preview.image}
                alt="Thumbnail"
                className="absolute object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <img
                    src={preview.profileImage}
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="text-white">{preview.profileName}</p>
                </div>
                <p className="text-white font-semibold">{preview.title}</p>
              </div>
              <button
                className="absolute top-2 right-2 text-white hover:underline focus:outline-none"
                onClick={() => handleRemovePreview(preview.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Thumbnailsize;
