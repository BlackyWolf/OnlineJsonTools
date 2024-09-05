import { createMemo, createSignal, type Component } from 'solid-js';
import { joinCss } from '../utilities';

class Custom {}

interface Property {
    displayName: string;
    name: string;
    values: (string | number | Custom)[];
}

interface KeyGenOptions {
    types: Record<string, {
        displayName: string;
        properties?: Property[];
    }>;
    usages: KeyUsage[];
}

const keyGenOptions: KeyGenOptions = {
    types: {
        aes: {
            displayName: "AES",
            properties: [
                { name: 'algorithms', displayName: 'Algorithms', values: ["AES-CBC", "AES-CTR", "AES-GCM", "AES-KW"]  },
                { name: 'length', displayName: 'Length', values: [128, 192, 256] },
            ]
        },
        ecKey: {
            displayName: "Elliptic Curve",
            properties: [
                { name: 'algorithms', displayName: 'Algorithms', values: ["ECDSA", "ECDH"] },
                { name: 'namedCurve', displayName: 'Named Curve', values: ["P-256", "P-384", "P-521"] },
            ]
        },
        ed25519: {
            displayName: "Ed25519",
        },
        hmac: {
            displayName: "HMAC",
            properties: [
                { name: 'algorithms', displayName: 'Algorithms', values: ["HMAC"] },
                { name: 'hash', displayName: 'Hash', values: ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] },
            ]
        },
        rsaHashed: {
            displayName: "RSA",
            properties: [
                { name: 'algorithms', displayName: 'Algorithms', values: ["RSASSA-PKCS1-v1_5", "RSA-PSS", "RSA-OAEP"] },
                { name: 'hash', displayName: 'Hash', values: ["SHA-256", "SHA-384", "SHA-512"] },
                { name: 'modulusLength', displayName: 'Modulus Length', values: [2048, 4096, new Custom()] },
            ],
        },
        x25519: {
            displayName: "X25519",
        },
    },
    usages: ["encrypt", "decrypt", "sign", "verify", "deriveKey", "deriveBits", "wrapKey", "unwrapKey"],
};

const getKeyTypeNames = () => Object.keys(keyGenOptions.types);

interface KeyOptions {
    algorithm: string;
    hash?: string;
    length?: number;
    modulusLength?: number;
    namedCurve?: string;
}

function getKeyType(name: string, {
    algorithm,
    namedCurve,
    length,
    hash,
    modulusLength
 }: KeyOptions): AesKeyGenParams | EcKeyGenParams | HmacKeyGenParams | RsaHashedKeyGenParams | { name: string } | string {
    switch (name) {
        case "aes": return { name: algorithm, length };

        case "ecKey": return { name: algorithm, namedCurve };

        case "ed25519": return algorithm;

        case "hmac": return { name: algorithm, hash, };

        case "rsaHashed":
            return {
                name: algorithm,
                modulusLength,
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                hash,
            };

        case "x25519": return algorithm;

        default: throw new Error("Invalid key type");
    }
}

function getDefaultAlgorithm(name: string): string {
    switch (name) {
        case "aes": return "AES-CBC";
        case "ecKey": return "ECDSA";
        case "ed25519": return "Ed25519";
        case "hmac": return "HMAC";
        case "rsaHashed": return "RSASSA-PKCS1-v1_5";
        case "x25519": return "X25519";

        default: throw new Error("Invalid key type");
    }
}

function getDefaultHash(name: string): string | undefined {
    switch (name) {
        case "hmac":
        case "rsaHashed": return "SHA-256";

        default: return undefined;
    }
}

