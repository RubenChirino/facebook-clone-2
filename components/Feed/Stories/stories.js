import { useEffect, useState } from "react";
import { getData } from "../../../helpers/utils";

import StoryCard from "./storyCard";

function Stories() {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    getData(`http://localhost:3000/api/data`).then((data) => {
      setStories(data.stories);
    });
  }, []);

  return (
    <div className="flex justify-center space-x-3 mx-auto">
      {stories &&
        stories.map((story) => (
          <StoryCard
            key={story.src}
            name={story.name}
            src={story.src}
            profile={story.profile}
          />
        ))}
    </div>
  );
}

export default Stories;
