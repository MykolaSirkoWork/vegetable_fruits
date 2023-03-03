import { gql } from '@apollo/client';

export const GET_ALL_VEGETABLES = gql`
  query {
    vegetables {
      id,
      name,
      price
    }
  }
`;

export const GET_ONE_VETETABLES = gql`
  query vegetable ($id: String!) {
    vegetable (id: $id) {
      id, name, price
    }
  }
`;

export const CREATE_VEGETABLE = gql`
  mutation createVegetable ($price: Float!, $name: String!) {
    createVegetable (createVegetableInput: {price: $price, name: $name}) {
      id,
      name,
      price
    }
  }
`;

export const REMOVE_VEGETABLE = gql`
  mutation removeVegetable ($id: String!) {
    removeVegetable (id: $id)
  }
`;

export const UPDATE_VEGETABLE = gql`
  mutation updateVegetable ($price: Float!, $name: String!, $id: String!) {
    updateVegetable (id: $id, updateVegetableInput: {name: $name, price: $price}) {
      id, name, price
    }
  }
`;
