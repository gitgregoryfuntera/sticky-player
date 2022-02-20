import { onToggleCustomAlert } from 'reducers/custom-alert-reducer/custom-alert.reducer';
import AddWebViewModal from 'modals/add-webview-modal/add-webview-modal.component';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './webview.styles.scss';
import { ErrorMessages } from 'enums';

const WebView = () => {
  const [webView, setWebView] = useState('https://www.youtube.com/');
  const dispatch = useDispatch();
  const [webViewURLHistory, setWebViewURLHistory] = useState([
    {
      link: 'https://www.youtube.com',
      visitedAt: `${new Date().toLocaleDateString()} @ ${new Date().toLocaleTimeString()}`,
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleIsModalOpen = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleModalConfirm = (webviewURL: string, e: any) => {
    e.preventDefault();
    try {
      const url = new URL(webviewURL);
      setWebView(url.origin);
      setWebViewURLHistory((prevState) => [
        {
          link: url.origin,
          visitedAt: `${new Date().toLocaleDateString()} @ ${new Date().toLocaleTimeString()}`,
        },
        ...prevState,
      ]);
      setShowModal(false);
    } catch (e: any) {
      console.log(e.message, 'invalid url');
      let message = e.message;
      if (e.message === `Failed to construct 'URL': Invalid URL`) {
        message = `${ErrorMessages.ERROR_MESSAGE_CODE_1_KEY}: ${ErrorMessages.ERROR_MESSAGE_CODE_1}`;
      }
      dispatch(
        onToggleCustomAlert({
          message,
          show: true,
        })
      );
    }
  };

  useEffect(() => {
    window.electron.ipcRenderer.on('ipc-add-webview', (message: string) => {
      handleIsModalOpen();
    });
  }, []);

  return (
    <>
      <AddWebViewModal
        showModal={showModal}
        handleIsModalOpen={handleIsModalOpen}
        handleModalConfirm={handleModalConfirm}
        webViewURLHistory={webViewURLHistory}
      />
      <webview src={webView}></webview>
    </>
  );
};

export default WebView;
