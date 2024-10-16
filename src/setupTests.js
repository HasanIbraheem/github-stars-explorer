// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// In your test file or setup file (e.g., src/setupTests.js)
global.MutationObserver = class {
    constructor(callback) {
        this.callback = callback;
    }
    disconnect() {}
    observe() {}
};

import '@testing-library/jest-dom';
