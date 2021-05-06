const { Octokit } = require("octokit");
const { ApolloServer, gql } = require("apollo-server");

// Github api code:
const octokit = new Octokit();
const getFiles = async (base, head) => {
  const basehead = `HEAD${base && "~" + base || ''}...HEAD${head && "~" + head || ''}`; // I know that is awful 😬
  try {
    let res = await octokit.request(
      "GET /repos/{owner}/{repo}/compare/{basehead}",
      {
        owner: "facebook",
        repo: "react",
        basehead
      }
    );
    return res.data.files.map((file) => file.filename);
  } catch (e) {
      console.log(e);
      return [];
  }
};

// Appolo server code:
const typeDefs = gql`
  scalar File
  scalar Base
  scalar Head

  type Query {
    files(base: Base, head: Head): [File]
  }
`;
const resolvers = {
    Query: {
      files: async (parent, args) => {
        return await getFiles(args.base, args.head);
      },
    },
  };
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
