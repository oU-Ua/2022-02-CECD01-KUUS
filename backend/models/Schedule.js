// 유저의 비행 일정 담을 database

const { DateTime } = require('luxon');
const mongoose = require('mongoose')
const { User } = require('./User');

var scheSchema = mongoose.Schema({
    ScheduleName: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },

    // fa_flight_id: flightaware 고유 id 위치 지도 가져올 때 필요
    // cancelled: 비행 취소 여부
    // status: 항공기 상태, 예정/지연 등등으로 출력됨
    // gate_origin: 출발지 게이트 번호, gate_destination: 도착지 게이트 번호
    flight_info: {
        flight_iata: {
            type: String,
        },
        fa_flight_id: {
            type: String
        },
        cancelled: {
            type: Boolean
        },
        gate_origin: {
            type: String
        },
        gate_destination: {
            type: String
        },
        progress_percent: {
            type: Number
        }
    },

    // scheduled_off, estimated_off, actual_off: 예정/예상/실제 탑승 완료 시간, 비행 시간은 아님
    // scheduled_on, estimated_on, actual_on: 예정/예상/실제 도착 시간
    // 시간 형식은 ISO 8601, YYYY-MM-DD T HH:MM:SS
    // delay는 항공기 지연되었을 경우 지연된 시간, 초 단위로 받아옴
    flight_schedule: {
        scheduled_out: {
            type: String
        },
        estimated_out: {
            type: String
        },
        actual_out: {
            type: String
        },
        scheduled_in: {
            type: String
        },
        estimated_in: {
            type: String
        },
        actual_in: {
            type: String
        },
        delay: {
            departure_delay: {
                type: Number
            },
            arrival_delay: {
                type: Number
            }
        },
    },

    airports: {
        departure: {
            type: String,
        },
        dep_iata: {
            type: String,
        },
        arrival: {
            type: String,
        },
        arr_iata: {
            type: String,
        },
    },

})


const Schedule = mongoose.model('Schedule', scheSchema)
//다른 파일에서도 모듈을 쓸 수 있게
module.exports = { Schedule }