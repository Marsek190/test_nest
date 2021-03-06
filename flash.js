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
    req.flash = {
        _oldInput: req.body || req.query || {},
        _storage: req.session.flash = req.session.flash || {},

        get oldInput() {
            const oldInput = this._oldInput;
            this._oldInput = {};
            return oldInput;
        },
        
        get all() {
            req.session.flash = {};
            return this._storage;
        },

        get(name) {
            const item = Reflect.get(this._storage, name);
            Reflect.set(this._storage, name, undefined);
            return item || [];
        },

        set(name, value) {
            (this._storage[name] = this._storage[name] || []).push(...(Array.isArray(value) ? value : [value]));
        },

        empty() {
            return Object.is(this._storage, {});
        }
    };
    if (options.rendered === true) {
        let render = res.render;
        res.render = function () {
            // attach flash messages to res.locals.messages
            res.locals.messages = req.flash.all;
            // attach old input from req to res.locals.messages
            res.locals.oldInput = req.flash.oldInput;
            render.apply(res, arguments);
    	}
    }
    next();
}
