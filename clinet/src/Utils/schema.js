const keyReducers = {
  "{env}": (fakerjs) => {
    return fakerjs.random.arrayElement(["a", "b"]);
  },
  "{userID}": (fakerjs) => {
    return fakerjs.random.alphaNumeric(5);
  },
  "{postID}": (fakerjs) => {
    return fakerjs.random.alphaNumeric(5);
  },
};

const schema = {
  "{env}": {
    users: {
      "{userID}": {
        comment_count: "number",
        username: "string",
        is_verified: "boolean",
        created_at: "timestamp",
      },
    },
    posts: {
      "{postID}": {
        post_title: "string",
        post_data: (faker, key) => {
          return faker.random.words(5);
          return key.split("/").join("-") + ":post_data";
        },
        // Can be async function !
        vote_counts: async (faker, key) => {
          const result = await console.log("line 32 schema.js");
          return result;
        },
        author_id: "{userID}",
        created_at: "timestamp",
      },
    },
    comments: {
      "{postID}": {
        "{commentID}": {
          value: "👍",
          userID: "{userID}",
        },
      },
    },
  },
};

const count = 5;

module.exports = {
  schema,
  keyReducers,
  count,
};
