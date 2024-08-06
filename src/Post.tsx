import React from 'react';
import styled from 'styled-components';

interface PostProps {
  title: string;
  body: string;
  firstName: string;
  lastName: string;
}

const PostContainer = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
  width: 22%;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 8px;
`;

const Body = styled.p`
  font-size: 1em;
  margin-bottom: 8px;
`;

const Post: React.FC<PostProps> = ({ title, body, firstName, lastName }) => {
  return (
    <PostContainer>
      <Title>{title}</Title>
      <Body>{body}</Body>
      <p>
        Author: {firstName} {lastName}
      </p>
    </PostContainer>
  );
};

export default Post;
