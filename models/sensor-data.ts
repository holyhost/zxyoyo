import { Schema, model, models } from "mongoose"

const SensorDataSchema = new Schema({
    serio: {
        type: String,
        required: [true, 'device identify number is required!']
    },

    name: {
        type: String,
        required: [true, 'device name is required!']
    },
    type: {
        type: String,
        default: ''
    },
    value3: {
        type: String,
    },
    value2: {
        type: String,
    },
    value: {
        type: String,
        default: ''
    },
    createTime: {
        type: String,
        default: new Date().getTime().toString()
    },
})

const SensorData = models.SensorData ||  model('SensorData', SensorDataSchema)

export default SensorData