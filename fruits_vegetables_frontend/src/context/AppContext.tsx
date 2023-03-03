import React, { useState, useEffect } from 'react';
import { SelectedList } from '../types/SelectedList';
import { Role } from '../types/Role';
import { User } from '../types/User';
import { Item } from '../types/Item';

type Props = {
  children: React.ReactNode;
};

interface AppContextInterface {
  selectedItems: SelectedList,
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedList>>,
  role: Role | string,
  setRole: React.Dispatch<React.SetStateAction<Role | string>>,
  visibleItems: Item[],
  hasAccessToEdit: boolean,
  accessToken: string | null,
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>,
  userInfo: User | null,
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>,
  setFruits: React.Dispatch<React.SetStateAction<Item[]>>,
  setVegetables: React.Dispatch<React.SetStateAction<Item[]>>,
  vegetables: Item[],
  addingItem: boolean,
  setAddingItem: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = React.createContext<AppContextInterface>({
  selectedItems: SelectedList.FRUITS,
  setSelectedItems: () => {},
  role: '',
  setRole: () => {},
  visibleItems: [],
  hasAccessToEdit: true,
  accessToken: null,
  setAccessToken: () => {},
  userInfo: null,
  setUserInfo: () => {},
  setFruits: () => {},
  setVegetables: () => {},
  vegetables: [],
  addingItem: false,
  setAddingItem: () => {},
});

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<SelectedList>(SelectedList.FRUITS);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [role, setRole] = useState<Role | string>(userInfo?.role || '');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const hasAccessToEdit = Boolean(role) && (role === Role.ADMIN
    || (role !== Role.VegetarianMary && selectedItems === SelectedList.FRUITS)
    || (role !== Role.FruitJohn && selectedItems === SelectedList.VEGETABLES));
  const [fruits, setFruits] = useState<Item[]>([]);
  const [vegetables, setVegetables] = useState<Item[]>([]);
  const [addingItem, setAddingItem] = useState(false);

  const getVisibleItems = () => {
    switch (selectedItems) {
      case SelectedList.FRUITS:
        return fruits;

      case SelectedList.VEGETABLES:
        return vegetables;

      default:
        return fruits;
    }
  };

  const visibleItems = getVisibleItems();

  const contextValue = {
    selectedItems,
    setSelectedItems,
    visibleItems,
    role,
    setRole,
    hasAccessToEdit,
    accessToken,
    setAccessToken,
    userInfo,
    setUserInfo,
    setFruits,
    setVegetables,
    vegetables,
    addingItem,
    setAddingItem,
  };

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken') || null);
    if (localStorage.getItem('role')) {
      setRole(JSON.parse(localStorage.getItem('role') || ''));
    }
  }, []);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
