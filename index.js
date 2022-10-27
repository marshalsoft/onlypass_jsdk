const OnlyPass = (apiKey,merchantId,isDemo = true)=>{
  const UniqueID = (d,prefix = "")=> {
    var text = "";
    if(d == undefined)
    {
      d = 16;
    }else{
      d = parseInt(d);
    }
    var tm = new Date().getMilliseconds();
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < d; i++)
    {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return prefix+text;
  }
var BaseUrl = "https://api.onlypassafrica.com/api/v1/external/payments";
const APICall = async (
    body = {},
    url = BaseUrl)=>{
    var myHeaders = new Headers();
    myHeaders.append("x-api-key",apiKey);
    myHeaders.append("x-platform-id",merchantId);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var requestOptions = {
      method:'POST',
      headers:myHeaders,
      redirect:'follow',
      body:JSON.stringify(body)
    };
    var response = await fetch(url, requestOptions)
    const data = await response.json()
    return data;
}
const ModalScreen = ()=>{
// var Modal = $("<div >",{id:"mID",width:"100%",height:"100%",display:"flex",backgroundColor:"red"});
// $("#mID").html(Modal).show();
}
const PayWithPaystack = (gateWayObj)=>{
  const d = {
    key:`${gateWayObj.publicKey}`,
    email:`${gateWayObj.email}`,
    amount:parseInt(gateWayObj.amountToPay)*100,
    currency:`${gateWayObj.currency}`,
    ref:`${gateWayObj.onlyPassReference}`,
    callback:function(response) {
      // callback(response)
    },
    onClose: function() {
      // callback(null)
    }
  }
 var handler = window.PaystackPop.setup(d);
  handler.openIframe();
  // alert(JSON.stringify(d))
 }
const PayWithFlutterwave = (gateWayObj)=>
 {
   var d = {
    public_key:`${gateWayObj.publicKey}`,
    tx_ref:`${gateWayObj.onlyPassReference}`,
    amount:gateWayObj.amountToPay,
    currency:`${gateWayObj.currency}`,
    country: "NG",
    payment_options:"card,mobilemoney,ussd,banktransfer,paga,qr,mpesa,account",
    redirect_url:'',
      meta: {},
      customer: {
      email:`${gateWayObj.email}`
      },
      callback: function (data) {
        
      },
      onclose: function() {

      }
    }
    // alert(JSON.stringify(d));
    FlutterwaveCheckout(d);
    // ModalScreen()
 }
const AddHeader = ()=>{
  const jq = document.createElement("script");
    jq.setAttribute("src","https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js")
    const paystack = document.createElement("script");
    paystack.setAttribute("src","https://js.paystack.co/v1/inline.js")
    const flutterwave = document.createElement("script");
    flutterwave.setAttribute("src","https://checkout.flutterwave.com/v3.js")
    const monnify = document.createElement("script");
    monnify.setAttribute("src","https://checkout.flutterwave.com/v3.js")
    const voguepay = document.createElement("script");
    voguepay.setAttribute("src","//pay.voguepay.com/js/voguepay.js")
    const modal = document.createElement("div");
    modal.setAttribute("id","mID")
    modal.style.display = "none";
    modal.style.width = "95%";
    modal.style.height = "95%";
    modal.style.position = "absolute";
    modal.style.margin = "2.5%";
    modal.setAttribute("class","card");
    window.onload = function() {
    document.body.prepend(jq);
    document.body.prepend(paystack);
    document.body.prepend(flutterwave);
    document.body.prepend(monnify);
    document.body.prepend(voguepay);
    document.body.appendChild(modal);
    return null;
    }
}
  const InitPayment = async()=>{
    AddHeader();
    const ch = await APICall({},BaseUrl+"/channels");
    return ch
  }
  
  const PayNow = async(
    amount = 0,
    memo = "",
    gatewayId = "1",
    email = "",
    phone_number = "",
    gatewayName = "Paystack",
    currency = "NGN",
    publicKey = "",
    callback = ()=>{}
   )=>{
   let refNo = UniqueID(20,"OnlyP-");
   let gateWayObj = {}
   const res = await APICall({
           gatewayId:gatewayId,
           externalReference:refNo,
           amount:amount,
           isDemo:isDemo
     })
    
     if(res.status)
       {
       gateWayObj = Object.assign(res.data,{
         gatewayId:"",
         externalReference:refNo,
         amount:amount,
         isDemo:isDemo,
         amount:amount,
         memo:memo,
         email:email,
         phone_number:phone_number,
         currency:currency,
         gatewayName:String(gatewayName).toLowerCase(),
         publicKey:publicKey
       })
       console.log("PayNow:",gateWayObj)
       if(gateWayObj.gatewayName == "paystack")
       {
         PayWithPaystack(gateWayObj);
       }
       if(gateWayObj.gatewayName == "flutterwave")
       {
       PayWithFlutterwave(gateWayObj);
       }
     }
    //  callback(gateWayObj);
   }
   InitPayment();
  return {
    PayNow,
    Channels:()=>InitPayment()
  }
}
export default OnlyPass;
