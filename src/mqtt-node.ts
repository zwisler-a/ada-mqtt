import {Attribute, Input, Node} from '@zwisler/ada-lib'
import mqtt, {MqttClient} from "mqtt";

@Node({
    identifier: 'mqtt-node',
    name: 'Mqtt Node',
    description: 'Node Connecting to MQTT'
})
export class MqttNode {

    @Attribute({
        identifier: 'topic',
        name: 'Topic'
    })
    topic: string

    @Attribute({
        identifier: 'url',
        name: 'Url'
    })
    url: string

    @Attribute({
        identifier: 'username',
        name: 'Username'
    })
    username: string;

    @Attribute({
        identifier: 'password',
        name: 'Password'
    })
    password: string;
    private client: MqttClient;

    constructor(def: any) {
    }

    @Input({
        name: 'Publish',
    })
    async publish(value) {
        console.log(this.url, {username: this.username, password: this.password})
        this.client = await mqtt.connectAsync(this.url, {username: this.username, password: this.password})
        if (this.client?.connected) {
            this.client.publish(this.topic, value);
        } else {
            console.log('not connected')
        }
        await this.client.endAsync();
    }

}