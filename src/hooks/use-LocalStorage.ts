import { useMemo } from "react";

interface LocalStorageFunctions {
    setLocalStorage: (key: string, value: any, shouldStringify?: boolean) => void;
    getLocalStorage: (key: string, shouldParse?: boolean) => any;
    removeLocalStorage: (key: string) => void;
}

/** 
 * Custom hook to handle local storage.
 * 
 * @returns {LocalStorageFunctions} - Object containing setLocalStorage, getLocalStorage, and removeLocalStorage functions.
 */
const useLocalStorage = (): LocalStorageFunctions => {
    /**
     * Saves a value to local storage.
     * 
     * @param {string} key - The key under which to store the value.
     * @param {any} value - The value to store.
     * @param {boolean} shouldStringify - Whether the value should be stringified before storing.
     */
    const setLocalStorage = (key: string, value: any, shouldStringify: boolean = false): void => {
        if (shouldStringify) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    };

    /**
     * Retrieves a value from local storage.
     * 
     * @param {string} key - The key of the value to retrieve.
     * @param {boolean} shouldParse - Whether to parse the retrieved value.
     * @returns {any} - The retrieved value.
     */
    const getLocalStorage = (key: string, shouldParse: boolean = false): any => {
        let storedValue = localStorage.getItem(key);
        if (shouldParse && storedValue) {
            storedValue = JSON.parse(storedValue);
        }
        return storedValue;
    };

    /**
     * Removes a value from local storage.
     * 
     * @param {string} key - The key of the value to remove.
     */
    const removeLocalStorage = (key: string): void => {
        localStorage.removeItem(key);
    };

    return useMemo(() => ({
        setLocalStorage,
        getLocalStorage,
        removeLocalStorage,
    }), []);
};

export default useLocalStorage;
