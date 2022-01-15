import CustomButton from 'components/CustomButton';
import { Links } from './interfaces';
import './index.styles.scss';
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
        {links.map(({ link }) => (
          <li className="webview-visited-item" key={uuidv4()}>
            <div>
              <CustomButton label="Go" onClick={() => handleOnGoTo(link)} />
            </div>
            <div>
              <span>{link}</span>
            </div>
          </li>
        ))}
      </>
    );
  }
  return (
    <div className="container">
      <ul className="webview-list">{content}</ul>
    </div>
  );
};

export default WebViewHistory;
