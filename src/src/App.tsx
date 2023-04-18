import { A, Outlet } from '@solidjs/router';
import type { Component } from 'solid-js';
import { NavBar } from './components/navBar';

export const App: Component = () => {
    return (
        <>
            <NavBar />

            <main class="container mx-auto py-8 flex-grow px-8">
                <Outlet />
            </main>

            <footer class="border-t border-gray-300 py-4 px-8 mt-auto">
                <div class="container mx-auto flex items-center">
                    <p class="m-0">Copyright &copy; BlackyWolf. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};
