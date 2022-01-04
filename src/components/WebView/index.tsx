import AddWebViewModal from 'modals/AddWebView';
import { useEffect, useState } from 'react';
import './index.styles.css';

const WebView = () => {
  const [webView, setWebView] = useState('https://www.youtube.com/');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIsModalOpen = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleModalConfirm = (webviewURL: string) => {
    setIsModalOpen((prevState) => !prevState);
    setWebView(webviewURL);
  };

  useEffect(() => {
    window.electron.ipcRenderer.on('ipc-add-webview', (message: string) => {
      handleIsModalOpen();
    });
  }, []);

  return (
    <>
      <AddWebViewModal
        isModalOpen={isModalOpen}
        handleIsModalOpen={handleIsModalOpen}
        handleModalConfirm={handleModalConfirm}
      />
      <webview src={webView}></webview>
    </>
  );
};

export default WebView;