export const KeyGen: Component = () => {
    const [error, setError] = createSignal<string>();

    const [cryptoKey, setCryptoKey] = createSignal<string>();
    const [publicKey, setPublicKey] = createSignal<string>();
    const [privateKey, setPrivateKey] = createSignal<string>();

    const [keyType, setKeyType] = createSignal("hmac");
    const [keyUsages, setKeyUsages] = createSignal<KeyUsage[]>([]);
    const [exportFormat, setExportFormat] = createSignal<KeyFormat>("jwk");

    const [algorithm, setAlgorithm] = createSignal<string>();
    const [hash, setHash] = createSignal<string>();
    const [length, setLength] = createSignal<number>();
    const [modulusLength, setModulusLength] = createSignal<number>();
    const [namedCurve, setNamedCurve] = createSignal<string>();

    const currentKeyType = createMemo(() => {
        return keyGenOptions.types[keyType()];
    });

    async function generateKey() {
        try {
            setError(undefined);
            setCryptoKey(undefined);
            setPublicKey(undefined);
            setPrivateKey(undefined);

            const algorithmParameters = getKeyType(
                keyType(),
                {
                    algorithm: algorithm() || getDefaultAlgorithm(keyType()),
                    hash: hash() || getDefaultHash(keyType()),
                    length: length() || 256,
                    modulusLength: modulusLength() || 2048,
                    namedCurve: namedCurve() || "P-256",
                }
            );

            console.log(algorithmParameters);

            const key = await crypto.subtle.generateKey(
                algorithmParameters,
                true,
                keyUsages(),
            );

            const keyPair = (key as CryptoKeyPair);

            if (keyPair.publicKey) {
                const publicKey = await crypto.subtle.exportKey(exportFormat(), keyPair.publicKey);
                const privateKey = await crypto.subtle.exportKey(exportFormat(), keyPair.privateKey);

                if (exportFormat() === "jwk") {
                    setPublicKey(JSON.stringify(publicKey, null, 2));
                    setPrivateKey(JSON.stringify(privateKey, null, 2));
                } else {

                }
            } else {
                const cryptoKey = await crypto.subtle.exportKey(exportFormat(), key as CryptoKey);

                if (exportFormat() === "jwk") {
                    setCryptoKey(JSON.stringify(cryptoKey, null, 2));
                } else {
                    setCryptoKey(btoa(String.fromCharCode(...new Uint8Array(cryptoKey as ArrayBuffer))));
                }
            }
        } catch (error: any) {
            console.error(error);

            setError(error.message);
        }
    }

    function assignFormValue(event: Event) {
        const target = event.target as HTMLInputElement | HTMLSelectElement;
        const name = target.name;
        const value = target.value;

        switch (name) {
            case "algorithms":
                setAlgorithm(value);
                break;

            case "hash":
                setHash(value);
                break;

            case "length":
                setLength(parseInt(value));
                break;

            case "modulusLength":
                setModulusLength(parseInt(value));
                break;

            case "namedCurve":
                setNamedCurve(value);
                break;

            default:
                break;
        }
    }

    function resetParameters() {
        setAlgorithm(undefined);
        setHash(undefined);
        setLength(undefined);
        setModulusLength(undefined);
        setNamedCurve(undefined);
    }

    return (
        <>
            <h1>Crypto Key Generation</h1>

            <p>All keys are exported by default.</p>
            <p>
                Only the JWT export format is untouched aside from formatting.
                The other values are base-64 encoded ArrayBuffer using the following line of code:<br />
                <code>btoa(String.fromCharCode(...new Uint8Array(cryptoKey as ArrayBuffer)))</code>. So, I'm
                not 100% sure it's preserving the key data.
            </p>

            {error() && (
                <div class="bg-red-100 text-red-700 px-4 py-2 border border-red-300 rounded my-6">
                    <span class="font-mono uppercase font-black">Error:</span> {error()}
                </div>
            )}

            <div class="flex gap-4 mb-6">
                {keyGenOptions.usages.map((usage) => (
                    <div class="flex gap-1 items-center">
                        <input
                            type="checkbox"
                            class="h-5 w-5"
                            id={usage}
                            name={usage}
                            onChange={(event) => {
                                const target = event.target as HTMLInputElement;
                                const value = target.value as KeyUsage;

                                if (target.checked) {
                                    setKeyUsages([...keyUsages(), value]);
                                } else {
                                    setKeyUsages(keyUsages().filter((usage) => usage !== value));
                                }
                            }}
                            value={usage}
                        />
                        <label for={usage} class="font-mono uppercase font-medium">{usage}</label>
                    </div>
                ))}
            </div>

            <div class="flex gap-6">
                <ul class="ul-none flex">
                    {getKeyTypeNames().map((name) => (
                        <li
                            class={joinCss(
                                "cursor-pointer px-4 py-2 border-t border-b border-r first:border-l border-stone-400 first:rounded-l last:rounded-r",
                                name === keyType() ? "font-bold bg-sky-500 text-white" : undefined
                            )}
                            onClick={() => {
                                setKeyType(name);

                                resetParameters();
                            }}
                        >
                            {keyGenOptions.types[name as keyof KeyGenOptions].displayName}
                        </li>
                    ))}
                </ul>

                <select
                    class="border border-stone-400 rounded p-2"
                    name="exportFormat"
                    oninput={(event) => setExportFormat((event.target as HTMLSelectElement).value as KeyFormat)}
                >
                    <option value="jwk">JWK</option>
                    <option value="pkcs8">PKCS #8</option>
                    <option value="spki">Subject Public Key Info</option>
                    <option value="raw">Raw</option>
                </select>

                <button
                    class={joinCss(
                        'px-4 py-2 border border-emerald-600 bg-emerald-500 hover:bg-emerald-600',
                        'transition duration-150 text-white font-semibold uppercase rounded font-mono'
                    )}
                    onclick={generateKey}
                >
                    Generate
                </button>
            </div>

            {currentKeyType().properties && (
                <form class="flex flex-col gap-4 mt-6">
                    {currentKeyType().properties?.map(({ displayName, name, values }) => (
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-semibold" for={name}>{displayName}</label>

                            {values.length > 1 ? (
                                <select class="border border-stone-400 rounded p-2" name={name} oninput={(event) => assignFormValue(event)}>
                                    {values.map((value) => (
                                        <option value={value instanceof Custom ? undefined : value}>
                                            {value instanceof Custom ? 'Custom' : value}
                                        </option>
                                    ))}
                                </select>
                            ) : values.length === 1 && values[0] instanceof Custom ? (
                                <input class="border border-stone-400 rounded p-2" name={name} />
                            ) : (
                                <input class="border border-stone-300 text-stone-500 rounded p-2" name={name} value={values[0].toString()} readOnly />
                            )}
                        </div>
                    ))}
                </form>
            )}

            {cryptoKey() && (
                <>
                    <h6 class="mt-6">Crypto Key</h6>
                    <code class="big">{cryptoKey()}</code>
                </>
            )}

            {publicKey() && (
                <>
                    <h6 class="mt-6">Public Key</h6>
                    <code class="big">{publicKey()}</code>
                    <h6>Private Key</h6>
                    <code class="big">{privateKey()}</code>
                </>
            )}
        </>
    );
};
