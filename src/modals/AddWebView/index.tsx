import CustomButton from 'components/CustomButton';
import { useEffect, useState } from 'react';
import ReactDom from 'react-dom/';
import './index.styles.scss';

type AddWebViewModalProps = {
  isModalOpen: boolean;
  handleIsModalOpen: () => void;
  handleModalConfirm: (webviewURL: string) => void;
};

const AddWebViewModal = ({
  isModalOpen,
  handleIsModalOpen,
  handleModalConfirm,
}: AddWebViewModalProps) => {
  const [webViewURL, setWebViewUrl] = useState('');

  const handleOnChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setWebViewUrl((prevState: string) => (prevState = value));
  };

  useEffect(() => {
    if (isModalOpen) {
      setWebViewUrl('');
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return ReactDom.createPortal(
    <>
      <div className="add-webview-modal-container">
        <div className="webview-modal">
          <h1 className="modal-title">Enter URL</h1>
          <div className="input-container">
            <input
              className="webview-url-input"
              name="webview-url"
              type="text"
              value={`${webViewURL}`}
              placeholder="https://"
              onChange={handleOnChange}
            />
          </div>
          <div className="buttons">
            <CustomButton
              type="danger"
              label="Close"
              onClick={handleIsModalOpen}
            />
            <CustomButton
              label="Confirm"
              onClick={() => handleModalConfirm(webViewURL)}
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default AddWebViewModal;
