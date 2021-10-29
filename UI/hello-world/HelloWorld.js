import { BaseElement } from "../BaseElement.js"

class HelloWorld extends BaseElement {
    static html = "/UI/hello-world/HelloWorld.html"
    static css = "/UI/hello-world/HelloWorld.css"

    connectedCallback() {
        const checkbox = this.root.querySelector("ui-checkbox")
        checkbox.addEventListener("change", ev => {
            console.log("change!", ev.detail)
        })
        console.log("Why hello there 👋")
    }
}

BaseElement.define("hello-world", HelloWorld)
