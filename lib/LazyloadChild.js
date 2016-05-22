export default class {
    constructor(container, measureLayout, toggle) {
        let {offset, recycle, horizontal, contentOffset, dimensions} = container;
        this._recycle = recycle;
        this._toggle = toggle;
        this._horizontal = horizontal;
        if (recycle && offset >= recycle) {
            console.warn('Recycle distance should be much more than render distance.');
            recycle = offset;
        }

        measureLayout(container.data, (x, y, width, height) => {
            let {width: sightWidth, height: sightHeight} = dimensions;
            this._sight = horizontal ? {
                start: -(sightWidth - x + offset),
                end: x + width + offset
            } : {
                start: -(sightHeight - y + offset),
                end: y + height + offset
            };
            if (recycle) {
                this._bound = horizontal ? {
                    start: -(recycle + sightWidth - x),
                    end: x + width + recycle
                } : {
                    start: -(recycle + sightHeight - y),
                    end: y + height + recycle
                };
            }

            this.move(contentOffset.x, contentOffset.y);
        });
    }

    _recycled = false;
    _visible = false;
    _horizontal = false;
    _bound = null;
    _recycle = null;
    _toggle = null;
    _sight = null;

    move = (x, y) => {
        if (!this._sight) {
            return;
        }
        let sight = this._sight;
        let bound = this._bound;
        let recycle = this._recycle;
        let scrolled = this._horizontal ? x : y;

        if (this._recycled && scrolled >= bound.start && scrolled <= bound.end) { // Recycled element back into recycle distance
            this._recycled = false;
            this._visible = true;
            this._toggle(true);
        } else if (!this._visible && scrolled >= sight.start && scrolled <= sight.end) { // Invisible element scroll into sight
            this._visible = true;
            this._toggle(true);
        } else if (this._visible && recycle && !this._recycled) {
            if (scrolled > bound.end || scrolled < bound.start) {
                this._recycled = true;
                this._visible = false;
                this._toggle(false);
            }
        }
    };
}
