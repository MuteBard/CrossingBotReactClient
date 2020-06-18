//<Operation>_<Collection>_<Component>_*

let GET_USER_HOME = (username) =>
`query{
    getUser(username:${"\""+username+"\""}){
        username
        avatar
    }
}`


let GET_USER_PROFILE = (username) =>
`query{
    getUser(username:${"\""+username+"\""}){
        bells
        liveTurnips{
            quantity
            netGainLossAsBells
            netGainLossAsPercentage
        }
        pocket{
            bug{
                img
            }
            fish{
                img
            }
        }
    }
}`



let GET_USER_CATCH = (username) =>
`query{
    getUser(username:${"\""+username+"\""}){
        username
        bells
        pocket{
            bug{
                name
                bells
                availability
                rarity
                img
            }
            fish{
                name
                bells
                availability
                rarity
                img
            }
        }
    }
}`


let GET_USER_MARKET = (username) =>
`query{
    getUser(username:${"\""+username+"\""}){
        bells
        liveTurnips{
            business
            quantity
            marketPrice
            totalBells
            netGainLossAsBells
            netGainLossAsPercentage
        } 
        turnipTransactionHistory{
            business
            quantity
            marketPrice
            totalBells
            netGainLossAsBells
            netGainLossAsPercentage
        }    
    }
}`

let GET_MOVEMENTRECORD_MARKET = () => 
`query{
    getDayRecords(dummy : true){
        todayHigh
        todayLow
        stalksPurchased
        latestTurnip{
            price
            hour
            minute
        }
        turnipHistory{
            price
            hour
            minute
        }
        year
        month
        day
    }
}  
`

let GET_N_DAYS_MOVEMENTRECORD_MARKET = (numberOfDays) => 
`query{
    getNDayRecords(days:${numberOfDays}){
        turnipHistory{
            price
            hour
            minute
        }
        year
        month
        day
    }
}  
`

let GET_TURNIPTRANSACTION_MARKET_VALIDATION = (username, business, quantity) =>
`query{
    validatePendingTransaction(username: ${"\""+username+"\""}, business: ${"\""+business+"\""}, quantity: ${quantity}){
        status
        business
        quantity
        marketPrice
        totalBells
    }
}
`

module.exports.GET_USER_HOME = GET_USER_HOME
module.exports.GET_USER_PROFILE = GET_USER_PROFILE
module.exports.GET_USER_CATCH = GET_USER_CATCH
module.exports.GET_USER_MARKET = GET_USER_MARKET
module.exports.GET_TURNIPTRANSACTION_MARKET_VALIDATION = GET_TURNIPTRANSACTION_MARKET_VALIDATION
module.exports.GET_MOVEMENTRECORD_MARKET = GET_MOVEMENTRECORD_MARKET
module.exports.GET_N_DAYS_MOVEMENTRECORD_MARKET = GET_N_DAYS_MOVEMENTRECORD_MARKET
