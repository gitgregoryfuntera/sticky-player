import { onToggleCustomAlert } from 'features/custom-alert-slice/custom-alert.slice';
import AddWebViewModal from 'modals/AddWebView';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './index.styles.scss';

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
      dispatch(
        onToggleCustomAlert({
          message: 'Invalid URL',
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
