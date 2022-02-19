import CustomAlert from 'components/CustomAlert';
import CustomButton from 'components/CustomButton';
import WebViewHistory from 'components/WebViewHistory';
import { Links } from 'components/WebViewHistory/interfaces';
import { onToggleCustomAlert } from 'features/custom-alert-slice/custom-alert.slice';
import { useEffect, useState } from 'react';
import ReactDom from 'react-dom/';
import { useAppDispatch, useAppSelector } from 'renderer/hooks';

import './index.styles.scss';

type AddWebViewModalProps = {
  showModal: boolean;
  handleIsModalOpen: () => void;
  handleModalConfirm: (webviewURL: string, e: any) => void;
  webViewURLHistory: Links[];
};

const AddWebViewModal = ({
  showModal: isModalOpen,
  handleIsModalOpen,
  handleModalConfirm,
  webViewURLHistory,
}: AddWebViewModalProps) => {
  const [webViewURL, setWebViewUrl] = useState('');
  const showCustomAlert = useAppSelector(
    (state) => state.customAlertSlice.show
  );
  const messageCustomAlert = useAppSelector(
    (state) => state.customAlertSlice.message
  );
  const dispatch = useAppDispatch();

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

  const handleClose = () => {
    console.log('clicked');
  };
  return ReactDom.createPortal(
    <>
      <div className="add-webview-modal-container">
        <div className="webview-modal">
          <div className="header-buttons">
            <CustomButton
              category="danger"
              label="X"
              onClick={handleIsModalOpen}
            />
          </div>
          <h1 className="modal-title">Enter URL</h1>
          <form onSubmit={(e) => handleModalConfirm(webViewURL, e)}>
            <div className="input-container">
              <input
                className="webview-url-input"
                name="webview-url"
                type="text"
                value={`${webViewURL}`}
                placeholder="https://"
                onChange={handleOnChange}
                onFocus={() =>
                  dispatch(onToggleCustomAlert({ show: false }))
                }
              />
              <CustomButton label="CONFIRM" category="submit" />
            </div>
            <CustomAlert
              message={messageCustomAlert}
              category="danger"
              show={showCustomAlert}
              handleClose={() =>
                dispatch(onToggleCustomAlert({ show: !showCustomAlert }))
              }
            />
          </form>

          <div className="webview-history-container">
            <WebViewHistory
              links={webViewURLHistory}
              handleOnGoTo={handleModalConfirm}
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default AddWebViewModal;
