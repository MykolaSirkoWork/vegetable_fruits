/* eslint-disable no-console */
import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { REMOVE_FRUIT } from '../../api/fruits';
import { REMOVE_VEGETABLE } from '../../api/vegetables';
import { AppContext } from '../../context/AppContext';
import { SelectedList } from '../../types/SelectedList';
import { Loader } from '../Loader';
import './ItemsList.scss';

export const ItemsList = () => {
  const {
    visibleItems,
    selectedItems,
    setVegetables,
    setFruits,
    hasAccessToEdit,
    addingItem,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const [removeVegetable] = useMutation(REMOVE_VEGETABLE);
  const [removeFruit] = useMutation(REMOVE_FRUIT);

  const handleDeleteItem = async (id: string) => {
    setLoading(true);
    if (selectedItems === SelectedList.VEGETABLES) {
      try {
        const { data } = await removeVegetable({
          variables: {
            id,
          },
        });

        if (data) {
          setVegetables(prev => prev.filter(item => id !== item.id));
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const { data } = await removeFruit({
          variables: {
            id,
          },
        });

        if (data) {
          setFruits(prev => prev.filter(item => id !== item.id));
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <ul className="list">
        {visibleItems && visibleItems.length > 0 && visibleItems.map(item => (
          <li key={item.id} className="list__item">
            <Link
              to={`/item/${item.id}`}
              className="list__link"
            >
              {`${item.name} (${item.price})`}
            </Link>
            {hasAccessToEdit && (
              <button
                className="list__button"
                type="button"
                onClick={() => handleDeleteItem(item.id)}
              >
                &#10005;
              </button>
            )}
          </li>
        ))}
      </ul>
      {(loading || addingItem) && <Loader />}
    </>
  );
};
