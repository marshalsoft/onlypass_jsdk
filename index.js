const env = "test";
// (function(){
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
const ThrowError = (msg)=>{
  throw new Error(msg);
}
window.BaseUrl = "https://api.onlypassafrica.com/api/v1/external/payments";
if(env == "test")
{
  window.BaseUrl = String(window.BaseUrl).replace("api.","devapi.");
}
const APICall = (
    body = {},
    url,method = "POST")=>{
    return new Promise((resolve)=>{
    const returnParams = (url)=>{
      let params = url;
      return params;
    }
    var myHeaders = new Headers();
    if(String(method).toUpperCase() == "GET")
  {
  url = returnParams(window.BaseUrl+url);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("x-api-key", apiKey);
  myHeaders.append("x-platform-id", merchantId);
  window.apiKey = apiKey;
  window.merchantId = merchantId;
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch(url, requestOptions).then((res)=>res.json()).then((res)=>{
  resolve(res);
  })
    }else{
    myHeaders.append("x-api-key",apiKey);
    myHeaders.append("x-platform-id",merchantId);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var requestOptions = {
      method:method,
      headers:myHeaders,
      redirect:'follow',
      body:JSON.stringify(body)
    };
    fetch(url, requestOptions).then((res)=>res.json()).then((res)=>{
    resolve(res);
    }).catch((res)=>{
      resolve(res);
    })
  }
    })
}
const ModalScreen = ()=>{

}
const AbortCalll = async(formObj)=>{
  await APICall({},`${window.BaseUrl}/${formObj.onlyPassReference}`,"PUT");
}
 const PayWithSquad = (gateWayObj)=>{
  const squadInstance = new squad({
    onClose: () =>{
      AbortCalll(gateWayObj);
     },
    onLoad: () => { },
    onSuccess: (response) =>{ },
    key: `${gateWayObj.publicKey}`,
    email:`${gateWayObj.email}`,
    amount:parseInt(gateWayObj.amount)*100,
    currency_code:`${gateWayObj.currency}`,
    transaction_ref:`${gateWayObj.onlyPassReference}`,
    payment_channels:['card', 'bank' , 'ussd','bank_transfer'],
    Customer_name:"client"
});
squadInstance.setup();
squadInstance.open();
 }
 const PayWithBani = (gateWayObj)=>{
 const sendQuery = {
  amount:parseInt(gateWayObj.amount), 
  phoneNumber:`+234${parseInt(gateWayObj.phone_number)}`,
  email:`${gateWayObj.email}`,
  firstName:`${gateWayObj.firstname}`,
  lastName:`${gateWayObj.lastname}`, 
  merchantKey:`${gateWayObj.publicKey}`, 
  metadata: "", 
  onClose: (response) => {
      console.log("ONCLOSE DATA",response)
      AbortCalll(gateWayObj);
  },
  callback: function (response) {
      let message = 'Payment complete! Reference: ' + response?.reference
      console.log(message, response)
  }
}
console.log(sendQuery);
  BaniPopUp(sendQuery);
 }
