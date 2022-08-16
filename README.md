## ONLYPASS PAYMENT SDK

## INSTALLATION
```
npm i onlypass-sdk;
```
## USAGE
```
import OnlyPass from 'onlypass-sdk';
const OnlyPassInstance = OnlyPass("onlypas api key","merchant ID");

// get the list of payment channels

OnlyPassInstance.Channels().then(({data,status})=>{
    
    if(status)
    {
    var channel = data[0];
    // call payment function
    OnlyPassInstance.PayNow(
        2000,
        "Payment for shoes",
        true,
        channel.gatewayId,
        "me@onlypass.com",
        "08161235924",
        "flutterwave",
        "NGN",
        channel.publicKey)
    }
})
```