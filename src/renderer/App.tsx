import WebView from 'components/webview/webview.component';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={WebView} />
      </Switch>
    </Router>
  );
}
