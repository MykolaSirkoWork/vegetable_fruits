/* eslint-disable import/no-extraneous-dependencies */
import gql from 'graphql-tag';

export const GET_USER = gql`
query login ($name: String!, $password: String!) {
  login (loginUserInput: {name: $name, password: $password}) {
    id,
    name,
    role,
    accessToken,
  }
}
`;

export const CREATE_USER = gql`
  mutation createUser($name: String!, $role: String!, $password: String!) {
    createUser(createUserInput: {name: $name, role: $role, password: $password}) {
      id,
      name,
      role,
      accessToken,
    }
  }
`;
