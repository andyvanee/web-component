class Registry {
    constructor() {
        this.components = new Set()
        this.fragments = {}
        this.templates = new Map()
    }

    /**
     * Add/load a template fragment from a url
     * @param {string} url
     * @returns {string}
     */
    async loadFragment(url) {
        if (!url) return ""
        const key = `fragment:${url}`
        if (!this.fragments[key]) {
            try {
                this.fragments[key] = await (await fetch(url)).text()
            } catch (err) {
                this.fragments[key] = ""
            }
        }
        return this.fragments[key]
    }

    /**
     * Get/set a template for a component
     * @param {typeof BaseElement} component
     * @param {HTMLTemplateElement} template
     * @returns
     */
    template(component, template) {
        if (template) this.templates.set(component, template)
        return this.templates.get(component) || ""
    }
}

// Singleton instance of the registry
export const registry = new Registry()

export class BaseElement extends HTMLElement {
    /** @type {string} */
    static html = ""
    static css = ""

    root = null

    /**
     *
     * @param {string} tagName the tag name to register
     * @param {typeof BaseElement} component
     * @returns
     */
    static async define(tagName, component) {
        if (registry.components.has(tagName)) return
        registry.components.add(tagName)
        const [html, css] = await Promise.all([
            registry.loadFragment(component.html),
            registry.loadFragment(component.css)
        ])
        const template = document.createElement("template")
        const styletag = css ? `<style>${css}</style>` : ""
        template.innerHTML = `${styletag}${html}`
        registry.template(component, template)
        customElements.define(tagName, component)
    }

    constructor() {
        super()
        const template = registry.template(this.constructor)
        if (!template) throw `No template for element`
        this.root = this.createRenderRoot()
        this.root.appendChild(template.content.cloneNode(true))
    }

    /**
     * Create the root node of this element. By default this is
     * a ShadowRoot with mode=open.
     * @returns {ShadowRoot | HTMLElement}
     */
    createRenderRoot() {
        return this.attachShadow({ mode: "open" })
    }

    /**
     * Dispatch an event
     * @param {string} type message name
     * @param {object} detail message detail object
     * @param {boolean} bubbles
     * @param {boolean} composed
     */
    trigger(type, detail, bubbles = true, composed = true) {
        const ev = new CustomEvent(type, { detail, bubbles, composed })
        this.dispatchEvent(ev)
    }

    /**
     * Alias for addEventListener
     * @param {string} type Message name
     * @param {function} handler
     */
    on(type, handler) {
        this.addEventListener(type, handler)
    }

    /**
     * Alias for removeEventListener
     * @param {string} type Message name
     * @param {function} handler
     */
    off(type, handler) {
        this.removeEventListener(type, handler)
    }

    /**
     * Single-shot event listener
     * @param {string} type message name
     * @param {function} handler
     */
    once(type, handler) {
        const h = ev => {
            this.off(type, h)
            handler(ev)
        }
        this.addEventListener(type, h)
    }
}
