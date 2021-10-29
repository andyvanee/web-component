import { BaseElement } from "../BaseElement.js"

class UICheckbox extends BaseElement {
    static html = "/UI/ui-checkbox/UICheckbox.html"
    static css = "/UI/ui-checkbox/UICheckbox.css"

    connectedCallback() {
        this.active = this.hasAttribute("active")
        const input = this.root.querySelector("input")
        input.addEventListener("change", ev => {
            this.active = input.checked
            if (this.active) this.setAttribute("active", "")
            else this.removeAttribute("active")
            this.trigger("change", this.active)
        })
    }
}

BaseElement.define("ui-checkbox", UICheckbox)
