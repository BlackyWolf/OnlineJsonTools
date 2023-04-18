/* @refresh reload */
import { Route, Router, Routes } from '@solidjs/router';
import { render } from 'solid-js/web';
import { App } from './App';
import './index.css';
import { Jwt } from './pages/Jwt';
import { Home } from './pages/Home';
import { Formatting } from './pages/Formatting';


const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
    );
}

render(
    () => (
        <Router>
            <Routes>
                <Route path="/" component={App}>
                    <Route path="/" component={Home} />
                    <Route path="/jwt" component={Jwt} />
                    <Route path="/formatting" component={Formatting} />
                </Route>
            </Routes>
        </Router>
    ),
    root!
);
