/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNoting = /* GraphQL */ `
  mutation CreateNoting(
    $input: CreateNotingInput!
    $condition: ModelNotingConditionInput
  ) {
    createNoting(input: $input, condition: $condition) {
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
export const updateNoting = /* GraphQL */ `
  mutation UpdateNoting(
    $input: UpdateNotingInput!
    $condition: ModelNotingConditionInput
  ) {
    updateNoting(input: $input, condition: $condition) {
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
export const deleteNoting = /* GraphQL */ `
  mutation DeleteNoting(
    $input: DeleteNotingInput!
    $condition: ModelNotingConditionInput
  ) {
    deleteNoting(input: $input, condition: $condition) {
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
