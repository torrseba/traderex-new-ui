class navBarClock extends HTMLElement {
    constructor(){
        super()
        this.innerHTML = `
                        <div class="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700">
                            <div class="flex items-center space-x-2">
                            <img src="logo.png" alt="Logo" class="h-8 w-8">
                            <span class="text-green-400 font-bold">TradeEX</span>
                            <span class="text-sm text-gray-400">Powered by THE POWER OF SIMULATION</span>
                            </div>
                            <div class="text-xl font-mono bg-blue-600 px-4 py-1 rounded">17:43:45</div>
                            <div>
                            <span class="text-sm text-gray-400">Demo User: 12171</span>
                            <a href="#" class="ml-4 text-blue-400">Logout</a>
                            <a href="#" class="ml-2 text-blue-400">Edit Name</a>
                            </div>
                        </div>
                        `
    }
}
customElements.define("nav-bar-clock", navBarClock);
