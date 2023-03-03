/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import { useMutation } from '@apollo/client';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { REMOVE_FRUIT, UPDATE_FRUIT } from '../../api/fruits';
import { REMOVE_VEGETABLE, UPDATE_VEGETABLE } from '../../api/vegetables';
import { Loader } from '../../components/Loader';
import { AppContext } from '../../context/AppContext';
import { SelectedList } from '../../types/SelectedList';
import './ItemPage.scss';

export const ItemPage = () => {
  const {
    visibleItems,
    hasAccessToEdit,
    setFruits,
    setVegetables,
    selectedItems,
  } = useContext(AppContext);
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const selectedItem = visibleItems.find(item => String(item.id) === id);
  const [itemName, setItemName] = useState((selectedItem && selectedItem?.name) || '');
  const [price, setPrice] = useState((selectedItem && selectedItem?.price) || 0);
  const [hasRemoved, setHasRemoved] = useState(false);
  const [loading, setLoading] = useState(false);
  const newItemField = useRef<HTMLInputElement>(null);

  const [updateFruit] = useMutation(UPDATE_FRUIT);
  const [updateVegetable] = useMutation(UPDATE_VEGETABLE);
  const [removeVegetable] = useMutation(REMOVE_VEGETABLE);
  const [removeFruit] = useMutation(REMOVE_FRUIT);

  const handleSubmit = async (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (selectedItems === SelectedList.FRUITS) {
      try {
        const { data } = await updateFruit({
          variables: {
            id,
            price,
            name: itemName,
          },
        });

        if (data) {
          setFruits(prev => [...prev.filter(item => id !== item.id), data.updateFruit]);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const { data } = await updateVegetable({
          variables: {
            id,
            price,
            name: itemName,
          },
        });

        if (data) {
          setVegetables(prev => [...prev.filter(item => id !== item.id), data.updateVegetable]);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    setIsEditing(false);
  };

  const handleCloseEditing = () => {
    if (selectedItem) {
      setItemName(selectedItem?.name);
      setPrice(selectedItem?.price);
    }

    setIsEditing(false);
  };

  const closeEditOnEscapeKeyDown = (event: KeyboardEvent) => {
    if ((event.charCode || event.keyCode) === 27) {
      console.log();
      setIsEditing(false);
      if (selectedItem) {
        setItemName(selectedItem?.name);
        setPrice(selectedItem?.price);
      }
    }
  };

  const handleDeleteItem = async () => {
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
          setHasRemoved(true);
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
          setHasRemoved(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    setIsEditing(false);
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeEditOnEscapeKeyDown);

    return function cleanup() {
      document.body.removeEventListener('keydown', closeEditOnEscapeKeyDown);
    };
  }, []);

  useEffect(() => {
    if (newItemField.current) {
      newItemField.current.focus();
    }
  }, [isEditing]);

  if (loading) {
    return (
      <div>
        <Link to="/" className="item__go-back">&#8592; Go back</Link>
        <Loader />
      </div>
    );
  }

  if (!selectedItem && !hasRemoved) {
    return (
      <div>
        <Link to="/" className="item__go-back">&#8592; Go back</Link>
        <p className="item__main item__deleted">Item not found</p>
      </div>
    );
  }

  if (!selectedItem && hasRemoved) {
    return (
      <div>
        <Link to="/" className="item__go-back">&#8592; Go back</Link>
        <p className="item__main item__deleted">{`Item with id ${id} has been removed`}</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="item__go-back">&#8592; Go back</Link>
      <main className="item__main">
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="item__edit"
          >
            <input
              type="text"
              value={itemName}
              className="item__edit-value"
              onChange={(event) => setItemName(event.target.value)}
              ref={newItemField}
            />
            <input
              onChange={event => setPrice(Number('' + Number(event.target.value)))}
              value={String(price)}
              type="number"
              className="item__edit-value"
            />
            <button
              className="item__save"
              type="submit"
            >
              Save changes
            </button>
          </form>
        ) : (
          <h1 className="item__name">
            {`${selectedItem?.name}, price: ${Number(selectedItem?.price)}`}
          </h1>
        )}
        {hasAccessToEdit ? (
          <div className="item__form">
            <button
              className="item__action"
              type="button"
              onClick={handleDeleteItem}
            >
              Delete item
            </button>
            {!isEditing && (
              <button
                className="item__action"
                onClick={() => setIsEditing(true)}
                type="button"
              >
                Edit item
              </button>
            )}
            {isEditing && (
              <button
                type="button"
                className="item__action"
                onClick={handleCloseEditing}
              >
                Close edit
              </button>
            )}
          </div>
        ) : (
          <p className="item__not-access">You haven&apos;t access to edit item</p>
        )}
      </main>
    </div>
  );
};
