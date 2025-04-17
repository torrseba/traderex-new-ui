// app.js

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
  