"use client"
import { generateToken } from '@/utils/string-helpers'
import { Button, Container, Group, NumberInput, Paper, PasswordInput, Select, TextInput, Title, rem } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const Computer: any = dynamic(() =>
  import('@/components/MQTT/Computer').then((mod) => mod.default)
)

const MqttPage = () => {
  const [hostInfo, setHostInfo] = useState<any>({})
  const form = useForm({
    initialValues: {
      proto: 'http',
      mqttHost: '',
      mqttAccount: '',
      mqttPassword: '',
      mqttClientId: '',
      mqttPort: 8887,
      terms: true,
    },
  })
  console.log(hostInfo)
  const onFormChanged = (fieldName: string, value: string) => {
    form.setFieldValue(fieldName, value)
  }
  const onSubmit = () => {
    const temp = {
      host: {
        protocol: form.values.proto,
        host: form.values.mqttHost,
        clientId: form.values.mqttClientId ?? generateToken(18),
        port: form.values.mqttPort,
        username: form.values.mqttAccount,
        password: form.values.mqttPassword
      },
      devices: []
    }
    setHostInfo(JSON.parse(JSON.stringify(temp)))
    console.log({...temp})
    console.log(hostInfo)
  }
  return (
    <Container my={40} maw={'35rem'}>
      <Title
        ta="center"
        style={{ fontFamily: 'Greycliff CF', fontWeight: 900 }}
      >
        测试连接MQTT
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(() => onSubmit())}>
          <Select
            mt="md"
            value={form.values.proto}
            data={['http', 'https', 'ws', 'wss']}
            onChange={(e) => onFormChanged('proto', e ?? '')}
            placeholder="选择协议"
            label="协议"
          />
          <TextInput
            label="服务器地址"
            required
            value={form.values.mqttHost}
            onChange={(e) => onFormChanged('mqttHost', e.currentTarget.value)}
            placeholder="127.0.0.1"
            radius={'md'}
          />
          <TextInput
            label="mqtt账号"
            value={form.values.mqttAccount}
            onChange={(e) => onFormChanged('mqttAccount', e.currentTarget.value)}
            placeholder="请输入mqtt账号"
            radius={'md'}
          />
          <PasswordInput label="mqtt密码"
            value={form.values.mqttPassword}
            radius={'md'}
            onChange={(e) => onFormChanged('mqttPassword', e.currentTarget.value)}
            error={form.errors.password && "密码格式错误"}
            placeholder="密码" mt="md" />
          <Group justify={'space-between'} mt="lg">
            <TextInput
              label="ClientID"
              value={form.values.mqttClientId}
              onChange={(e) => onFormChanged('mqttClientId', e.currentTarget.value)}
              placeholder="默认随机生成ID"
              radius={'md'}
            />
            <NumberInput
              label="MQTT服务端口号"
              placeholder="请输入端口号"
              value={form.values.mqttPort}
              onChange={(e) => form.setFieldValue('mqttPort', e as number ?? 1883)}
            />
          </Group>
          <Button loading={false} fullWidth mt="md" type='submit'>
            连 接
          </Button>

        </form>
        {hostInfo&& hostInfo.host && <Computer baseinfo={hostInfo} />}
      </Paper>

    </Container>
  )
}

export default MqttPage
