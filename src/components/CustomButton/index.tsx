import React from 'react';
import './index.styles.scss';

type CustomButtonBaseProps = {
  label: string;
  type?: string;
};

type CustomButtonOtherProps = React.HTMLAttributes<HTMLButtonElement>;

type CustomButtonProps = CustomButtonBaseProps & CustomButtonOtherProps;

const CustomButton = ({ label, type, ...rest }: CustomButtonProps) => {
  return (
    <div className="button-container">
      <button className={`button ${type}`} {...rest}>
        {label}
      </button>
    </div>
  );
};

export default CustomButton;
