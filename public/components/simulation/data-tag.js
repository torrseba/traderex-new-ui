class dataTag extends HTMLElement {
    constructor(){
        super()
        const label = this.getAttribute("label") || "";
        this.innerHTML = `
                        <div class="bg-gray-800 p-2 rounded">
                            ${label}
                            <br>
                            <span class="text-green-400 text-lg">
                                ${this.innerText}
                            </span>
                        </div>`
    }
}
customElements.define("data-tag", dataTag);