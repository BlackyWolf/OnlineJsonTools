export const Home = () => {
    return (
        <>
            <h1>Online JSON Tools</h1>

            <p>A set of online tools for working with JavaScript and JSON. Current utilities include:</p>

            <ul>
                <li>Decoding unencrypted JWTs</li>
                <li>Formatting JSON</li>
            </ul>

            <p>
                Unlike other online sites, these tools were designed to prevent sensitive
                information from being sent server-side or leaving the browser. In the event
                that you do notice network activity when using this site's tools, please
                create an issue at <a
                    href="https://github.com/BlackyWolf/OnlineJsonTools/issues/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link"
                >
                    https://github.com/BlackyWolf/OnlineJsonTools/issues/new
                </a> and
                label it as a <span class="text-red-500 font-semibold">bug</span>.
            </p>
        </>
    );
};
