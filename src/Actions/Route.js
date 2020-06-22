const BUG = "bug"  
const FISH  = "fish" 
const Query = require('./Queries')
const Mutation = require('./Mutations')
const axios = require('axios')


let CBTC_BASEURL = 'http://localhost:4000';
let CBAS_BASEURL = 'http://localhost:5000';
if (window.location.hostname != 'localhost'){
  BASEURL = '';
}


//REST (client)
let RestCall = (config, callback) => {
    axios(config).then(CBTC_response => callback(CBTC_response.data))
}

export function authenticateUser(CBTC_Payload, callback){
    RestCall({
        url : `${CBTC_url}/authenticateUser`,
        method : "post",
        data : CBTC_Payload
    }, callback)
}

//GraphQL (client)
let queryGraphQL = (query, callback) => {
    axios({
        url : `${CBAS_url}/api/grapql`,
        method: 'post',
        data: { query }
    }).then(CBAS_response => {
        if(callback != null){
            callback(CBAS_response.data.data)
        }
    }).catch(error => {
        console.log(error) 
    })
}

export function signUp(CBAS_Payload){
    let mutation = Mutation.SIGN_UP(CBAS_Payload.username, CBAS_Payload.encryptedPw)
    queryGraphQL(mutation, null)
}

export function signIn(CBAS_Payload, callback){
    let mutation = Mutation.SIGN_IN(CBAS_Payload.username, CBAS_Payload.encryptedPw)
    queryGraphQL(mutation, callback)
}

export function mutateCBforUser (CBAS_Payload, callback){
    let mutation = Mutation.UPDATE_USER_HOME_SET_CROSSINGBOT(CBAS_Payload.username, CBAS_Payload.added)
    queryGraphQL(mutation, callback)
}

export function queryProfileUserData (CBAS_Payload, callback){
    let query = Query.GET_USER_PROFILE(CBAS_Payload.username)
    queryGraphQL(query, callback)
}

export function queryMarketUserData (CBAS_Payload, callback){
    let query = Query.GET_USER_MARKET(CBAS_Payload.username)
    queryGraphQL(query, callback)
}

export function queryMarketChartDataForNDays (CBAS_Payload, callback){
    let query = Query.GET_N_DAYS_MOVEMENTRECORD_MARKET(CBAS_Payload.days)
    queryGraphQL(query, callback)    
} 

export function queryMarketChartData (CBAS_Payload, callback){
    let query = Query.GET_MOVEMENTRECORD_MARKET()
    queryGraphQL(query, callback)
}

export function queryMarketVerificationData(CBAS_Payload, callback) {
    let query = Query.GET_TURNIPTRANSACTION_MARKET_VALIDATION(CBAS_Payload.username, CBAS_Payload.business, CBAS_Payload.quantity)
    queryGraphQL(query, callback)
}

export function mutateMarketAcknowledgementData (CBAS_Payload, callback) {
    let mutation = Mutation.UPDATE_USER_MARKET_TRANSACTION(CBAS_Payload.username, CBAS_Payload.business, CBAS_Payload.quantity, CBAS_Payload.marketPrice, CBAS_Payload.totalBells)
    queryGraphQL(mutation, callback)
}

export function queryUserPocket (CBAS_Payload, callback) {
    let query = Query.GET_USER_CATCH(CBAS_Payload.username)
    queryGraphQL(query, callback)
} 

export async function mutateCatchCatchOneCreature (CBAS_Payload, callback){
    let mutation = Mutation.UPDATE_USER_CATCH_CATCH_ONE(CBAS_Payload.username, CBAS_Payload.species)
    
    let CBAS_Response = await axios({
        url : CBAS_url,
        method: 'post',
        data: { query : mutation }
    }).catch(error => {
        console.log(error) 
    })

    let catchCreature = CBAS_Response.data.data.catchCreature

    if(catchCreature === "BugOverflow" || catchCreature === "FishOverflow"){  
        callback(catchCreature)
    }else if(catchCreature.split("|")[0].trim() === "Success"){
        let creatureData = (catchCreature.split("|")[2].trim().split("")
        .map(char => {
            if(char === "#") return "\""
            else return char
        }).join(""))

        let rawData = JSON.parse(creatureData)

        let cleanedData = {
            name : rawData.name,
            bells: Number(rawData.bells),
            rarity : Number(rawData.rarity),
            img: rawData.img,
            availability : rawData.availability.split(" "),
            newCreature : true
        }

        callback(cleanedData)
    }

}
 
export function mutateCatchSellOneCreature (CBAS_Payload, callback) {
    let mutation = Mutation.UPDATE_USER_CATCH_SELL_ONE(CBAS_Payload.username, CBAS_Payload.species, CBAS_Payload.name)
    queryGraphQL(mutation, callback)
}

export function mutateCatchSellAllSpecies (CBAS_Payload, callback) {
    if(CBAS_Payload.species === BUG){
        let mutation = Mutation.UPDATE_USER_CATCH_SELL_BUGS(CBAS_Payload.username)
        queryGraphQL(mutation, callback)
    }
    else if(CBAS_Payload.species === FISH){
        let mutation = Mutation.UPDATE_USER_CATCH_SELL_FISHES(CBAS_Payload.username)
        queryGraphQL(mutation, callback)
    }

}




