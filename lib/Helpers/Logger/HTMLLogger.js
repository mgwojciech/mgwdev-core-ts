export class HTMLLogger {
    constructor(rootElementId, Options = {
            ButtonClass: "logger-button",
            MessageClass: "logger-message",
            ContainerClass: "logger-container"
        }) {
        this.Options = Options;
        this.RootElement = document.getElementById(rootElementId) || document.body;
        this.InitContainer();
    }
    LogMessage(message) {
        this.RenderMessage(message);
    }
    LogError(errorMessage, data) {
        this.RenderMessage(`<span style="color:red;">${errorMessage}</span>`);
    }
    RenderMessage(htmlMessage) {
        let messageContainer = document.getElementById("logger-container-message");
        if (messageContainer) {
            messageContainer.innerHTML = htmlMessage;
        }
        let loggerContainer = document.getElementById("logger-container");
        if (loggerContainer)
            loggerContainer.style.display = "block";
    }
    InitContainer() {
        let self = this;
        let messageContainer = document.createElement("div");
        messageContainer.id = "logger-container-message";
        messageContainer.className = self.Options.MessageClass;
        let loggerContainer = document.createElement("div");
        loggerContainer.id = "logger-container";
        loggerContainer.className = "logger-container";
        loggerContainer.style.display = "none";
        loggerContainer.className = self.Options.ContainerClass;
        let footer = document.createElement("div");
        footer.className = "logger-container-footer";
        let okBtn = document.createElement("button");
        okBtn.className = self.Options.ButtonClass;
        okBtn.value = "OK";
        okBtn.innerText = "OK";
        okBtn.onclick = function () {
            loggerContainer.style.display = "none";
            return false;
        };
        footer.appendChild(okBtn);
        loggerContainer.appendChild(messageContainer);
        loggerContainer.appendChild(footer);
        self.RootElement.appendChild(loggerContainer);
    }
}
