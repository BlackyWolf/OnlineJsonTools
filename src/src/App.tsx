import { A, Outlet } from '@solidjs/router';
import type { Component } from 'solid-js';

export const App: Component = () => {
    return (
        <>
            <nav class="bg-white p-4 border-b border-gray-300">
                <div class="container mx-auto items-center flex items-center">
                    <A href="/" class="text-2xl font-semibold mr-2">
                        Online JSON Tools
                    </A>
                    <A href="/" class="ml-4 px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white duration-150 transition">
                        Home
                    </A>
                    <A href="/jwt" class="ml-4 px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white duration-150 transition">
                        JWT Decoding
                    </A>
                    <A href="/formatting" class="ml-4 px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white duration-150 transition">
                        JSON Formatting
                    </A>
                </div>
            </nav>

            <main class="container mx-auto py-8 flex-grow">
                <Outlet />
            </main>

            <footer class="border-t border-gray-300 py-4 mt-auto">
                <div class="container mx-auto flex items-center">
                    <p class="m-0">Copyright &copy; BlackyWolf. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};
