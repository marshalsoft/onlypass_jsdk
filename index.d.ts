declare const OnlyPass: (apiKey: string, merchantId: string) => {
    PayNow: (amount?: number, memo?: string, isDemo?: boolean, gatewayId?: string, email?: string, phone_number?: number, gatewayName?: string, currency?: string, publicKey?: string, callback?: () => void) => Promise<void>;
    Channels: () => Promise<any>;
};
export default OnlyPass;
