import React, { useState, useEffect } from "react";
import Masonry from "masonry-layout";
import { BirthdayCard, PostCard } from "../../components";
import { getElapsedDate } from "../../utils/getElapsedDate.js";
import "./NewsFeed.scss";

const NewsFeed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedData, setFeedData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState(null);

  useEffect(() => {
    const fetchNewsFeedData = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_DATABASE_URL}/stories/`
      ).then((res) => res.json().then(setIsLoading(false)));
      setFeedData(data);
    };

    const fetchUserInfo = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_DATABASE_URL}/userData`
      ).then((res) => res.json());
      setCurrentUser(`${data.firstName} ${data.lastName}`);
      setCurrentUserImage(data.userImage);
    };

    fetchNewsFeedData();
    fetchUserInfo();
  }, []);

  const masonryContainer = document.querySelector(".newsfeed__masonry-grid");

  const masonryItem =
    masonryContainer &&
    new Masonry(masonryContainer, {
      itemSelector: ".newsfeed__grid-item",
      columnWidth: ".newsfeed__grid-sizer",
      horizontalOrder: true,
      gutter: 40,
      percentPosition: true,
    });

  const updateLayout = () => {
    if (masonryContainer !== null) {
      masonryItem.layout();
    }
  };

  return (
    <section className="newsfeed">
      <h2 className="h2-alt">News and Stories</h2>
      {!isLoading && feedData && (
        <div className="newsfeed__masonry-grid">
          <div className="newsfeed__grid-sizer"></div>
          {feedData &&
            feedData.map((post) => {
              if (post.type === "birthday") {
                return (
                  <div className="newsfeed__grid-item" key={post.id}>
                    <BirthdayCard
                      id={post.id}
                      author={post.userName}
                      authorImage={post.userImage}
                      birthday={post.birthdayDate}
                      likes={post.wishes}
                      comments={post.comments}
                      currentUser={currentUser}
                      currentUserImage={currentUserImage}
                      updateLayout={updateLayout}
                    />
                  </div>
                );
              } else {
                return (
                  <div className="newsfeed__grid-item" key={post.id}>
                    <PostCard
                      id={post.id}
                      postType={post.type}
                      author={post.userName}
                      authorImage={post.userImage}
                      location={post.postLocation}
                      date={getElapsedDate(post.postDate)}
                      postPhoto={post.postImage}
                      postVideo={post.postVideo}
                      likes={post.likes}
                      comments={post.comments}
                      currentUser={currentUser}
                      currentUserImage={currentUserImage}
                      updateLayout={updateLayout}
                    />
                  </div>
                );
              }
            })}
        </div>
      )}
    </section>
  );
};

export default NewsFeed;
