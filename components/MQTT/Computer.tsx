"use client"
import { connect, MqttClient } from 'mqtt/types/lib/connect';
import React, { createContext, useCallback, useEffect, useState } from 'react'
// import * as mqtt from 'mqtt/dist/mqtt'
import mqtt from 'mqtt'
import Connection from './Connection';
import Receiver from './Receiver';
import Subscriber from './Subscriber';
import Switcher from './Switcher';
import ConfigEdit from './ConfigEdit';
import Publisher from './Publisher';


export const QosOption = createContext<any[]>([])
export const Payloads = createContext<any>(null)
const ConfigKey = 'react-App-_iot-common-C0nfig'
export type PayloadType = {
    topic: string,
    message: string,
    qos?: 0 | 1 | 2
}

export enum ClientConnectStatus {
    Connected = 'Connected',
    Connecting = 'Connecting',
    Reconnecting = 'Reconnecting',
    ConnectError = 'Connection error',
    DisConnected = 'DisConnected'
}

type Props = {
    protocol: string,
    host: string,
    clientId: string,
    port: number,
    username: string,
    password: string,
    devices: any[]
}


export default function Computer({ 
    protocol,
    host,
    clientId,
    port,
    username,
    password,
    devices
 }: Props) {
    const [client, setClient] = useState<MqttClient>()
    const [isSubed, setIsSub] = useState(false)
    const [showEditor, setShowEditor] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [payload, setPayload] = useState<PayloadType>()
    const [connectStatus, setConnectStatus] = useState<ClientConnectStatus>(ClientConnectStatus.DisConnected)
    const mqttConnect = useCallback((host: string, mqttOption: any) => {
        mqttDisconnect()
        setConnectStatus(ClientConnectStatus.Connecting)
        /**
         * if protocol is "ws", connectUrl = "ws://broker.emqx.io:8083/mqtt"
         * if protocol is "wss", connectUrl = "wss://broker.emqx.io:8084/mqtt"
         *
         * /mqtt: MQTT-WebSocket uniformly uses /path as the connection path,
         * which should be specified when connecting, and the path used on EMQX is /mqtt.
         *
         * for more details about "mqtt.connect" method & options,
         * please refer to https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
         */
        console.log(client)
        console.log("will do setClient")
        console.log(mqtt)
        setClient(mqtt.connect(host, mqttOption))
        console.log('client', client)
    }, [client,protocol,host,username, password, clientId, port])

    const autoConnectMqtt = () => {
        mqttDisconnect()
        if (client) {
            // https://github.com/mqttjs/MQTT.js#event-connect
            client.on('connect', () => {
                console.log("..connect")
                setConnectStatus(ClientConnectStatus.Connected)
                devices.map((device: any) => {
                    if (device.topic && device.topic.length > 0) mqttSub({ topic: device.topic, qos: 0 })
                })

            })

            // https://github.com/mqttjs/MQTT.js#event-error
            client.on('error', (err) => {
                console.error('Connection error: ', err)
                setConnectStatus(ClientConnectStatus.ConnectError)
                client.end()
            })

            // https://github.com/mqttjs/MQTT.js#event-reconnect
            client.on('reconnect', () => {
                setConnectStatus(ClientConnectStatus.Reconnecting)
            })

            // https://github.com/mqttjs/MQTT.js#event-message
            client.on('message', (topic, message) => {
                const payload: PayloadType = { topic, message: message.toString() }
                console.log("on--message")
                setPayload(payload)
            })
        }
        // const { protocol, host, clientId, port, username, password } = baseinfo.host
        // const url = `${protocol}://${host}:${port}/mqtt`
        // const options = {
        //     clientId,
        //     username,
        //     password,
        //     clean: true,
        //     reconnectPeriod: 1000, // ms
        //     connectTimeout: 30 * 1000, // ms
        // }
        // mqttConnect(url, options)
    }

    const toggleEditor = useCallback(() => setShowEditor(!showEditor), [])

    useEffect(() => {

        console.log('client', client)
        autoConnectMqtt()
        updated && setUpdated(false)
        return () => {
            devices.map((device: any) => mqttUnSub({ topic: device.topic, qos: 1 }))
        }
    }, [client, updated])

    // disconnect
    // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
    const mqttDisconnect = useCallback(() => {
        console.log('come into disconnect')
        console.log('client', client)
        if (client) {
            console.log("....this client")
            try {
                console.log("will end connect..")
                client.end(false, () => {
                    setConnectStatus(ClientConnectStatus.DisConnected)
                    setPayload(undefined)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }, [client,protocol,host,username, password, clientId, port])

    // publish message
    // https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
    const mqttPublish = (context: PayloadType) => {
        if (client) {
            // topic, QoS & payload for publishing message

            const { topic, message, qos } = context
            client.publish(topic, message, { qos, retain: false }, (error) => {
                if (error) {
                }
            })
        }
    }

    const mqttSub = (subscription: any) => {
        console.log('..do sub')
        if (client) {
            // topic & QoS for MQTT subscribing
            const { topic, qos } = subscription
            console.log(client)
            // if(!client.connected){
            //     mqtt.connect(host)
            // }
            // subscribe topic
            // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
            client.subscribe(topic, { qos }, (error: any) => {
                if (error) {
                    console.log(error)
                    return
                }
                setIsSub(true)
            })
        }
    }

    // unsubscribe topic
    // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
    const mqttUnSub = (subscription: any) => {
        if (client) {
            const { topic, qos } = subscription
            client.unsubscribe(topic, { qos }, (error) => {
                if (error) {
                    return
                }
                setIsSub(false)
            })
        }
    }

    const doSwitcherSort = () => {
        devices.push(devices.shift())
        // todo 
        localStorage.setItem(ConfigKey, btoa(encodeURIComponent(JSON.stringify(''))))
        setUpdated(true)

    }
    console.log("Computerrrr...render", host)
    return (
        <div>
            <Connection
                connect={mqttConnect}
                disconnect={mqttDisconnect}
                connectOptions={host}
                connectStatus={connectStatus}
                toggleEditor={toggleEditor}
            />
            {/* {showEditor && <ConfigEdit />} */}
            <Payloads.Provider value={payload}>
                {devices.map((device: any) =>
                    <Switcher
                        doSwitcherSort={doSwitcherSort}
                        key={device.topic}
                        device={device}
                        pub={mqttPublish} />)}

                <Subscriber sub={mqttSub} unSub={mqttUnSub} />
            </Payloads.Provider>
            <Publisher pub={mqttPublish}/>
            <Receiver payload={payload} />
        </div>
    )
}
