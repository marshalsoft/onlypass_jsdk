declare module 'onlypass-sdk' {
    interface Gateway {
         merchantPaymentGatewayId: number;
         merchantId: number;
         gatewayId: number;
         livePublicKey: string;
         testPublicKey: string;
         status: string;
         createdAt: string;
         updatedAt: string;
         gateway: {
             gatewayId: number;
             name: string;
             className: string;
             logoUrl: string;
             status: string;
             createdAt: string;
             updatedAt: string;
         };
     }
interface GateWayList extends Array<Gateway>{}
     interface APIResponse {
         data:GateWayList,
         status?:boolean,
         message?:string
     }
 const OnlyPass:(apiKey: string, merchantId: string, isDemo?: boolean) => {
     PayNow:(
         amount?: number, 
         memo?: string, 
         email?: string, 
         phone_number?: string, 
         firstName?: string, 
         lastName?: string, 
         gatewayName?: string, 
         currency?: string) => Promise<any>;
 }
 export default OnlyPass;
 }
