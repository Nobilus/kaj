import React from "react";

interface IButton {
  title: string;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
}

function Button({ title, onClick }: IButton) {
  return (
    <button className="o-button-reset c-button" type="button" onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
