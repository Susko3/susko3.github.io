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

function redirect_if_needed() {
    const room = get_room();

    if (room !== null) {
        const newUrl = new URL("https://www.fer.unizg.hr/lib/lokacija/2/info.php");
        newUrl.searchParams.set("soba", room);
        window.location.replace(newUrl);
    }
}

redirect_if_needed();
