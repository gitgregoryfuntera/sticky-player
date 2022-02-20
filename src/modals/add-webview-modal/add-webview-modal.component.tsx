import CustomAlert from 'components/custom-alert/custom-alert.component';
import CustomButton from 'components/custom-button/custom-button.component';
import WebViewHistory from 'components/webview-history/webview-history.component';
import { Links } from 'components/webview-history/interfaces';
import { onToggleCustomAlert } from 'reducers/custom-alert-reducer/custom-alert.reducer';
import { useEffect, useState } from 'react';
import ReactDom from 'react-dom/';
import { useAppDispatch, useAppSelector } from 'renderer/hooks';

import './add-webview-modal.styles.scss';

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
    (state) => state.customAlert.show
  );
  const messageCustomAlert = useAppSelector(
    (state) => state.customAlert.message
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
