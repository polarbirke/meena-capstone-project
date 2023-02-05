export function getRoomById(rooms, id) {
    return rooms.find(room => room.id === id);
}

export function getRoomBySlug(rooms, slug) {
    return rooms.find(room => room.slug === slug);
}
