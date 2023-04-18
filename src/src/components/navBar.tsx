import { A } from '@solidjs/router';
import { createSignal } from 'solid-js';

export const NavBar = () => {
    const [showMenu, setShowMenu] = createSignal(false);

    return (
        <>
            <nav class="bg-white py-4 px-8 border-b border-gray-300 hidden md:block">
                <div class="container mx-auto items-center flex">
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

            <nav class="bg-white py-4 px-8 border-b border-gray-300 md:hidden">
                <div class="flex items-center">
                    <A href="/" class="text-2xl font-semibold mr-2">
                        Online JSON Tools
                    </A>

                    <button onclick={() => setShowMenu(!showMenu())} class="ml-auto block text-sm font-semibold">
                        Menu
                    </button>
                </div>

                <div class={`container mx-auto flex flex-col overflow-hidden ${showMenu() ? 'mt-4' : 'h-0'}`}>
                    <A href="/" class="px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white duration-150 transition">
                        Home
                    </A>
                    <A href="/jwt" class="px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white duration-150 transition">
                        JWT Decoding
                    </A>
                    <A href="/formatting" class="px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white duration-150 transition">
                        JSON Formatting
                    </A>
                </div>
            </nav>
        </>
    );
};
