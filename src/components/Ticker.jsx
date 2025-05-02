import React, { useEffect } from "react";

const Ticker = () => {
  useEffect(() => {
    // Check if the script already exists to prevent duplicates
    if (!document.querySelector(".tradingview-widget-script")) {
      // Dynamically create the script tag
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.async = true;
      script.className = "tradingview-widget-script"; // Add a class to identify the script
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
          { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
          { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
          { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
          { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        ],
        showSymbolLogo: true,
        isTransparent: true,
        displayMode: "regular",
        colorTheme: "light",
        locale: "en",
      });

      // Append the script to the widget container
      const container = document.querySelector(".tradingview-widget-container__widget");
      if (container) {
        container.appendChild(script);
      }
    }
  }, []);

  return (
    <>
      <div className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </>
  );
};

export default Ticker;