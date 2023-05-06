## ONLYPASS PAYMENT SDK

### INSTALLATION
```
npm i onlypass-sdk;
```
### USAGE
```
import OnlyPass from 'onlypass-sdk';
```
- **onlypas api key** - This can be gotten from Onlypass dashboard setting section
- **Platform ID** - This can be gotten from Onlypass dashboard setting section
- **isDemo** - default is true
- create html form with the following input fields (amount,email,phoneNumber)
- initialize Onlypass inside the constructor function with the following paraments OnlyPass("onlypas api key","Platform ID","formId",isDemo,webhookUrl)
```
<form id="formId" >
<input name="amount" type="number" />
<input name="email"  type="text" />
<input name="phoneNumber" type="text" />
</form>

constructor()
{
OnlyPass("onlypas api key","Platform ID","formId",isDemo,webhookUrl);
}

```
