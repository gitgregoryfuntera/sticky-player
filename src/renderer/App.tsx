
import WebView from 'components/WebView';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';


export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={WebView} />
      </Switch>
    </Router>
  );
}
