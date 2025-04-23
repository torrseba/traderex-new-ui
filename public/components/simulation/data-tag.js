class DataTag extends HTMLElement {
    constructor(){
        super()
        const label = this.getAttribute("label") || "";
        const value = this.getAttribute("value") || "-";

        this.innerHTML = `
                        <div class="bg-gray-800 p-2 rounded">
                            ${label}
                            <br>
                            <span id="valueSpan" class="text-green-400 text-lg">
                                ${value}
                            </span>
                        </div>`;
    }
    set value(val) {
       //this.setAttribute('value', val); 
       this.querySelector("#valueSpan").textContent = val;
    }
        
    get value() {
        return this.querySelector("#valueSpan").textContent;
    }

    
}
customElements.define("data-tag", DataTag);