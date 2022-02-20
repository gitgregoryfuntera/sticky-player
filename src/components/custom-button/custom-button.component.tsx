import React from 'react';
import './custom-button.styles.scss';

type CustomButtonBaseProps = {
  label: string;
  category?: string;
};

type CustomButtonOtherProps = React.HTMLAttributes<HTMLButtonElement>;

type CustomButtonProps = CustomButtonBaseProps & CustomButtonOtherProps;

const CustomButton = ({ label, category, ...rest }: CustomButtonProps) => {
  return (
    <div className="button-container">
      <button className={`button ${category}`} {...rest}>
        {label}
      </button>
    </div>
  );
};

export default CustomButton;
