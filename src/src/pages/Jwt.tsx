import { createSignal } from 'solid-js';

export const Jwt = () => {
    const [token, setToken] = createSignal<string>();

    const decodedToken = () => {
        if (!token()) return '';

        const tokenParts = token().trim().replaceAll('"', '').split('.');

        if (tokenParts.length !== 3) return 'Invalid token';

        return JSON.stringify(JSON.parse(atob(tokenParts[0])), null, 4)
            + '.'
            + JSON.stringify(JSON.parse(atob(tokenParts[1])), null, 4)
            + '.[Signature]'
    };

    return (
        <>
            <h1>JWT Decoding</h1>

            <p>Encoded Token:</p>

            <textarea
                rows="4"
                class="border border-gray-300 rounded-md w-full p-2"
                oninput={({ target: { value } }) => setToken(value)}
            ></textarea>

            <p>JWT:</p>

            <code
                class="border border-gray-300 rounded-md w-full bg-slate-50 font-mono p-4 w-full block h-72 overflow-auto whitespace-pre-wrap"
            >
                {decodedToken()}
            </code>
        </>
    );
};
