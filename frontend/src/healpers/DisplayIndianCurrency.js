
// display the currency  with  currency symbol
const DisplayIndianCurrency=(number)=>{
    const formater=new Intl.NumberFormat('en-IN',{
        style:"currency",
        currency:'INR',
        minimumFractionDigits:2
    })
    return formater.format(number)

}

export default DisplayIndianCurrency