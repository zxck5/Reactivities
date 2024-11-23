/// <reference types="vite/client" />

declare let module: {
    hot?: {
        accept(callback: () => void): void;
        eject(id: number): void;
    };
};