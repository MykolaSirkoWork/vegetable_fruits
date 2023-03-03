/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useMutation } from '@apollo/client';
import React, {
  ChangeEvent,
  useContext,
  useState,
  useEffect,
} from 'react';
import { CREATE_FRUIT } from '../../api/fruits';
import { CREATE_VEGETABLE } from '../../api/vegetables';
import { AppContext } from '../../context/AppContext';
import { SelectedList } from '../../types/SelectedList';
import './AddForm.scss';

export const AddForm: React.FC = () => {
  const {
    selectedItems,
    setSelectedItems,
    setFruits,
    setVegetables,
    setAddingItem,
  } = useContext(AppContext);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [visibleError, setVisibleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [createFruit, { data: resFruit, error: errorFruit }] = useMutation(CREATE_FRUIT);
  const [createVegetable, {
    data: resVegetable, error: errorVegetables,
  }] = useMutation(CREATE_VEGETABLE);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (price <= 0) {
      setVisibleError(true);
      setTimeout(() => {
        setVisibleError(false);
      }, 2000);
      setErrorMessage('Price must be greater than 0');

      return;
    }

    setAddingItem(true);

    if (selectedItems === SelectedList.FRUITS) {
      try {
        await createFruit({
          variables: {
            price,
            name,
          },
        });
      } catch (e) {
        console.log(e);
      } finally {
        setAddingItem(false);
      }
    } else {
      try {
        await createVegetable({
          variables: {
            price,
            name,
          },
        });
      } catch (e) {
        console.log(e);
      } finally {
        setAddingItem(false);
      }
    }

    setTimeout(() => {
      setVisibleError(false);
    }, 3000);
  };

  useEffect(() => {
    if (resFruit) {
      setName('');
      setPrice(0);
      setFruits(prev => [...prev, {
        id: resFruit.createFruit.id,
        name: resFruit.createFruit.name,
        price: resFruit.createFruit.price,
      }]);
    }

    if (errorFruit) {
      setVisibleError(true);
      setErrorMessage('Can\'t add item');
    }
  }, [resFruit, errorFruit]);

  useEffect(() => {
    if (resVegetable) {
      setName('');
      setPrice(0);
      setVegetables(prev => {
        return [...prev, {
          id: resVegetable.createVegetable.id,
          name: resVegetable.createVegetable.name,
          price: resVegetable.createVegetable.price,
        }];
      });
    }

    if (errorVegetables) {
      setVisibleError(true);
      setErrorMessage('Can\'t add item');
    }
  }, [resVegetable, errorVegetables]);

  const handlerChangeList = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === SelectedList.FRUITS || value === SelectedList.VEGETABLES) {
      setSelectedItems(value);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <select
          value={selectedItems}
          onChange={handlerChangeList}
          className="form__select"
        >
          <option>{SelectedList.FRUITS}</option>
          <option>{SelectedList.VEGETABLES}</option>
        </select>
        <div className="form__add">
          <input
            onChange={event => setName(event.target.value)}
            value={name}
            type="text"
            placeholder="Enter item to add"
            className="form__input"
          />
          <input
            onChange={event => setPrice(Number('' + Number(event.target.value)))}
            value={String(price)}
            type="number"
            placeholder="Enter items price"
            className="form__input"
          />
          <button className="form__add__button" type="submit">Add new</button>
        </div>
      </form>
      {visibleError && <p>{errorMessage}</p>}
    </>
  );
};
