import { ILogger } from "./ILogger";

export class HTMLLogger implements ILogger{
    public RootElement: Element;
    constructor(rootElementId: string, public Options:{
        ButtonClass: string;
        MessageClass: string;
        ContainerClass: string
    } = {
        ButtonClass: "logger-button",
        MessageClass: "logger-message",
        ContainerClass: "logger-container"
    }){
        this.RootElement = document.getElementById(rootElementId) || document.body;
        this.InitContainer();
    }
    public LogMessage(message: string): void {
        this.RenderMessage(message);
    }    
    public LogError(errorMessage: string, data?: any): void {
        this.RenderMessage(`<span style="color:red;">${errorMessage}</span>`);
    }
    protected RenderMessage(htmlMessage: string){
        let messageContainer = document.getElementById("logger-container-message");
        if(messageContainer){
            messageContainer.innerHTML = htmlMessage;
        }
        let loggerContainer = document.getElementById("logger-container");
        if(loggerContainer)
            loggerContainer.style.display = "block";
    }
    protected InitContainer(){
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
        footer.className = "logger-container-footer"
        let okBtn = document.createElement("button");
        okBtn.className = self.Options.ButtonClass;
        okBtn.value = "OK";
        okBtn.innerText = "OK";
        okBtn.onclick = function(){
            loggerContainer.style.display = "none";
            return false;
        }
        footer.appendChild(okBtn);

        loggerContainer.appendChild(messageContainer);
        loggerContainer.appendChild(footer);
        self.RootElement.appendChild(loggerContainer);
    }
}