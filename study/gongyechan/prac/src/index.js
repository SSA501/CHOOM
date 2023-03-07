import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Router, Route } from 'react-router';
import './assets/css/index.css';
import App from './App';
import VideoView from './pages/VideoView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App>
    <VideoView />
  </App>
  // <Router>
  //   <Route exact path="/" component={App} />
  //   <Route exact path="/video" component={VideoView} />
  // </Router>
);
