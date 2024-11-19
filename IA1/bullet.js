"use strict";

// defaults
const DEFAULT_USE_BULLET_POINTS = false;

// external constants that need to match the HTML document
const ORIGINAL_CLASS = ".originalText";
const BULLET_CLASS = ".bulletText";
const CHECKBOX_ID = "useBulletPoints";

// internal constants
const USE_BULLET_POINTS_KEY = "useBulletPoints";
const TRUE = "true";
const FALSE = "false";

function get() {
    let value = window.localStorage.getItem(USE_BULLET_POINTS_KEY);

    if (value == null)
        return DEFAULT_USE_BULLET_POINTS;

    console.assert(value === TRUE || value === FALSE);
    return value === TRUE;
}

/**
 * Whther the user opted to use bullet points as their preferred content representation.
 */
let useBulletPoints = get();

/**
 * Sets useBulletPoints value and stores it to local storage.
 * @param {boolean} value 
 */
function set(value) {
    console.assert(value === true || value === false);

    useBulletPoints = value;
    window.localStorage.setItem(USE_BULLET_POINTS_KEY, useBulletPoints ? TRUE : FALSE);

    update_visibility();
}

function update_visibility() {
    /**
     * @param {Element} element 
     * @param {boolean} visible 
     */
    function set_visibility(element, visible) {
        element.setAttribute("aria-hidden", visible ? "false" : "true")
    }

    const hidden_audio = document.querySelector((useBulletPoints ? ORIGINAL_CLASS : BULLET_CLASS) + " audio")
    if (hidden_audio !== null)
        hidden_audio.pause();

    for (const el of document.querySelectorAll(ORIGINAL_CLASS)) {
        set_visibility(el, !useBulletPoints);
    }

    for (const el of document.querySelectorAll(BULLET_CLASS)) {
        set_visibility(el, useBulletPoints);
    }
}

document.addEventListener("DOMContentLoaded", (_) => {
    const checkbox = document.getElementById(CHECKBOX_ID);
    checkbox.checked = useBulletPoints;
    checkbox.addEventListener("change", (event) => set(checkbox.checked));

    update_visibility();
})
