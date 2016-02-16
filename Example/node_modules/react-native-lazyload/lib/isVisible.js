export default function({x, y}, {x: tx, y: ty, rx, ry}, {width: vw, height: vh}, offset) {
    let x1 = x - offset;
    let y1 = y - offset;
    let x2 = x + vw + offset;
    let y2 = y + vh + offset;

    let visible = false;

    if (ty >= y1 && ty <= y2) {
        visible = (tx >= x1 && tx <= x2) ||
            (rx >= x1 && rx <= x2) ||
            (tx <= x1 && rx >= x2);
    } else if (tx >= x1 && tx <= x2) {
        visible = (ty >= y1 && ty <= y2) ||
            (ry >= y1 && ry <= y2) ||
            (ty <= y1 && ry >= y2);
    }

    return visible;
}
