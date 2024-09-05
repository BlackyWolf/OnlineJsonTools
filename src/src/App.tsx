import { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { NavBar } from './components';

export const App: Component<RouteSectionProps> = (properties: RouteSectionProps) => {
    return (
        <>
            <NavBar />

            <main class="container mx-auto py-8 flex-grow px-8">
                {properties.children}
            </main>

            <footer class="border-t border-gray-300 py-4 px-8 mt-auto">
                <div class="container mx-auto flex items-center">
                    <p class="m-0">Copyright &copy; BlackyWolf. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};