const AddHeader = ()=>{
  return new Promise((resolve)=>{
  var gatewaylist = [];
  gatewaylist.push("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js");
  gatewaylist.push("https://js.paystack.co/v1/inline.js");
  gatewaylist.push("https://checkout.flutterwave.com/v3.js");
  gatewaylist.push("https://checkout.squadco.com/widget/squad.min.js");
  gatewaylist.push("https://bani-assets.s3.eu-west-2.amazonaws.com/static/widget/js/window.js");
    const modal = document.createElement("div");
    modal.setAttribute("id","mID")
    modal.style.display = "none";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.position = "fixed";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.backgroundColor = "rgba(0,0,0,0.4)";
    modal.style.top = "0px";
    modal.style.left = "0px";
    window.onload = function(){
    document.body.appendChild(modal);
      gatewaylist.forEach((a,i)=>{
        const jq = document.createElement("script");
        jq.setAttribute("src",a);
        document.body.prepend(jq);
      })
   
    const onlyIframe = document.createElement("IFRAME");
      onlyIframe.style.position = "fixed";
      onlyIframe.style.top = "0px";
      onlyIframe.style.left = "0px";
      onlyIframe.style.width = "100%";
      onlyIframe.style.height = "100%";
      onlyIframe.style.background = "white";
      onlyIframe.style.border = "0px";
      onlyIframe.style.display = "none";
      onlyIframe.setAttribute("id","onlyIframe");
      document.body.appendChild(onlyIframe)
    const scp = document.createElement("script");
    scp.innerHTML = `function toggle(i){
      const allBtns = document.querySelectorAll(".onlypass_btn");
      allBtns.forEach((a,o)=>{
        const wrp = document.getElementById("option"+o);
        const visible = wrp.style.display;
        wrp.style.display = i == o?visible == "block"?"none":"block":"none";
      })
    }
    function toggleClose(d,i){
      const wrp = document.getElementById("option"+i);
      wrp.style.display = "none";
      const obj = convertHexToBinary(d.value);
      window.PaymentObj = obj;
      const data = Object.assign(obj,{
        email:email.value,
        amount:amount.value,
        phone_number:phone_number.value
      })
      
    }
    function convertBinaryToHex(s){
      s = JSON.stringify(s);
      var i;
      var l;
      var o = '';
      var n;
      s += '';
      for (i = 0, l = s.length; i < l; i++) {
          n = s.charCodeAt(i).toString(16);
          o += n.length < 2 ? '0' + n : n;
      }
      return o;
}
function convertHexToBinary(hex){
      var string = '';
      for (var i = 0; i < hex.length; i += 2) {
          string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      return JSON.parse(string);
}

function OnlyPassInit(data){
  return new Promise((resolve)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("x-api-key",window.apiKey);
    myHeaders.append("x-platform-id", window.merchantId);
    var raw = JSON.stringify({
      "amount":data.amount,
      "isDemo":window.isDemo,
      "channelIdentifier":window.PaymentObj.mode.channelIdentifier,
      "externalReference": UniqueID(34,"ONP-"),
      "gatewayId": window.PaymentObj.gatewayId,
      "merchantPaymentGatewayId": window.PaymentObj.merchantPaymentGatewayId,
      "userEmail":data.email
    });
    const options = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    }
    fetch(window.BaseUrl,options).then((res)=>res.json()).then((res)=>{
    resolve(res)
  })
  })
}
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
const PayWithSquad = (data)=>{
  const squadInstance = new squad({
    onClose: () =>{
      AbortCalll(data.refNo);
     },
    onLoad: () => { },
    onSuccess: (response) =>{ },
    key:window.PaymentObj.credentials[0].value,
    email:data.email,
    amount:data.amount * 100,
    currency_code:data.currency,
    transaction_ref:data.refNo,
    payment_channels:['card', 'bank' , 'ussd','bank_transfer'],
    Customer_name:"client"
});
console.log("Squad",squadInstance);
squadInstance.setup();
squadInstance.open();
 }
 const PayWithBani = (data)=>{
 const sendQuery = {
  amount:data.amount, 
  phoneNumber:"+234"+parseInt(data.mobile),
  email:data.email,
  firstName:data.firstName,
  lastName:data.lastName, 
  merchantKey:window.PaymentObj.credentials[0].value, 
  metadata: "", 
  onClose: (response) => {
      console.log("ONCLOSE DATA",response)
      AbortCalll(data.refNo);
  },
  callback: function (response) {
      let message = 'Payment complete! Reference: ' + response?.reference
      console.log(message, response)
  }
}
console.log(sendQuery);
  BaniPopUp(sendQuery);
 }
 const AbortCalll =(onlyPassReference)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("x-api-key",window.apiKey);
  myHeaders.append("x-platform-id", window.merchantId);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch('${window.BaseUrl}/'+onlyPassReference, requestOptions)
 }
function CallPayment(d){
  const paymentObj = convertHexToBinary(d);
  window.PaymentObj = paymentObj;
  console.log(paymentObj,window.paymentParams);
  let data = {
        amount:window.paymentParams.amount,
        isDemo:window.isDemo,
        channelIdentifier:paymentObj.mode.channelIdentifier,
        externalReference:window.paymentParams.refNo,
        gatewayId: window.PaymentObj.gatewayId,
        merchantPaymentGatewayId: window.PaymentObj.merchantPaymentGatewayId,
        email:window.paymentParams.email
  }
  OnlyPassInit(data).then((res)=>{
    console.log(res)
     data = Object.assign(data,{
      amount:res.data.amountToPay,
      firstName:window.paymentParams.firstName,
      lastName:window.paymentParams.lastName,
      mobile:window.paymentParams.mobile,
      currency:window.paymentParams.currency,
      refNo:window.paymentParams.refNo
     });
    if(!res.status)
    {
      alert(res.message);
    }else if(res.data.securePaymentUrl)
    {
      const ifrm = document.getElementById("onlyIframe");
      ifrm.setAttribute("src",res.data.securePaymentUrl);
      ifrm.style.display = "block";
    }else if(String(window.PaymentObj.gateway.name).toLowerCase() == "bani")
    {
      PayWithBani(data);
    }else if(String(window.PaymentObj.gateway.name).toLowerCase() == "squad")
    {
      PayWithSquad(data);
    }
  })
}`

  document.head.appendChild(scp);
  InitPayment();
  resolve(null);
    }
    })
}

