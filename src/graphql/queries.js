/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNoting = /* GraphQL */ `
  query GetNoting($id: ID!) {
    getNoting(id: $id) {
      id
      name
      description
      user_id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listNotings = /* GraphQL */ `
  query ListNotings(
    $filter: ModelNotingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        user_id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
