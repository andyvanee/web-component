import { BaseElement } from "../BaseElement.js"

class UICheckbox extends BaseElement {
    static html = "/UI/ui-checkbox/UICheckbox.html"
    static css = "/UI/ui-checkbox/UICheckbox.css"

    get input() {
        return this.root.querySelector("input")
    }

    get active() {
        return this.hasAttribute("active")
    }

    set active(value) {
        if (value) {
            this.input.setAttribute("checked", "")
            this.setAttribute("active", "")
        } else {
            this.input.removeAttribute("checked")
            this.removeAttribute("active")
        }
    }

    connectedCallback() {
        this.active = this.active // init checkbox
        this.input.addEventListener("change", (ev) => {
            this.active = !this.active
            this.trigger("change", this.active)
        })
    }
}

BaseElement.define("ui-checkbox", UICheckbox)
