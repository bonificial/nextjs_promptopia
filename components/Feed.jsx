"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import Link from "@node_modules/next/dist/client/link";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filtered_posts, setFiltered_posts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    let filteredPosts = filterPosts();
    setFiltered_posts(filteredPosts);
  }, [searchText]);
  const filterPosts = () => {
    if (!searchText) {
      return posts;
    }
    console.log("filtering posts", searchText, posts);
    return posts.filter((post) => {
      return (
        post.prompt.includes(searchText) ||
        post.tag.includes(searchText) ||
        post.creator.username.includes(searchText)
      );
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      console.log(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
        {searchText && (
          <Link
            href={"#"}
            onClick={(e) => {
              e.preventDefault();
              setSearchText("");
            }}
            className={"px-2 text-sm text-blue-400"}
          >
            Reset
          </Link>
        )}
      </form>
      <p className={"text-left self-start text-xs"}>
        {searchText && `Showing Results for ${searchText}`}
      </p>
      <PromptCardList
        data={searchText ? filtered_posts : posts}
        handleTagClick={(tag) => {
          setSearchText(tag);
        }}
      />
    </section>
  );
};

export default Feed;
