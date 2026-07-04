import { useState, useEffect } from "react";
import axios from "axios";

export default function Feed() {
  const [content, setContent] = useState("");
  const [feeds, setFeeds] = useState([]);


  const getFeeds = async () => {
    try {
      const response = await axios.get("https://chathub-f9rc.onrender.com/api/feed");
      setFeeds(response.data);
    } catch (err) {
      console.log("Cannot get data from backend", err);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("Please enter some content.");
      return;
    }

    try {
      await axios.post("https://chathub-f9rc.onrender.com/api/feed", {
        content,
      });


      setContent("");

      getFeeds();
    } catch (error) {
      console.error(error);
      alert("Failed to add feed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
  <div className="max-w-2xl mx-auto px-4">

    {/* Create Post */}
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex items-start gap-3">
        <img
          src="https://ui-avatars.com/api/?name=Anonymous"
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />

        <div className="flex-1">
          <textarea
            rows="3"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSubmit}
            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>

    {/* Feed */}
    <div className="space-y-5">
      {feeds.map((feed) => (
        <div
          key={feed.id}
          className="bg-white rounded-xl shadow-md p-4"
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=Anonymous"
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />

            <div>
              <h2 className="font-semibold text-gray-800">
                Anonymous User
              </h2>
              <p className="text-sm text-gray-500">
                Just now
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="mt-4">
            <p className="text-gray-800 text-[15px] leading-7">
              {feed.content}
            </p>
          </div>

        </div>
      ))}
    </div>

  </div>
</div>
  );
}
