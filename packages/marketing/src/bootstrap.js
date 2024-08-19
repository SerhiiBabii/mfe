import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (element, { onNavigate, initialPath, defaultHistory }) => {
  const history = defaultHistory ?? createMemoryHistory({
    initialEntries: [initialPath],
  });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(
    <App history={history} />,
    element
  )

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      if (history.location.pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  };
}

if (process.env.NODE_ENV === 'development') {
  const devRootElement = document.querySelector('#_marketing-dev-root');

  if (devRootElement) {
    mount(devRootElement, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
