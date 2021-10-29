// import { registry } from "./UI/BaseElement.js"
// registry.version = "2"

Promise.all([
    import("./UI/hello-world/HelloWorld.js"),
    import("./UI/ui-checkbox/UICheckbox.js")
])
