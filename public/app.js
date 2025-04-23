// app.js
import '/components/simulation/orderbook-row.js';

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
      //sessionid = "-NDnGQ2_yjFQ-SWsQDV-"

      let userData = snapshot.val()[sessionid]["Dealers"];
      let uid = Object.keys(userData)[0];
      uid = "qy3awR6a5Ca9oMu02vapHEmDX4B2" //for testing
      //uid = "7c77IBes3DNsVqGDHEU31xFSaig1"
      //uid = "B03WQDscdBYo1oX2c2IwLvNjEwy1"

      console.log("User ID:", uid);

      let cashRef = db.child("Sessions").child(sessionid).child("Users").child(uid).child("Assets").child("Cash");
      let statsRef = db.child("Sessions").child(sessionid).child("Users").child(uid).child("Assets").child("INTC").child("Stats");
      let vwapRef = db.child("Sessions").child(sessionid).child("Assets").child("INTC").child("VWAP");
      let totalvolRef = db.child("Sessions").child(sessionid).child("Assets").child("INTC").child("TotalVolume");
      let lastpriceRef = db.child("Sessions").child(sessionid).child("Assets").child("INTC").child("CurrentAssetPrice");
      let dealerMarketRef = db.child("Sessions").child(sessionid).child("DealerMarket");
      let dealerPlayerRef = db.child("Sessions").child(sessionid).child("Dealers").child(uid);
      let dealersRef = db.child("Sessions").child(sessionid).child("Users").child(uid).child("Assets").child("INTC").child("Stats");

      const dealerMode = false;
      const hasWrittenMission = true;
      function formatMoney(value){
        if (!value){
          return "-";
        } else {
          return value.toFixed(2);
        }
      }

      let ABC = null;
      let LastPrice = null;
      let Cash = null;
      async function renderStats(){
        const promise2 = new Promise(resolve => {
        // Render Cash
        if(dealerMode != true){
          cashRef.on('value', snap => {
              if (snap.val() !== null) {
                document.getElementById("Cash").value = snap.val();
                Cash = snap.val();
              }
          });
        }else{
          dealerPlayerRef.on('value', snap=>{
            let data = snap.val();
            if (!!data){
              document.getElementById("Cash").value = data.cash;
              Cash = data.cash;
            }
          });
        }

        /// Grabs user stat values and sets corresponding states
        if(dealerMode != true){
          console.log("Test 1 runs")
          statsRef.on('value', snap =>{
            if(snap.val()){
              let AveragePos = (parseFloat(snap.val().avgPos).toFixed(2));
              let AverageBuyPrice = (snap.val().BuyVWAP);
              let AverageSellPrice = (snap.val().SellVWAP);
              let ThisPosition = (snap.val().ThisPosition);
              //let Mission: (snap.val().Mission),
              ABC = (snap.val().Shares);

              document.getElementById("Average Pos").value = AveragePos;
              document.getElementById("Average Buy").value = AverageBuyPrice;
              document.getElementById("Average Sell").value = AverageSellPrice;
              document.getElementById("Shares").value = ABC;

              if (!hasWrittenMission){
              hasWrittenMission = true;
              statsRef = db.child("Sessions").child(this.props.sessionid).child("Users").child(this.props.uid).child("Assets").child("INTC").child("Stats").child("Mission").set(this.mymission);
              }
            } else{
              // AverageBuyPrice = '-',
              // AverageSellPrice = '-',
              // ThisPosition = '-',
              // //Mission = '-',
              // ABC - "-"
            }
          });
        } else{
            dealersRef.on('value', snap =>{
              console.log("dealers Ref triggered");
              let data = snap.val();
              if (!!data){
                      let AveragePos = (parseFloat(snap.val().avgPos).toFixed(2));
                      ABC = data.Shares;
                      let AverageBuyPrice = data.BuyVWAP;
                      let AverageSellPrice = data.SellVWAP;
                      let ThisPosition = data.ThisPosition;
                      let Mission = data.Mission;

                      document.getElementById("Average Pos").value = AveragePos;
                      document.getElementById("Average Buy").value = AverageBuyPrice;
                      document.getElementById("Average Sell").value = AverageSellPrice;
                      document.getElementById("Mission").value = Mission;
                      document.getElementById("Shares").value = ABC;
              }
        });
        }

        /// Grabs market stats and sets corresponding states
        if (dealerMode != true){
          vwapRef.on('value', snap => {

              if (snap.val()) {
                  // this.setState({
                  //     MarketVWAP: (snap.val()),
                  // });
                  document.getElementById("Market VWAP").value = snap.val();
              } else {

              }
          });
          totalvolRef.on('value', snap => {

              if (snap.val()) {
                  // this.setState({
                  //     TotalVol: snap.val()
                  // });
                  document.getElementById("Market Vol.").value = snap.val();
              } else {
              }
          });
          lastpriceRef.on('value', snap => {

              if (snap.val()) {
                  // this.setState({
                  //     LastPrice: (snap.val() / 100).toFixed(2),
                  // });
                  document.getElementById("Last Price").value = (snap.val() / 100).toFixed(2);
                  LastPrice = (snap.val() / 100).toFixed(2);
                } else {
              }
          });
        }else{
            dealerMarketRef.on('value', snap => {

                let data = snap.val();
                if (!!data){
                    //update state here
                    // this.setState({
                    //   TotalVol: data.volume,
                    //   MarketVWAP: parseFloat(data.VWAP).toFixed(4),
                    //   LastPrice: data.lastPrice
                    // })
                    document.getElementById("Market VWAP").value = parseFloat(data.VWAP).toFixed(4);
                    document.getElementById("Market Vol.").value = data.volume;
                    document.getElementById("Last Price").value = data.lastPrice;

                    LastPrice = data.lastPrice;
                }
            })
        }
        resolve();
      });
      await Promise.all([promise2]);
      console.log(ABC, LastPrice, Cash);
      document.getElementById("P/L").value = formatMoney(parseFloat(Cash) + parseFloat(ABC)*parseFloat(LastPrice));
      console.log(formatMoney(parseFloat(Cash) + parseFloat(ABC)*parseFloat(LastPrice)));
      }

      function renderOrderbook(){
        let aggobRef = db.child("Sessions").child(sessionid).child("Assets").child("INTC").child("AggOB");
        let middlePointRef = db.child("Sessions").child(sessionid).child("ImportantData").child("SessionData");
        let pausedRef = db.child("Sessions").child(sessionid).child('StartSim').child('running');
        let valRef = db.child("Sessions").child(sessionid).child("Assets").child("INTC").child("orderbook");
        let auctionRef = db.child("Sessions").child(sessionid).child("inAuction");
        //declares quip automation timer
        //TODO add this
        // this.quipsTimer = setInterval(this.getQuip.bind(this), 5000);
        // this.canRender = true;
        // this.renderLoop = setInterval(()=>{ this.canRender = true; }, 1000);

        let strike, bid, ask;
        let paused;
        let inAuction;
        let orders;
        let ready;
        let strikes;

        //this listener deals with determining if the sim is paused
        pausedRef.on('value', snap => {
            let rawData = snap.val();
            if (rawData) {
                // this.setState({
                //     paused: false
                // });
                paused = false;
            } else {
                // this.setState({
                //     paused: true
                // });
                paused = true;
            }
        });

        auctionRef.on('value', snap => {
          inAuction = !!snap.val();
          // this.setState({inAuction: inAuction});
          if (inAuction){
            // TODO add this
            // this.setAuctionRowValue({"shortcutuser":true});
            // this.setAuctionRowValue({"shortcut":true});
          }
        });

        //this listener deals with getting current strikes, bid,
        //and ask. Also deals with setting ready state
        aggobRef.on('value', snap => {
            let rawData2 = snap.val();
            if (rawData2) {
                //console.log(rawData);
                rawData2 = Object.assign({"1800": {"Bid":0,"Ask":0}, "2200": {"Bid":0,"Ask":0}}, rawData2)
                var range = Object.keys(rawData2).map(y=>parseInt(y));
                range = range.filter(val=>{return val == parseInt(val)});
                var min = Math.min.apply(null, range)
                var max = Math.max.apply(null, range)
                var masterObj={}
                console.log(((max-min)/5) + 1, max, min);
                Array(((max-min)/5) + 1).fill().map((_,i)=> min + i*5).map(akey=>{if (!!akey){ masterObj[akey] = {Strike: akey.toString(), Bid: 0, Ask: 0} } })
                var rawData = Object.assign(masterObj, rawData2);

                var tempStrikes = [];
                var ords = [];
                for (var key in rawData) {
                    if (!(parseInt(key) > 0)){
                      continue;
                    }
                    //rawStrike = key;
                    strike = (key / 100).toFixed(2);
                    if (!(parseInt(strike) > 0)){
                      continue;
                    }//NaN fighting
                    tempStrikes.push(strike);
                    bid = rawData[key].Bid;
                    if (bid === undefined) {
                        bid = 0;
                    }
                    ask = rawData[key].Ask;
                    if (ask === undefined) {
                        ask = 0;
                    }
                    if (bid === 0) {
                        bid = "";
                    }
                    if (ask === 0) {
                        ask = "";
                    }
                    ords.push({
                        "Strike": strike,
                        "Bid": bid,
                        "Ask": ask
                    });
                    /*    let strike = dataObj.strike;
                          let isUser = dataObj.isUser;
                          let newValue = dataObj.newValue;
                          let orderType = dataObj.orderType;*/
                    // TODO add this
                    // this.setAuctionRowValue({strike: strike, isUser: false, newValue: bid, orderType: "Bid", delay: true});
                    // this.setAuctionRowValue({strike: strike, isUser: false, newValue: ask, orderType: "Ask", delay: true});
                }
                strikes = tempStrikes;
                // this.setState({
                //     orders: ords.reverse(),
                //     ready: true
                // });
                orders = ords.reverse();
                ready = true;
                //TODO add this
                // this.setAuctionRowValue({shortcut: true});
                // this.props.onReady();
            } else {
                //var ords = [];
                // this.setState({
                //     orders: ords,
                //     ready: false
                // });
                orders = ords;
                ready = false;
            }
            orders.map(function (ord, index) {
              renderOrderbookRow(ord.Strike, ord.Bid, ord.Ask, inAuction);
            });
        })
      }

      function renderOrderbookRow(Strike, Bid, Ask, inAuction){
        let orderbook = document.getElementById("orderbook");
        let orderbookRow  = document.createElement("orderbook-row");
        let aheadRef = db.child("Sessions").child(sessionid).child("Users").child(uid).child("Orders").child("INTC").child((Strike * 100).toFixed(0));
        //var that = this;
        inAuction = false;
        aheadRef.on('value', snap => {
            //this listener attemps to loop through orders
            //and determind total order volume at that Strike
            //as well as ahead of this(needs work)
            let placeholderAsk = "";
            let placeholderBid = "";
            let queuePosition = "";
            if (!!snap.val()) {
                console.log("found user orders");
                let rawData = snap.val();
                //console.log(rawData);
                let aheadkey = Object.keys(rawData)[Object.keys(rawData).length - 1];
                //console.log(aheadkey);
                let ahead = rawData[aheadkey].AheadOfThis || '';
                //console.log("ahead" + ahead);
                let vol = 0;
                let keys = Object.keys(rawData);
                for (let i = 0; i < keys.length; i++) {
                    vol += parseInt(rawData[keys[i]].Volume);
                }
                //console.log(vol, ahead);
                if (rawData[aheadkey].Type === 'Bid' && vol > 0) {
                  console.log("bolume: ", vol)
                    // that.setState({
                    //     placeholderBid: `${vol}`,
                    //     placeholderAsk: "",
                    //     queuePosition: ahead,
                    // });
                    placeholderAsk = "";
                    placeholderBid = `${vol}`;
                    queuePosition = ahead;

                } else {
                  if (vol > 0){
                    console.log("bolume: ", vol)
                    // that.setState({
                    //     placeholderBid: "",
                    //     placeholderAsk: `${vol}`,
                    //     queuePosition: ahead,
                    // });
                    placeholderAsk = `${vol}`;
                    placeholderBid = "";
                    queuePosition = ahead;
                  }
                }
                if (inAuction){
                  // TODO add this
                  // this.props.reportChange({strike: this.props.Strike, isUser: true, newValue: vol, orderType: rawData[aheadkey].Type});
                } else {
                  // TODO add this
                  //this.props.reportChange({strike: this.props.Strike, isUser: true, newValue: vol, orderType: rawData[aheadkey].Type, delay: true});
                }
            } else {
                // that.setState({
                //     placeholderBid: "",
                //     placeholderAsk: ""
                // })
                if (inAuction){
                  // TODO add this
                  // this.props.reportChange({strike: this.props.Strike, isUser: true, newValue: 0, orderType: "Bid"});
                  // this.props.reportChange({strike: this.props.Strike, isUser: true, newValue: 0, orderType: "Ask"});
                } else {
                  // TODO add this
                  // this.props.reportChange({strike: this.props.Strike, isUser: true, newValue: 0, orderType: "Bid", delay: true});
                  // this.props.reportChange({strike: this.props.Strike, isUser: true, newValue: 0, orderType: "Ask", delay: true});
                }
            }
            orderbookRow.bids = placeholderBid;
            orderbookRow.asks = placeholderAsk;
            orderbookRow.strike = Strike;
            orderbook.appendChild(orderbookRow);

        })
      }

      var globalTimeseries = [];
      function renderPlot(){
        let canRender = true;
        let renderLoop = setInterval(()=>{ canRender = true; }, 1000);
        const validatePoint = function (newpt) {
            if (newpt.price === 0) {
                return false;
            }
            let theTime = new Date(newpt.time);
            if (theTime.getUTCHours() > 16) {
                return false;
            } else if (theTime.getUTCHours() === 16 && theTime.getUTCMinutes() >= 1) {
                return false;
            } else if (theTime.getUTCHours() < 9) {
                return false;
            } else if (theTime.getUTCHours() === 9 && theTime.getUTCMinutes() < 30) {
                return false;
            }
            return true;
        };

        let newItems = false;

        let timeseriesRef = db.child("Sessions").child(sessionid).child("TimeSeries");     
          // Ah, here's the rub.  We just throw the "MarketVWAP" calculation in the DB here     - Nathan Bendich,   May 12, 2022.
          // But there are still a few questions: where should/is the actual VWAP calculation done?   Should it be in the "pnt" variable or in the database, or?     I think within "Sessions", the value should be stored s.t. "el.VWAP" in Line.js ends up being what we graph

        timeseriesRef.on('child_added', snap => {
            if (!newItems) return;
            let pnt = snap.val();
            //console.log("added", pnt);
            let pointHandler = function (newpt) {
                //console.log(theTime.toUTCString());
                //console.log("point handler called");
                if (!validatePoint(newpt)) {
                    //console.log("invalid",newpt);
                    return null;
                }
                //const timeseries = globalTimeseries;
                //timeseries.push(newpt);
                globalTimeseries.push(newpt);
                //console.log("updated with",newpt);
                // self.setState({
                //     timeseries: timeseries
                // })
                //self.props.passPoint(newpt);
            };
            pointHandler(pnt);
        }); //end the child_added
        timeseriesRef.once('value', snap => {  // NOTE:  we've seen this "once()" function elsewhere; is it a function only defined in TraderEx?    -nxb,  June 4, 2022
            //console.log("loading values once only!!");
            newItems = true;
            let timeseries = globalTimeseries;
            snap.forEach(pnt => {
                if (!validatePoint(pnt)) {
                    return null;
                } else {
                    timeseries.push(pnt.val());
                }
            });
            // self.setState({
            //     timeseries: timeseries
            // });
            globalTimeseries = timeseries;
            console.log(globalTimeseries)
            if (timeseries.length > 0){
              //self.props.passPoint(timeseries[timeseries.length-1]);
            }

            renderPlot2(globalTimeseries);
        });//end the once() func


        //TODO:hopefully this doesnt break it
        // var trace1 = {
        // 	x: [],
        // 	y: [],
        // 	type: 'scatter'
        // };
        //
        // var trace2 = {
        // 	x: [],
        // 	y: [],
        // 	type: 'scatter'
        // };


        //THIS ONE WORKS
        // for (var i=0; i<timeseries1.length; i++) {
        //     pointHandler(timeseries1[i]);
        // }

        // for (var i=0; i<timeseries2.length; i++) {
        //   trace2.x.push(timeseries2[i]["time"]);
        //   trace2.y.push(timeseries2[i]["price"]);
        // }

      }

      let plotState = {
        trace1: {
            close: [],
            high: [],
            low: [],
            open: [],
            time: []
        },
        numPoints: 0
    };
    const globalSecondsPerCandle = 1800; //plotself.secondsPerCandle;
      function renderPlot2(timeseries){
        let getXRange = function (trace) {
          //console.log(trace);
          if (!trace || trace.time.length === 0) {
              return [0, 1];
          } else {
              return [0, trace.time.length - 1];
          }
      };
      let getYRange = function (trace) {
          if (!trace || trace.time.length === 0) {
              return [10, 30];
          } else {
              return [trace.low.reduce( (a, b) => parseFloat(a) <= parseFloat(b) ? a : b),
                      trace.high.reduce((a, b) => parseFloat(a) >= parseFloat(b) ? a : b)];
          }
      };
      let getXSlide = function (trace) {
          if (!trace || trace.time.length === 0) {
              return {range: [0, 1]};
          } else {
              return {range: [Math.max(0, trace.time.length - 11), trace.time.length - 1]};
          }
      };

      let handlePoints = function (points) {

          const needsNewCandle = function (point, currentCandle) {
              let nextTime = new Date(point.time);
              if (!currentCandle || new Date(currentCandle.time).toJSON().substr(0, 10) !== nextTime.toJSON().substr(0, 10)) {
                  let price = parseFloat(parseFloat(point.price).toFixed(2));
                  let now = new Date(point.time).getTime();
                  let newCurrentCandle = {
                      time: new Date(now).toJSON(),
                      open: price,
                      close: price,
                      high: price,
                      low: price,
                  };
                  return [newCurrentCandle];

              }
              let now = new Date(point.time).getTime();
              let then = new Date(currentCandle.time).getTime();
              //Decides if needs new candle
              const secondsPerCandle = globalSecondsPerCandle; //plotself.secondsPerCandle;
              const cutOff = new Date(then);
              cutOff.setSeconds(cutOff.getSeconds() + secondsPerCandle);
              if (now < cutOff.getTime() || nextTime.getUTCHours() >= 16) { //listen for 4pm here!
                  return false;
              }
              else {
                  //Generate Empty Candles
                  let numCandles = parseInt(Math.floor((now - then) / (secondsPerCandle * 1000)), 10);
                  let candles = [];
                  if (numCandles > 1) {
                      let emptyCandle = {
                          time: null,
                          high: currentCandle.close,
                          low: currentCandle.close,
                          open: currentCandle.close,
                          close: currentCandle.close,
                      };
                      for (let i = 1; i < numCandles; i++) {
                          candles.push(JSON.parse(JSON.stringify(emptyCandle)));
                          candles[i - 1].time = new Date(then + i * (secondsPerCandle * 1000)).toJSON();
                      }
                  }
                  let price = parseFloat(parseFloat(point.price).toFixed(2));
                  let newCurrentCandle = {
                      time: new Date(then + numCandles * (secondsPerCandle * 1000)).toJSON(),
                      open: price,
                      close: price,
                      high: price,
                      low: price,
                  };
                  candles.push(newCurrentCandle);
                  return candles;
              }
          };

          const mergePoint = function (point, currentCandle) {
              const price = parseFloat(point.price);
              const prettyPrice = parseFloat(price.toFixed(2));
              currentCandle.close = prettyPrice;
              if (price < currentCandle.low) {
                  currentCandle.low = prettyPrice;
              }
              else if (price > currentCandle.high) {
                  currentCandle.high = prettyPrice;
              }
              return JSON.parse(JSON.stringify(currentCandle));
          };

          //TODO: is this used?  const currentLength = this.state.trace1.time.length;
          const currentTrace = plotState.trace1;
          let currentNumPoints = plotState.numPoints;

          const getCurrentCandle = function (trace) {
              const length = trace.time.length;
              if (length === 0) {
                  return null;
              }
              return {
                  time: trace.time[length - 1],
                  low: trace.low[length - 1],
                  high: trace.high[length - 1],
                  close: trace.close[length - 1],
                  open: trace.open[length - 1]
              };
          };
          const currentCandle = getCurrentCandle(currentTrace);

          //start point loop here set state after all processing
          for (let j = 0; j < points.length; j++) {
              const point = points[j];
              const isNew = needsNewCandle(point, getCurrentCandle(currentTrace));
              if (!!isNew) {
                  //append new candle
                  for (let k = 0; k < isNew.length; k++) {
                      currentTrace.time.push(isNew[k].time);
                      currentTrace.close.push(isNew[k].close);
                      currentTrace.open.push(isNew[k].open);
                      currentTrace.high.push(isNew[k].high);
                      currentTrace.low.push(isNew[k].low);
                  }
                  currentNumPoints += 1;
              } else {
                  currentNumPoints += 1;
                  const updateCandle = mergePoint(point, getCurrentCandle(currentTrace));
                  currentTrace.time.pop();
                  currentTrace.time.push(updateCandle.time);
                  currentTrace.close.pop();
                  currentTrace.close.push(updateCandle.close);
                  currentTrace.high.pop();
                  currentTrace.high.push(updateCandle.high);
                  currentTrace.low.pop();
                  currentTrace.low.push(updateCandle.low);
                  currentTrace.open.pop();
                  currentTrace.open.push(updateCandle.open);
              }
          }
          plotState = {trace1: currentTrace, numPoints: currentNumPoints};
          updatePlot(plotState);

      };
      //const timeseries = globalTimeseries;
      handlePoints(timeseries);
      }

      function updatePlot(currentPlotState){
        //console.log("Plot componentWillUpdate " + nextProps + " " + nextState);
        //TODO: fix error where get Range is null array
        //console.log(nextState); //neither is null
        //console.log(nextState.trace1);
        const newTrace = Object.assign(currentPlotState.trace1, {
            x: Array(currentPlotState.trace1.time.length).fill().map((_, i) => i),
            decreasing: {line: {color: 'red'}},
            increasing: {line: {color: 'green'}},
            line: {color: 'rgba(31,119,180,1'},
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y'
            //hoverinfo: 'skip'
        });
        const data = [newTrace];
        console.log(newTrace);
        let wdth = 10 //document.querySelector('.graph-div').clientWidth;
        let hght = 10 //document.querySelector('.graph-div').clientHeight;
//         const layout = {
//             autosize: false,
//             height: hght-34-15,
//             width: wdth-30,
//             dragmode: 'pan',
//             margin: {
//                 r: 1,
//                 t: 5,
//                 b: 80,
//                 l: 34
//             },
//             showlegend: false,
//             xaxis: {
//                 autorange: true,
//                 zoom: true,
//                 showticklabels:true,
// //              //fixedrange: true,
//                 domain: [0, 1],
//                 range: this.getXRange(currentPlotState.trace1),//this is null
//                 autorange:true,
//                 rangeslider: Object.assign(this.getXSlide(currentPlotState.trace1), {visible:false}),
//                 type: 'linear',
//                 tickmode: "array",
//                 tickfont: {size:14},
//                 tickvals: Array(currentPlotState.trace1.time.length).fill().map((_, i) => i),
//                 ticktext: currentPlotState.trace1.time.map((stamp, i) => {
//                     const numCandlesPerDay = 23400 / globalSecondsPerCandle;
//                     const d = new Date(stamp);
//                     if (i % numCandlesPerDay === 0) {
//                         return `OPEN ${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
//                     } else {
//                         let dnum = d.getUTCMinutes();
//                         if (dnum < 10) {
//                             dnum = '0' + dnum;
//                             return '';
//                         }
//                         return `${d.getUTCHours()}:${dnum}`;
//                     }
//                 })
//             },
//             yaxis: {
//                 autorange: true,
//                 domain: [0, 1],
//                 range: this.getYRange(currentPlotState.trace1), //so is this   (this is null too)
//                 //autorange: true,
//                 ticks:"",
//                 showticklabels:true,
//                 type: 'linear'
//             }
//         };
        //Plotly.newPlot('plot', data, layout, {displayModeBar: false});
        const apexData = newTrace.time.map((timestamp, index) => ({
          x: new Date(timestamp),
          y: [
            newTrace.open[index],
            newTrace.high[index],
            newTrace.low[index],
            newTrace.close[index],
          ]
        }));
        console.log(apexData);
        const options = {
          chart: {
            type: "candlestick",
            height: 320,
            background: "#1A1A1A",//"#1f2937", // Tailwind bg-gray-800
            toolbar: {
              show: false
            }
          },
          theme: {
            mode: "dark"
          },
          series: [{
            data: apexData
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
      }


      renderStats();
      renderOrderbook();
      renderPlot();
    }
});





