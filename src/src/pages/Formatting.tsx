import { createSignal } from 'solid-js';

export const Formatting = () => {
    const [json, setJson] = createSignal<string>();

    const formattedJson = () => {
        if (!json()) return '';

        try {
            return JSON.stringify(JSON.parse(json().trim()), null, 4);
        } catch (error) {
            return error.message;
        }
    };

    return (
        <>
            <h1>JSON Formatting</h1>

            <p>Unformatted:</p>

            <textarea
                rows="4"
                class="border border-gray-300 rounded-md w-full p-2"
                oninput={({ target: { value } }) => setJson(value)}
            ></textarea>

            <p>Formatted:</p>

            <code
                class="border border-gray-300 rounded-md w-full bg-slate-50 font-mono p-4 w-full block h-72 overflow-auto whitespace-pre-wrap"
            >
                {formattedJson()}
            </code>
        </>
    );
};
