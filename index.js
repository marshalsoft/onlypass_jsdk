const env = "test";
// (function(){
const OnlyPass = (apiKey,merchantId,formId = null,isDemo = true,webhookUrl = "")=>{
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
    amount:parseInt(gateWayObj.amountToPay)*100,
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
  amount:parseInt(gateWayObj.amountToPay), 
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
  gatewaylist.push("https://checkout.flutterwave.com/v3.js");
  gatewaylist.push("https://pay.voguepay.com/js/voguepay.js");
  gatewaylist.push("https://checkout.squadco.com/widget/squad.min.js");
  gatewaylist.push("https://bani-assets.s3.eu-west-2.amazonaws.com/static/widget/js/window.js");
    const modal = document.createElement("div");
    modal.setAttribute("id","mID")
    modal.style.display = "none";
    modal.style.width = "95%";
    modal.style.height = "95%";
    modal.style.position = "absolute";
    modal.style.margin = "2.5%";
    modal.setAttribute("class","card");
    window.onload = function(){
      gatewaylist.forEach((a,i)=>{
        const jq = document.createElement("script");
        jq.setAttribute("src",a);
        document.body.prepend(jq);
      })
    document.body.appendChild(modal);
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
      const amount = document.getElementById("amount");
      const email = document.getElementById("email");
      const phone_number = document.getElementById("phone_number");
      if(!amount)
      {
        alert("Oops! input field with id 'amount' required");
        return;
      }
      if(!email)
      {
        alert("Oops! input field with id 'email' required");
        return;
      }
      if(!phone_number)
      {
        alert("Oops! input field with id 'phone_number' required");
        return;
      }
      if(amount.value == "" | email.value == "" | phone_number.value == "")
      {
        alert("Oops! some Input field are empty!");
        return;
      }
      
      const wrp = document.getElementById("option"+i);
      wrp.style.display = "none";
      const obj = convertHexToBinary(d.value);
      window.PaymentObj = obj;
      const data = Object.assign(obj,{
        email:email.value,
        amount:amount.value,
        phone_number:phone_number.value
      })
      OnlyPassInit(data).then((res)=>{
      if(!res.status)
      {
        alert(res.message);
      }else if(res.data.securePaymentUrl != "")
      {
        const ifrm = document.getElementById("onlyIframe");
        ifrm.setAttribute("src",res.data.securePaymentUrl);
        ifrm.style.display = "block";
      }else if(String(obj.gateway.name).toLowerCase() == "bani")
      {
        PayWithBani(data);
      }else if(String(obj.gateway.name).toLowerCase() == "squad")
      {
        PayWithSquad(data);
      }
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
      AbortCalll(data);
     },
    onLoad: () => { },
    onSuccess: (response) =>{ },
    key:window.PaymentObj.credentials[0].value,
    email:data.email,
    amount:parseInt(data.amount)*100,
    currency_code:"NGN",
    transaction_ref:UniqueID(20,"ONP-"),
    payment_channels:['card', 'bank' , 'ussd','bank_transfer'],
    Customer_name:"client"
});
squadInstance.setup();
squadInstance.open();
 }
 const PayWithBani = (data)=>{
 const sendQuery = {
  amount:parseInt(data.amountToPay), 
  phoneNumber:"+234"+parseInt(data.phone_number),
  email:data.email,
  firstName:"user",
  lastName:"user", 
  merchantKey:window.PaymentObj.credentials[0].value
  , 
  metadata: "", 
  onClose: (response) => {
      console.log("ONCLOSE DATA",response)
      // AbortCalll(data);
  },
  callback: function (response) {
      let message = 'Payment complete! Reference: ' + response?.reference
      console.log(message, response)
  }
}
console.log(sendQuery);
  BaniPopUp(sendQuery);
 }
 const AbortCalll =(d)=>{

 }
