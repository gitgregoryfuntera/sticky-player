import CustomButton from 'components/custom-button/custom-button.component';
import { Links } from './interfaces';
import './webview-history.styles.scss';
import { v4 as uuidv4 } from 'uuid';

type WebViewHistoryProps = {
  links: Links[];
  handleOnGoTo: (link: string) => void;
};

const WebViewHistory = ({ links = [], handleOnGoTo }: WebViewHistoryProps) => {
  let content = <></>;
  const { length } = links;
  if (length) {
    content = (
      <>
        {links.map(({ link, visitedAt }) => (
          <li className="webview-visited-item" key={uuidv4()}>
            <div className="visited-item-button-container">
              <CustomButton label="GO" onClick={(e) => handleOnGoTo(link, e)} />
            </div>
            <div className="visited-item-text-container">
              <span>{link}</span>
              <br/>
              <span>{visitedAt}</span>
            </div>
          </li>
        ))}
      </>
    );
  }
  return (
    <div className="container">
       <h4 className="container-title">Visited Links</h4>
      <ul className="webview-list">{content}</ul>
    </div>
  );
};

export default WebViewHistory;
