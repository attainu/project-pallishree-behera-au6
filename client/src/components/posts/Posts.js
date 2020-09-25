  
import React, { Fragment, useEffect } from 'react';

import { connect } from 'react-redux';
import PostItems from './PostItems';
import PostForm from './PostForm';
import { getPosts } from '../../redux/actions/post';

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the Facebook
      </p>
   <PostForm /> 
      <div className="posts">
        {posts.map((post) => (
          <PostItems key={post._id} post={post} showActions={true} />
        ))}
      </div> 
    </Fragment>
  );
};



const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);