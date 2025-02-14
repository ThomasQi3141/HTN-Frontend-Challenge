import React from "react";

const MenuButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      className="bg-primary hover:bg-accent text-white px-5 py-2 rounded-lg transition"
      onClick={onClick}>
      {children}
    </button>
  );
};

export default MenuButton;
