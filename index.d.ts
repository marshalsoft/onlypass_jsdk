declare module 'onlypass-sdk' {
    interface Gateway {
         merchantPaymentGatewayId: number;
         merchantId: number;
         gatewayId: number;
         publicKey: string;
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
 const OnlyPass:(apiKey: string, merchantId: string) => {
     PayNow:(
         amount?: number, 
         memo?: string, 
         isDemo?: boolean, 
         gatewayId?: number, 
         email?: string, 
         phone_number?: string, 
         gatewayName?: string, 
         currency?: string, 
         publicKey?: string, 
         callback?: () => void) => Promise<any>;
         Channels: () => Promise<APIResponse>;
 }
 export default OnlyPass;
 }
