"use strict";

/**
 *  @param {URLSearchParams} params
 */
function get_room_from_form(params) {
    const dvorana = params.get("dvorana");
    return dvorana;
}

/**
 *  @param {URLSearchParams} params
 */
function get_room_from_geo_protocol_handler(params) {
    const uri = params.get("uri");
    if (uri === null || !uri.startsWith("geo"))
        return null;

    const url = new URL(uri);
    const inner_params = url.searchParams;
    return inner_params.get("q");
}

function get_room() {
    const params = new URLSearchParams(window.location.search);
    const room = get_room_from_form(params);
    if (room !== null) {
        return room;
    }
    return get_room_from_geo_protocol_handler(params);
}

const martinovka_ground_floor_rooms = ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M-LAB1", "MLAB1"]
const martinovka_first_floor_rooms = ["M-LAB2", "MLAB2", "M-LAB3", "MLAB3"]

const martinovka_ground_floor_document = "karta/martinovka-prizemlje.pdf"
const martinovka_first_floor_document = "karta/martinovka-prvi-kat.pdf"

/**
 * @param {string} room
 */
function try_get_martinovka_document(room) {
    room = room.toUpperCase()

    if (martinovka_ground_floor_rooms.includes(room)) {
        return martinovka_ground_floor_document;
    } else if (martinovka_first_floor_rooms.includes(room)) {
        return martinovka_first_floor_document;
    } else {
        return null;
    }
}

function redirect_if_needed() {
    const room = get_room();

    if (room !== null) {
        const m_doc = try_get_martinovka_document(room);
        if (m_doc !== null) {
            window.location.replace(m_doc);
        } else {
            const newUrl = new URL("https://www.fer.unizg.hr/lib/lokacija/2/info.php");
            newUrl.searchParams.set("soba", room);
            window.location.replace(newUrl);
        }
    }
}

redirect_if_needed();
