const express = require("express");
const app = express();

app.use(express.json());

const db = {
  posts: [
    {
      id: 1,
      title: "Post 1",
      body: "something here..."
    },
    {
      id: 2,
      title: "Post 2",
      body: "something.."
    }
  ]
};
const cm = {
  comments: [
    {
      id: 1,
      post: 2,
      body: "The body of the comment"
    },
    {
      id: 2,
      post: 2,
      body: "The body of the "
    }
  ]
};

const err = {
  errors: {
    post: "post is required"
  }
};

app.get("/api/comments", (request, response) => {
  response.json(cm.comments);
});

app.get("/api/:id/comments", (request, response) => {
  const id = Number(request.params.id);
  const comment = cm.comments.filter(comment => {
    return comment.post === id;
  });

  if (comment) {
    response.json(comment);
  } else {
    response.status(404).send();
  }
});

app.post("/api/comments", (request, response) => {
  const comment = {
    id: cm.comments.length + 1,
    post: request.body.post,
    body: request.body.body
  };
  if (!comment.post) {
    return response.status(400).json(err.errors);
  }
  let post = db.posts.filter(post => post.id == comment.post);
  if (post.length < 1) {
    return response.status(404).send();
  }

  cm.comments.push(comment);
  response.json(comment);
});

app.delete("/api/comments/:id", (request, response) => {
  const id = Number(request.params.id);
  const comment = cm.comments.find(comment => {
    return comment.id === id;
  });

  if (comment) {
    cm.comments = cm.comments.filter(comment => {
      return comment.id !== id;
    });
    response.status(204).send();
  } else {
    response.status(404).send();
  }
});

app.put("/api/comments/:id", (request, response) => {
  const id = Number(request.params.id);
  const comment = cm.comments.find(comment => {
    return comment.id === id;
  });

  if (comment) {
    Object.assign(comment, request.body);
    response.json(comment);
  } else {
    response.status(404).send();
  }
});

app.get("/api/posts", (request, response) => {
  response.json(db.posts);
});

app.post("/api/posts", (request, response) => {
  const post = request.body;
  post.id = db.posts.length + 1;
  db.posts.push(post);
  response.json(post);
});

app.get("/api/posts/:id", (request, response) => {
  const id = Number(request.params.id);
  const post = db.posts.find(post => {
    return post.id === id;
  });

  if (post) {
    response.json(post);
  } else {
    response.status(404).send();
  }
});

app.delete("/api/posts/:id", (request, response) => {
  const id = Number(request.params.id);
  const post = db.posts.find(post => {
    return post.id === id;
  });

  if (post) {
    db.posts = db.posts.filter(post => {
      return post.id !== id;
    });
    response.status(204).send();
  } else {
    response.status(404).send();
  }
});

app.put("/api/posts/:id", (request, response) => {
  const id = Number(request.params.id);
  const post = db.posts.find(post => {
    return post.id === id;
  });

  if (post) {
    Object.assign(post, request.body);
    response.json(post);
  } else {
    response.status(404).send();
  }
});

app.listen(process.env.PORT || 9000);
