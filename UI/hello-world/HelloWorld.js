import { BaseElement } from "../BaseElement.js"

import { mongoid } from "../../lib/uuid.js"

class HelloWorld extends BaseElement {
    #uuid = ""
    static html = "/UI/hello-world/HelloWorld.html"
    static css = "/UI/hello-world/HelloWorld.css"

    get uuid() {
        return this.#uuid
    }

    set uuid(value) {
        this.#uuid = value
        this.root.querySelector(".uuid").innerHTML = value
    }

    connectedCallback() {
        this.uuid = mongoid()
        const checkbox = this.root.querySelector("ui-checkbox")
        checkbox.addEventListener("change", (ev) => {
            if (ev.detail) {
                this.uuid = mongoid()
            }
        })
    }
}

BaseElement.define("hello-world", HelloWorld)
