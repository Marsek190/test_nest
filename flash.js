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
    req.session.flash = req.session.flash || {};
    req.flash = new class {
        constructor () {
            // прошлый ввод с клиента
            this._oldInput = req.body || req.query || {};
            // изолируем логику обработки под Proxy
            this._storage = req.session.flash || new Proxy({}, {
                get(target, phrase) {
                    const item = Reflect.get(target, phrase);
                    Reflect.set(target, phrase, undefined);
                    return item || [];
                },
                set(target, phrase, value) {
                    (Array.isArray(value)) ? (target[phrase] = target[phrase] || []).push(...value)
                        : (target[phrase] = target[phrase] || []).push(value);
                    return true;
                }
            });
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

        get(name) {
            return Reflect.get(this._storage, name);
        }

        set(name, value) {
            Reflect.get(this._storage, name, value);            
        }

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
