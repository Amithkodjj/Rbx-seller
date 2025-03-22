const libName = "CCPaymentLibs";
const libPrefix = "ccpaymentlibs_";

function setAppId(appId) {
    if (!appId) {
        throw libName + ": 'setAppId' require appId for setup";
    }
    Bot.setProperty(libPrefix + "appid", appId, "string");
}

function setAppSecret(appSecret) {
    if (!appSecret) {
        throw libName + ": 'setAppSecret' require appSecret for setup";
    }
    Bot.setProperty(libPrefix + "appsecret", appSecret, "string");
}

function getAppId() {
    const appId = Bot.getProperty(libPrefix + "appid", null);
    if (!appId) {
        throw libName + ": appId is not set. Please setup first";
    }
    return appId;
}

function getAppSecret() {
    const appSecret = Bot.getProperty(libPrefix + "appsecret", null);
    if (!appSecret) {
        throw libName + ": appSecret is not set. Please setup first";
    }
    return appSecret;
}

function validateParams(options, requiredParams) {
    for (const param of requiredParams) {
        if (!options.body[param]) {
            throw libName + ": '/" + options.path + "' requires options.body." + param;
        }
    }
}

function createTimestamp(threshold = 0) {
    return Math.floor(Date.now() / 1000) + threshold;
}

function apiCall(options) {
    options.headers = {
        "Content-Type": "application/json",
        "Accept": "application/json;charset=utf-8",
        ...options.headers
    }

    HTTP[options.method]({
        url: options.url,
        headers: options.headers,
        body: options.body,
        success: libPrefix + "onApiResponse " + options.onSuccess,
        error: libPrefix + "onApiError",
        ...options
    });
}

function onApiResponse() {
    const options = JSON.parse(content);
    Bot.runCommand(params, options);
}

function onApiError() {
    throw content;
}

class V1Api {
    constructor() {
        this.version = 1;
        this.baseUrl = "https://admin.ccpayment.com/ccpayment/v1/";
        this.payment = new V1PaymentAPI(this);
        this.wallet = new V1WalletAPI(this);
        this.withdrawal = new V1WithdrawalAPI(this);
        this.resources = new V1ResourcesAPI(this);
    }

    _SHA256(input) {
        return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
    }

    _post(options) {
        options.body = JSON.stringify(options.body) || "";

        const appId = getAppId();
        const appSecret = getAppSecret();
        const timestamp = createTimestamp();
        const signature = this._SHA256(appId + appSecret + timestamp + options.body);

        options.url = String(this.baseUrl + options.path);
        options.method = "post";
        options.headers = {};
        options.headers["Appid"] = appId;
        options.headers["Timestamp"] = timestamp;
        options.headers["Sign"] = signature;

        apiCall(options);
    }

    callPost(path, options, requiredParams) {
        options.path = path;
        validateParams(options, requiredParams);
        this._post(options);
    }
}

class V1PaymentAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    createHostedInvoice(options) {
        this.apiInstance.callPost("concise/url/get", options, ["product_price", "merchant_order_id", "product_name"]);
    }

    createNativeInvoice(options) {
        this.apiInstance.callPost("bill/create", options, ["product_price", "merchant_order_id", "token_id", "denominated_currency"]);
    }

    getInvoiceDetail(options) {
        this.apiInstance.callPost("bill/info", options, ["merchant_order_ids"]);
    }
}

class V1WalletAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    createPermanentAddress(options) {
        this.apiInstance.callPost("payment/address/get", options, ["user_id", "chain"]);
    }
}

class V1WithdrawalAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    createWithdrawal(options) {
        this.apiInstance.callPost("withdrawal", options, ["merchant_order_id", "address", "token_id", "value"]);
    }

    getWithdrawalDetail(options) {
        this.apiInstance.callPost("bill/info", options, ["merchant_order_ids"]);
    }
}

class V1ResourcesAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    getSupportedCoins(options) {
        this.apiInstance.callPost("coin/all", options, []);
    }

    calculateTokenRate(options) {
        this.apiInstance.callPost("token/rate", options, ["amount", "token_id"]);
    }

    getBalance(options) {
        this.apiInstance.callPost("assets", options, []);
    }

    getNetworkFee(options) {
        this.apiInstance.callPost("network/fee", options, ["token_id"]);
    }

    getBlockHeight(options) {
        this.apiInstance.callPost("get/network/height/info", options, []);
    }

    validateCWalletId(options) {
        this.apiInstance.callPost("check/user", options, ["c_id"]);
    }
}

class V2Api {
    constructor() {
        this.version = 2;
        this.baseUrl = "https://ccpayment.com/ccpayment/v2/";
        this.common = new V2CommonAPI(this);
        this.merchant = new V2MerchantAPI(this);
        this.walletSystem = new V2WalletSystemAPI(this);
    }

    _hmacSHA256(input, secretKey) {
        return CryptoJS.HmacSHA256(input, secretKey).toString(CryptoJS.enc.Hex);
    }

    _post(options) {
        options.body = JSON.stringify(options.body) || "";
        
        const appId = getAppId();
        const appSecret = getAppSecret();
        const timestamp = createTimestamp();
        const signature = this._hmacSHA256(String(appId + timestamp + options.body), appSecret);

        options.url = String(this.baseUrl + options.path);
        options.method = "post";
        options.headers = {};
        options.headers["Appid"] = appId;
        options.headers["Timestamp"] = timestamp.toString();
        options.headers["Sign"] = signature;

        apiCall(options);
    }

    callPost(path, options, requiredParams) {
        options.path = path;
        validateParams(options, requiredParams);
        this._post(options);
    }
}

