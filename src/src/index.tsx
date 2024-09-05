/* @refresh reload */
import { Route, Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import { App } from './App';
import './index.css';
import { Formatting, Home, Jwt, KeyGen } from './pages';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
    );
}

render(
    () => (
        <Router>
            <Route path="/" component={App}>
                <Route path="/" component={Home} />
                <Route path="/jwt" component={Jwt} />
                <Route path="/formatting" component={Formatting} />
                <Route path="/keygen" component={KeyGen} />
            </Route>
        </Router>
    ),
    root!
);
