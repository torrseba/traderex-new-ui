export class OrderbookRow extends HTMLElement {
    constructor(){
        super()
    }
    connectedCallback() {
        const bids = this.getAttribute("bids") || "";
        const asks = this.getAttribute("asks") || "";
        const strike = this.getAttribute("strike") || "";
        const limitBid = this.getAttribute("limit-bid") || "";
        const limitAsk = this.getAttribute("limit-ask") || "";

        // const bidShade = limitBid == "" ? "bg-green-900" : "bg-green-700"
        // const askShade = limitAsk == "" ? "bg-red-900" : "bg-red-700"

        // <div class="grid grid-cols-5 text-center text-sm h-10">
        //                     <div class="relative bg-gray-800 border-r border-gray-700">
        //                         <input value="${limitBid}" class="w-full h-full bg-transparent text-white pl-6" />
        //                         <button class="absolute left-1 top-1 text-red-400">×</button>
        //                     </div>
        //                     <div id="bids" class="${bids === "" ? 'bg-green-700' : 'bg-opacity-30 bg-green-700'} flex items-center justify-center font-bold">${bids}</div>
        //                     <div id="strike" class="bg-gray-700 flex items-center justify-center font-bold">${strike}</div>
        //                     <div id="asks" class="${asks === "" ? 'bg-red-700' : 'bg-opacity-30 bg-red-700'} flex items-center justify-center font-bold">${asks}</div>
        //                     <div class="relative bg-gray-700">
        //                         <input value="${limitAsk}" class="w-full h-full bg-transparent text-white pl-6" />
        //                         <button class="absolute right-1 top-1 text-grey-400">×</button>
        //                     </div>
        //                 </div>

        this.innerHTML = `
                        <div class="grid grid-cols-5 pb-0.5">
                            <div class="flex items-center space-x-1">
                                <button class="w-1/4 bg-gray-700 text-white border-2 border-gray-600 rounded-lg text-xl">×</button>
                                <input value="${limitBid}" class="w-3/4 h-3/4 bg-gray-800 text-white border-2 border-gray-700 rounded-lg px-4 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div id="bids" class="${bids === "" ? 'bg-green-700' : 'bg-opacity-30 bg-green-700'} flex items-center justify-center font-bold h-12">${bids}</div>
                            <div id="strike" class="flex items-center justify-center font-bold h-12">${strike}</div>
                            <div id="asks" class="${asks === "" ? 'bg-red-700' : 'bg-opacity-30 bg-red-700'} flex items-center justify-center font-bold h-12">${asks}</div>
                            <div class="flex items-center space-x-1">
                                <input value="${limitAsk}" class="h-3/4 w-3/4 bg-gray-800 text-white border-2 border-gray-700 rounded-lg px-4 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <button class="w-1/4 bg-gray-700 text-white border-2 border-gray-600 rounded-lg text-xl">×</button>
                            </div>
                        </div>
                        `
    }
    set strike(val) {        
        this.setAttribute('strike', val); 
    }
    get strike() {
        return this.querySelector("#strike").textContent;
    }
    set bids(val) {
        this.setAttribute('bids', val); 
    }
    get bids() {
        return this.querySelector("#bids").textContent;
    }
    set asks(val) {
        this.setAttribute('asks', val); 
    }
    get asks() {
        return this.querySelector("#asks").textContent;
    }
    // set limitBid(val) {
    //     this.querySelector(".bg-gray-700 input").value = val;
    // }
    // get limitBid() {
    //     return this.querySelector(".bg-gray-700 input").value;
    // }
    // set limitAsk(val) {
    //     this.querySelector(".bg-gray-700 input").value = val;
    // }
    // get limitAsk() {
    //     return this.querySelector(".bg-gray-700 input").value;
    // }
}
customElements.define("orderbook-row", OrderbookRow);
