import './index.styles.scss';

type CustomAlertProps = {
  message: string;
  category?: string;
  show: boolean;
  handleClose?: () => void;
};

const CustomAlert = ({ ...rest }: CustomAlertProps) => {
  const { message, category, show, handleClose } = rest;

  return (
    <div className="container">
      {show && (
        <div className={`alert ${category}`}>
          <span>{message}</span>
          <span className="close-btn" onClick={handleClose}>
            X
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomAlert;
