import {config} from 'dotenv';
import {ProxyHelper, setup} from "@zwisler/ada-lib";
import {MqttNode} from "./mqtt-node";

config();


(async () => {

    const service = await setup({
        amqpUrl: process.env.AMQP_URL
    })
    const openAiTextNode = ProxyHelper.create(MqttNode);
    await service.register([openAiTextNode], 'mqtt', 'MQTT', 'Mqtt Connector');
})();