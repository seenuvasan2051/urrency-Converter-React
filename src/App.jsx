import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState("");

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        console.log(response);
        setExchangeRate(response.data.rates[toCurrency]);
      } catch (error) {
        console.log("Unable to fetch from API ", error);
      }
    };
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <>
      <div className="main-container">
        <div className="currencyConverter">
          <div className="box"></div>
          <div className="inside-container">
            <h1>CURRENCY CONVERTER</h1>
            <div className="inputs">
              <label htmlFor="amount">Amount : </label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            <div className="inputs">
              <label htmlFor="fromCurrency"> From Currency : </label>
              <select
                id="fromCurrency"
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
              >
                <option value="USD"> USD - United States Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
            <div className="inputs">
              <label htmlFor="toCurrency"> To Currency : </label>
              <select
                id="toCurrency"
                value={toCurrency}
                onChange={handleToCurrencyChange}
              >
                <option value="USD"> USD - United States Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
            <div className="results">
              <p>
                {amount} {fromCurrency} is equal to {convertedAmount} 
                {" "}{toCurrency}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
