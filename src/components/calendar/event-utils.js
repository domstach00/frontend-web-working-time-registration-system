// import {re} from "@babel/core/lib/vendor/import-meta-resolve";

let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
// import axios from 'axios';
// import {GET_ALL_EVENTS} from "../../../delivery-methods/index";


// eslint-disable-next-line no-unused-vars
async function getEventsFromAPI() {
    var idS
    var titleS
    var startS
    var endS
    fetch('http://localhost:8090/api/v1/event/all')
        .then(function (response) {
            console.log(response.data)
            idS = response.data.idE
            titleS = response.data.description
            startS = response.data.startDate
            endS = response.data.endDate
        })

    return [{
        id: idS,
        title: titleS,
        start: startS,
        end: endS
    }]
}

export var INITIAL_EVENTS = getEventsFromAPI()

export function createEventId() {
    return String(eventGuid++)
}