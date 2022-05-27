let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [{
        id: createEventId(),
        title: 'Example event',
        start: todayStr,
        end: '2022-05-30'
    },
]

export function createEventId() {
    return String(eventGuid++)
}