import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from './Post.tsx';

interface PostData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface UserData {
  firstName: string;
  lastName: string;
}

const PostListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [users, setUsers] = useState<{ [key: number]: UserData }>({});

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://dummyjson.com/posts');
      const data = await response.json();
      setPosts(data.posts.slice(0, 10));
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchUserNames = async (userId: number) => {
      const response = await fetch(`https://dummyjson.com/users/${userId}`);
      const data = await response.json();
      console.log(`Fetched user: ${data.firstName} ${data.lastName}`);
      setUsers((prevUsers) => ({
        ...prevUsers,
        [userId]: { firstName: data.firstName, lastName: data.lastName },
      }));
    };

    posts.forEach((post) => {
      if (!users[post.userId]) {
        fetchUserNames(post.userId);
      }
    });
  }, [posts, users]);

  return (
    <PostListContainer>
      {posts.map((post) => {
        const user = users[post.userId];
        return user ? (
          <Post
            key={post.id}
            title={post.title}
            body={post.body}
            firstName={user.firstName}
            lastName={user.lastName}
          />
        ) : null;
      })}
    </PostListContainer>
  );
};

export default PostList;
