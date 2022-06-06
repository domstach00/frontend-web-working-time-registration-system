// // import {re} from "@babel/core/lib/vendor/import-meta-resolve";
//
// let eventGuid = 0
// // let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
// // import axios from 'axios';
// // import {GET_ALL_EVENTS} from "../../../delivery-methods/index";
//
//
//
// // eslint-disable-next-line no-unused-vars
// function renameKey( obj, oldKey, newKey ) {
//     obj[newKey] = obj[oldKey];
//     delete obj[oldKey];
// }
//
// // eslint-disable-next-line no-unused-vars
// async function getEventsFromAPI() {
//     var model_event = []
//     try {
//         const response = await fetch('http://localhost:8090/api/v1/event/all')
//         const data = await response.json()
//
//         model_event = data
//         model_event.forEach( obj => renameKey(obj, 'idE', 'id'))
//         model_event.forEach( obj => renameKey(obj, 'startDate', 'start'))
//         model_event.forEach( obj => renameKey(obj, 'endDate', 'end'))
//         // eslint-disable-next-line no-unused-vars
//         // console.log(model_event.map(({description, ...rest}) => rest))
//         console.log(model_event)
//     } catch (error) {
//         console.log("Error")
//     }
//
//     return model_event
// }
//
// export var INITIAL_EVENTS = [{
//     id: createEventId(),
//     title: 'title',
//     start: '06-06-2022',
//     end: '06-06-2022',
// }]
//
// export function createEventId() {
//     return String(eventGuid++)
// }