// middleware/flash.js

/*
 * @param { Object } options
 * @return { Function } with
 * @param { Object } req
 * @param { Object } res
 * @param { Function } next
 * @api public
 */
export const flash = (options = { rendered: false }) => (req, res, next) => {
    if (req.session === undefined) throw new Error('req.flash requires sessions');	
    if (req.flash) return next();
    req.flash = new class {
        constructor () {
            this._oldInput = req.body || {};
            this._storage = req.session.flash = req.session.flash || {};
        }

        get oldInput() {
            const oldInput = this._oldInput;
            this._oldInput = {};
            return oldInput;
        }
        
        get all() {
            req.session.flash = {};
            return this._storage;
        }

        get(name, _default = []) {
            const item = Reflect.get(this._storage, name);
            Reflect.set(this._storage, name, undefined);
            return item || _default;
        }

        set(name, value) {
            if (Array.isArray(value)) {
                (this._storage[name] = this._storage[name] || []).push(...value);
                return this._storage[name].length;
            }
            (this._storage[name] = this._storage[name] || []).push(value);
        }

        empty() {
            return Object.is(this._storage, {});
        }
    };
    if (options.rendered === true) {
        let render = res.render;
        res.render = function () {
            // attach flash messages to res.locals.messages
            res.locals.messages = req.flash;
            render.apply(res, arguments);
    	}
    }
    next();
}
