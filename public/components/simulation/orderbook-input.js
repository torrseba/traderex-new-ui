class orderbookInput extends HTMLElement {
    constructor(){
        super()
        const bids = this.getAttribute("bids") || "";
        const asks = this.getAttribute("asks") || "";
        const limitBid = this.getAttribute("limit-bid") || "";
        const limitAsk = this.getAttribute("limit-ask") || "";

        const bidShade = limitBid == "" ? 900 : 700
        const askShade = limitAsk == "" ? 900 : 700

        this.innerHTML = `
                        <div class="grid grid-cols-5 text-center text-sm h-10">
                            <div class="relative bg-gray-700">
                                <input value="${limitBid}" class="w-full h-full bg-transparent text-white pl-6" />
                                <button class="absolute left-1 top-1 text-red-400">×</button>
                            </div>
                            <div class="bg-green-${bidShade} flex items-center justify-center font-bold">${bids}</div>
                            <div class="bg-gray-700 flex items-center justify-center font-bold">${this.innerText}</div>
                            <div class="bg-red-${askShade} flex items-center justify-center font-bold">${asks}</div>
                            <div class="relative bg-gray-700">
                                <input value="${limitAsk}" class="w-full h-full bg-transparent text-white pl-6" />
                                <button class="absolute right-1 top-1 text-red-400">×</button>
                            </div>
                        </div>`
    }
}
customElements.define("orderbook-input", orderbookInput);
