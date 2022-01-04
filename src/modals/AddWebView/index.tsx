import { useState } from 'react';
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

  if (!isModalOpen) return null;

  return ReactDom.createPortal(
    <>
      <div className="add-webview-modal-container">
        <div className="webview-modal">
          <h1>Enter URL</h1>
          <input
            name="webview-url"
            type="text"
            value={`${webViewURL}`}
            placeholder="https://"
            onChange={handleOnChange}
          />
          <button onClick={handleIsModalOpen}>Close</button>
          <button onClick={() => handleModalConfirm(webViewURL)}>Confirm</button>
        </div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default AddWebViewModal;
