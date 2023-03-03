import { gql } from '@apollo/client';

export const GET_ALL_FRUITS = gql`
  query {
    fruits {
      id,
      name,
      price
    }
  }
`;

export const GET_ONE_FRUIT = gql`
  query fruit ($id: String!) {
    fruit (id: $id) {
      id, name, price
    }
  }
`;

export const CREATE_FRUIT = gql`
  mutation createFruit ($price: Float!, $name: String!) {
    createFruit (createFruitInput: {price: $price, name: $name}) {
      id,
      name,
      price
    }
  }
`;

export const REMOVE_FRUIT = gql`
  mutation removeFruit ($id: String!) {
    removeFruit (id: $id)
  }
`;

export const UPDATE_FRUIT = gql`
  mutation updateFruit ($price: Float!, $name: String!, $id: String!) {
    updateFruit (id: $id, updateFruitInput: {name: $name, price: $price}) {
      id, name, price
    }
  }
`;
