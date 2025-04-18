class marketActivity extends HTMLElement {
    constructor(){
        super()
        const timestamp = this.getAttribute("timestamp") || "-";
        const volume = this.getAttribute("volume") || "-";
        const symbol = this.getAttribute("symbol") || "ABC";
        const type = this.getAttribute("type") || "-";
        const price = this.getAttribute("price") || "$";
        

        const bidShade = limitBid == "" ? 900 : 700
        const askShade = limitAsk == "" ? 900 : 700

        this.innerHTML = `
                        
                        `
    }
}
customElements.define("market-activity", marketActivity);
