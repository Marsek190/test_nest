// middleware/flash.js

/*
 * Proxy's handler on req.session.flash
 */
let flashHandler = {
    get(target, name) {
        const item = target[name];
        delete target[name];
        return item || [];
    },
    set(target, name, value) {
        if (Array.isArray(value)) {
            (target[name] = target[name] || []).push(...value);
        }
        (target[name] = target[name] || []).push(value);
    }
};

/*
    Using:

    req.flash.errors = [{ msg: '', value: '' }, { msg: '', value: '' }];
    res.json(301, {
        errors: req.flash.errors, -> return [{ msg: '', value: '' }, { msg: '', value: '' }]
        info: req.flash.info -> return []
    });
 */

/*
 * @param { Object } options
 * @return { Function } with
 * @param { Object } req
 * @param { Object } res
 * @param { Function } next
 */
export const flash = (options = { rendered: false }) => (req, res, next) => {
    if (req.session === undefined) throw new Error('req.flash requires sessions');	
    if (req.flash) return next();
    req.session.flash = req.session.flash || {}; 
    req.flash = new Proxy(req.session.flash, flashHandler);
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