`
    document.head.appendChild(scp);
    InitPayment();
    resolve(null);
    }
    })
}

const InitPayment = (isDemo = true)=>{
    return APICall({},`/channels?isDemo=${isDemo}`,"GET").then((res)=>{
      console.log(res)
      if(formId !== null)
      {
        const form = document.getElementById(formId);
        if(form)
        {
          if(form.nodeName !== "FORM")
          {
            alert(`${formId} must be a form element`)
            return ;
          }
      if(res.status)
      {
        let buttonsWrapper = document.createElement("div");
        let buttons = `<div style="padding:5px;background: #e8e8e8;
        border: solid 1px #d5d4d4;border-radius: 5px;position:relative;display: inline-flex;
        gap: 5px;">
        <input required type="text" id="gateway_mode" name="gateway_mode" style="position:absolute;opacity:0;" />
        `;
        res.data.forEach((a,i)=>{
         
            buttons += `<div class="onlypass_btn" style="z-index:9999;">
            <button 
            type="button"
            onclick="toggle('${i}')"
            style="border: solid 1px #999;
            padding: 10px 20px;
            border-radius: 5px;
            overflow: hidden;
            background: white;font-weight:bold;"
            >
            <img src="${a.gateway.logoUrl}" style="width:30px;object-fit:cover;" /> ${a.gateway.name}
            </button>
            <div id="option${i}" style="display:none;position:absolute;
            top:46px;
            background:white;
            border:solid 1px #444;
            border-radius: 0px 0px 5px 5px;
            padding:15px;z-index:999;">
            <ul style="padding:0px;margin:0px;" >
            ${a.gateway.modes.map((b,o)=>{
              return `<li style="display:flex;align-items:center;margin-bottom: 10px !important;">
              <input value="${convertBinaryToHex(Object.assign(a,{mode:b}))}" id="channel${o}" type="radio" name="mode" onchange="toggleClose(this,'${i}')" style="height:18px;width: 18px;" />
              <label style="padding-left:5px;" for="channel${o}">${String(b.channel).replace("_"," ")}</label>
              </li>`;
            }).join("")}
            </ul>
            </div>
            </div>
            `
        })
        buttons += "</div>";
         buttonsWrapper.innerHTML = buttons;
         if(String(formId).includes("#"))
         {
          formId = String(formId).replace("#","");
         }
         window.isDemo = isDemo;
        form.appendChild(buttonsWrapper);
      }
      }
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
      if(webhookUrl != "")
      {
        ifrm.style.display = "none";
        var OnlPssHeaders = new Headers();
        OnlPssHeaders.append("Content-Type", "application/json");
        OnlPssHeaders.append("Accept", "application/json");
        var raw = JSON.stringify(data.data);
        var requestOptions = {
          method: 'POST',
          headers: OnlPssHeaders,
          body: raw,
          redirect: 'follow'
        };
        fetch(webhookUrl,requestOptions);
      }
    }
  }
})
  const PayNow = async(
    amount = 0,
    memo = "",
    gatewayId = "1",
    email = "",
    phone_number = "",
    firstname = "",
    lastname = "",
    gatewayName = "Paystack",
    currency = "NGN",
    publicKey = "",
    callback = ()=>{}
   )=>{
   let refNo = UniqueID(20,"OnlyPass-");
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
         firstname:firstname,
         lastname:lastname,
         currency:currency,
         gatewayName:String(gatewayName).toLowerCase(),
         publicKey:publicKey
       })
       console.log("PayNow:",gateWayObj)
       if(gateWayObj.gatewayName == "paystack")
       {
         PayWithPaystack(gateWayObj);
       }else if(gateWayObj.gatewayName == "flutterwave")
       {
       PayWithFlutterwave(gateWayObj);
      }else if(gateWayObj.gatewayName == "squad")
      {
        PayWithSquad(gateWayObj);
      }else if(gateWayObj.gatewayName == "bani")
      {
        PayWithBani(gateWayObj);
      }
     }
     
    //  callback(gateWayObj);
   }
   AddHeader()
   window.OnlyPass = {
    PayNow:PayNow
   }
}

export default OnlyPass;

// })(window)
