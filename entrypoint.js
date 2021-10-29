import { registry } from "./UI/BaseElement.js"

registry.version = "1"

Promise.all([
    import("./UI/hello-world/HelloWorld.js"),
    import("./UI/ui-checkbox/UICheckbox.js")
])