class V2CommonAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    getTokenList(options) {
        this.apiInstance.callPost("getCoinList", options, []);
    }

    getTokenInformation(options) {
        this.apiInstance.callPost("getCoin", options, ["coinId"]);
    }

    getTokenPrice(options) {
        this.apiInstance.callPost("getCoinUSDTPrice", options, ["coinIds"]);
    }

    getCWalletUserInfo(options) {
        this.apiInstance.callPost("getCwalletUserId", options, ["cwalletUserId"]);
    }

    getWithdrawFee(options) {
        this.apiInstance.callPost("getWithdrawFee", options, ["coinId", "chain"]);
    }

    getFiatList(options) {
        this.apiInstance.callPost("getFiatList", options, []);
    }

    getChainList(options) {
        this.apiInstance.callPost("getChainList", options, []);
    }
}

class V2MerchantAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    getBalanceList(options) {
        this.apiInstance.callPost("getAppCoinAssetList", options, []);
    }

    getCoinBalance(options) {
        this.apiInstance.callPost("getAppCoinAsset", options, ["coinId"]);
    }

    createInvoice(options) {
        this.apiInstance.callPost("createAppOrderDepositAddress", options, ["coinId", "price", "chain", "orderId"]);
    }

    getInvoiceDetail(options) {
        this.apiInstance.callPost("getAppOrderInfo", options, ["orderId"]);
    }

    createPermanentAddress(options) {
        this.apiInstance.callPost("getOrCreateAppDepositAddress", options, ["referenceId", "chain"]);
    }

    getDepositRecord(options) {
        this.apiInstance.callPost("getAppDepositRecord", options, ["recordId"]);
    }

    getDepositRecordList(options) {
        this.apiInstance.callPost("getAppDepositRecordList", options, []);
    }

    externalWithdraw(options) {
        this.apiInstance.callPost("applyAppWithdrawToNetwork", options, ["coinId", "chain", "address", "orderId", "amount"]);
    }

    internalWithdraw(options) {
        this.apiInstance.callPost("applyAppWithdrawToCwallet", options, ["coinId", "cwalletUser", "orderId", "amount"]);
    }

    getWithdrawalRecord(options) {
        this.apiInstance.callPost("getAppWithdrawRecord", options, []);
    }

    getWithdrawalRecordList(options) {
        this.apiInstance.callPost("getAppWithdrawRecordList", options, []);
    }
    
    getSwapQuote(options) {
        this.apiInstance.callPost("estimate", options, ["coinIdIn", "amountIn", "coinIdOut"]);
    }
    
    createSwapOrder(options) {
        this.apiInstance.callPost("swap", options, ["orderId", "coinIdIn", "amountIn", "coinIdOut"]);
    }
    
    getSwapRecord(options) {
        this.apiInstance.callPost("getSwapRecord", options, []);
    }
    
    getSwapRecordList(options) {
        this.apiInstance.callPost("getSwapRecordList", options, []);
    }
}

class V2WalletSystemAPI {
    constructor(apiInstance) {
        this.apiInstance = apiInstance;
    }

    getUserBalanceList(options) {
        this.apiInstance.callPost("getUserCoinAssetList", options, ["userId"]);
    }

    getUserBalance(options) {
        this.apiInstance.callPost("getUserCoinAsset", options, ["userId", "coinId"]);
    }

    getUserDepositAddress(options) {
        this.apiInstance.callPost("getOrCreateUserDepositAddress", options, ["userId", "chain"]);
    }

    getUserDepositRecord(options) {
        this.apiInstance.callPost("getUserDepositRecord", options, ["recordId"]);
    }

    getUserDepositRecordList(options) {
        this.apiInstance.callPost("getUserDepositRecordList", options, ["userId"]);
    }

    externalUserWithdraw(options) {
        this.apiInstance.callPost("applyUserWithdrawToNetwork", options, ["userId", "coinId", "chain", "address", "orderId", "amount"]);
    }

    internalUserWithdraw(options) {
        this.apiInstance.callPost("applyUserWithdrawToCwallet", options, ["userId", "coinId", "cwalletUser", "orderId", "amount"]);
    }

    getUserWithdrawalRecord(options) {
        this.apiInstance.callPost("getUserWithdrawRecord", options, []);
    }

    getUserWithdrawalRecordList(options) {
        this.apiInstance.callPost("getUserWithdrawRecordList", options, ["userId"]);
    }

    internalUserTransfer(options) {
        this.apiInstance.callPost("userTransfer", options, ["fromUserId", "toUserId", "coinId", "amount", "orderId"]);
    }

    getUserTransferRecord(options) {
        this.apiInstance.callPost("getUserTransferRecord", options, ["fromUserId", "toUserId", "coinId", "orderId", "amount"]);
    }

    getUserTransferRecordList(options) {
        this.apiInstance.callPost("getUserTransferRecordList", options, ["fromUserId", "toUserId"]);
    }
    
    createUserSwapOrder(options) {
        this.apiInstance.callPost("userSwap", options, ["orderId", "userId", "coinIdIn", "amountIn", "coinIdOut"]);
    }
    
    getUserSwapRecord(options) {
        this.apiInstance.callPost("getUserSwapRecord", options, []);
    }
    
    getUserSwapRecordList(options) {
        this.apiInstance.callPost("getUserSwapRecordList", options, []);
    }
}

publish({
    apiCall: apiCall,
    createTimestamp: createTimestamp,
    setAppId: setAppId,
    getAppId: getAppId,
    setAppSecret: setAppSecret,
    getAppSecret: getAppSecret,
    v1: new V1Api(),
    v2: new V2Api()
});

on(libPrefix + "onApiResponse", onApiResponse);
on(libPrefix + "onApiError", onApiError);
