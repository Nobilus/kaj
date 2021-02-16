import React from "react";

//@ts-ignore
function BlogPost({ match }) {
  const {
    params: { personId },
  } = match;
  console.log(match);
  return <div>You are on the blogpostpage</div>;
}

export default BlogPost;
