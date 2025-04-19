// app.js

var config1 = {
	apiKey: "AIzaSyCXZ51hEfYGA4nt7f0CNK_cDVStMXgZ2og",
	authDomain: "traderexdevelopment.firebaseapp.com",
	databaseURL: "https://traderexdevelopment.firebaseio.com",
	projectId: "traderexdevelopment",
	storageBucket: "traderexdevelopment.appspot.com",
	messagingSenderId: "1096455515344"
}; //dev keys


let dbs = [
	firebase.initializeApp(config1, "traderexdev"),
	firebase.initializeApp({
	    apiKey: "AIzaSyCpZW3Wf6pwXaXw_CN4keefpmfDPFiVgtI",
	    authDomain: "traderexdatabase1.firebaseapp.com",
	    databaseURL: "https://traderexdatabase1.firebaseio.com", // 714.
	    projectId: "traderexdatabase1",
	    storageBucket: "traderexdatabase1.appspot.com",
	    messagingSenderId: "308276616136",
	    appId: "1:308276616136:web:53f4aaf41fca3a58"
  }, "trxdb1"),
  firebase.initializeApp({
    apiKey: "AIzaSyCWAuylHu8AjWxHrFuE8l_nACmlxMwv2G0",
    authDomain: "traderex-database2.firebaseapp.com",
    databaseURL: "https://traderex-database2.firebaseio.com",
    projectId: "traderex-database2",
    storageBucket: "traderex-database2.appspot.com",
    messagingSenderId: "120063677873",
    appId: "1:120063677873:web:a54f08f44b9b7223"
  }, "trxdb2"),
  firebase.initializeApp({
    apiKey: "AIzaSyAZNl0JpPUTNYjEC2ENYk3G_jia1K3_73w",
    authDomain: "traderexdatabase3.firebaseapp.com",
    databaseURL: "https://traderexdatabase3.firebaseio.com",
    projectId: "traderexdatabase3",
    storageBucket: "traderexdatabase3.appspot.com",
    messagingSenderId: "750793083401",
    appId: "1:750793083401:web:2b9f3e1325a63048"
  }, "trxdb3")
];


const institution = "NYC2022";
const dbi = 2;
let db = dbs[dbi].database().ref(institution);

let sessionRef = db.child("Sessions")
let sessionid = null;
console.log("pre sessionRef")
sessionRef.on("value", function(snapshot) {
    if (snapshot.exists()) {
      console.log("Sessions found")
      sessionid = Object.keys(snapshot.val())[0];

      let userData = snapshot.val()[sessionid]["Dealers"];
      uid = Object.keys(userData)[0];

      console.log("User ID:", uid);

      let cashRef = db.child("Sessions").child(sessionid).child("Users").child(uid).child("Assets").child("Cash");
      let statsRef = db.child("Sessions").child(sessionid).child("Users").child(uid).child("Assets").child("INTC").child("Stats");
      let vwapRef = db.child("Sessions").child(sessionid).child("Assets").child("INTC").child("VWAP");
      let totalvolRef = db.child("Sessions").child(sessionid).child("Assets").child("INTC").child("TotalVolume");
      let lastpriceRef = db.child("Sessions").child(sessionid).child("Assets").child("INTC").child("CurrentAssetPrice");
      let dealerMarketRef = db.child("Sessions").child(sessionid).child("DealerMarket");
      let dealerPlayerRef = db.child("Sessions").child(sessionid).child("Dealers").child(uid);
      let dealersRef = db.child("Sessions").child(sessionid).child("Users").child(uid).child("Assets").child("INTC").child("Stats");
      
      
    }
});





// Sample candlestick data (format: time, open, high, low, close)
const seriesData = [
    {
      x: new Date("2025-03-15").getTime(),
      y: [30.10, 30.40, 29.90, 30.20]
    },
    {
      x: new Date("2025-03-16").getTime(),
      y: [30.20, 30.50, 30.00, 30.30]
    },
    {
      x: new Date("2025-03-17").getTime(),
      y: [30.30, 30.60, 30.10, 30.40]
    },
    {
      x: new Date("2025-03-18").getTime(),
      y: [30.40, 30.80, 30.20, 30.65]
    },
    {
      x: new Date("2025-03-19").getTime(),
      y: [30.65, 31.20, 30.50, 31.00]
    }
  ];
  
  const options = {
    chart: {
      type: "candlestick",
      height: 320,
      background: "#1f2937", // Tailwind bg-gray-800
      toolbar: {
        show: false
      }
    },
    theme: {
      mode: "dark"
    },
    series: [{
      data: seriesData
    }],
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#e5e7eb" // Tailwind text-gray-300
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors: "#e5e7eb"
        }
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#10b981",   // Tailwind green-500
          downward: "#ef4444"  // Tailwind red-500
        }
      }
    }
  };
  
  const chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
  