import React, { useState, createContext } from "react";

export const AdminContext = createContext();

export const AdminProvider = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AdminContext.Provider
      value={{
        admin: { isAdmin, setIsAdmin },
        modal: { modalOpen, setModalOpen },
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};