const InitPayment = (isDemo = true)=>{
    return APICall({},`/channels?isDemo=${isDemo}`,"GET").then((res)=>{
      console.log(res)
      if(res.status)
      {
        
        let buttons = `<div style="padding:5px;background: #e8e8e8;
        border: solid 1px #d5d4d4;border-radius: 5px;position:relative;display: inline-flex;
        gap: 5px;">`;
        console.log(buttons);
        res.data.forEach((a,i)=>{
            buttons += `<div class="onlypass_btn" style="z-index:9999;">
            <button 
            type="button"
            onclick="toggle('${i}')"
            style="border: solid 1px #999;
            padding: 10px 20px;
            border-radius: 5px;
            overflow: hidden;
            background: #211666;
            color:white;
            font-weight:bold;
            width:120px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor:pointer;
            "
            >
           ${a.gateway.name}
           <img src="images/caret-down.png" style="width:10px;object-fit:cover;margin-left:10px;" /> 
            </button>
            <div id="option${i}" style="display:none;position:absolute;
            top:46px;
            background:white;
            border:solid 1px #444;
            border-radius: 0px 0px 5px 5px;
            padding:15px;z-index:999;">
            <ul style="padding:0px;margin:0px;" >
            ${a.gateway.modes.map((b,o)=>{
              return `<li
              onclick="CallPayment('${convertBinaryToHex(Object.assign(a,{mode:b}))}')"
              style="display:flex;align-items:center;margin-bottom: 10px !important;cursor:pointer;padding:5px 10px;"
              >
              ${String(b.channel).replace("_"," ")}
              </li>`;
            }).join("")}
            </ul>
            </div>
            </div>
            `
        })
        buttons += "</div>";
        window.OnlyPassButtons = buttons;
        window.isDemo = isDemo;
      }
    });
}
const convertBinaryToHex = (s)=>{
        s = JSON.stringify(s);
        var i;
        var l;
        var o = '';
        var n;
        s += '';
        for (i = 0, l = s.length; i < l; i++) {
            n = s.charCodeAt(i).toString(16);
            o += n.length < 2 ? '0' + n : n;
        }
        return o;
}
 const convertHexToBinary = (hex)=>{
        var string = '';
        for (var i = 0; i < hex.length; i += 2) {
            string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return JSON.parse(string);
}
window.addEventListener("message",({data})=>{
  const ifrm = document.getElementById("onlyIframe");
  if(data.event)
  {
    if(data.event == "close")
    {
      ifrm.style.display = "none";
    }else if(data.event == "success")
    {
     
    }
  }
})
const PayNow = async(
    amount = 0,
    memo = "",
    email = "",
    phone_number = "",
    firstName = "",
    lastName = "",
    currency = "NGN"
   )=>{
   let refNo = UniqueID(20,"OnlyPass-");
   if(!amount || typeof amount != "number")
   {
    ThrowError("A valid amount is required.")
   }else if(!memo)
   {
    ThrowError("memo is required.")
  }else if(!email || !(String(email).includes("@") && String(email).includes(".")))
  {
   ThrowError("A valid email is required.")
}else if(!phone_number  || String(phone_number).length < 11)
{
 ThrowError("A valid mobile number is required.")
}else if(!firstName)
{
 ThrowError("First name is required.")
}else if(!lastName)
{
 ThrowError("Last name is required.")
}else if(!currency)
{
 ThrowError("A valid currency is required.")
}else{
  const modal = document.getElementById("mID");
  modal.innerHTML = window.OnlyPassButtons;
  modal.style.display = "flex";
  window.paymentParams = Object.assign({
    amount:amount,
    firstName:firstName,
    lastName:lastName,
    email:email,
    mobile:phone_number,
    memo:memo,
    refNo:refNo,
    currency:currency
  })
}
 }
   window.OnlyPass = {
    PayNow:PayNow
   }
   AddHeader();
}

export default OnlyPass = {
  PayNow:PayNow
};
// window.OnlyPass = OnlyPass("pk_895a1c4e-602f-4065-9c5c-2d23c7fd202a","40835105",true);
// })(window)


