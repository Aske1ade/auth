const getConversionRate = async (fromCurrency, toCurrency) => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      return data.rates[toCurrency];
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
      throw error;
    }
  };
  
  export default getConversionRate;
  