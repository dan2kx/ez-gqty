import { inspectWriteGenerate } from "@gqty/cli";
import { CreateApp, gql } from "@graphql-ez/nextjs";
import { ezCodegen } from "@graphql-ez/plugin-codegen";
import { ezGraphiQLIDE } from "@graphql-ez/plugin-graphiql";
import { ezSchema } from "@graphql-ez/plugin-schema";

const { buildApp } = CreateApp({
  ez: {
    plugins: [
      ezCodegen({
        outputSchema: true,
      }),
      ezGraphiQLIDE({
        defaultQuery: "query { hello getCurrentUser }",
      }),
      ezSchema({
        schema: {
          typeDefs: gql`
            type Address {
              addressOne: String!
            }

            type Customer {
              id: String!
              shippingAddress: [Address]!
            }

            type User {
              id: String!
              name: String!
              customers: [Customer]!
            }

            type Query {
              hello: String!
              getCurrentUser: User!
            }
          `,
          resolvers: {
            Query: {
              hello() {
                return "Hello World";
              },
              getCurrentUser() {
                return {
                  id: "1",
                  name: "Fred",
                  customers: [],
                };
              },
            },
          },
        },
      }),
    ],
  },
});

export default buildApp().apiHandler;

inspectWriteGenerate({
  endpoint: "http://localhost:3000/api/graphql",
}).catch(console.error);
