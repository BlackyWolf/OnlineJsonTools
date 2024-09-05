import { createSignal } from 'solid-js';

export const Formatting = () => {
    const [json, setJson] = createSignal<string>();

    const formattedJson = () => {
        const jsonValue = json();

        if (!jsonValue) return '';

        try {
            return JSON.stringify(JSON.parse(jsonValue.trim()), null, 4);
        } catch (error: any) {
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
