# 环境变量的用法

[参考链接](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables)

## 文件名
```
.env
.env.local
.env.development
.env.production
.env.test
.env.test.local
```
1. env: 默认的
2. env.local 一般来说这个文件是需要的
3. development 在运行next dev的时候会加载
4. production 在运行next start 的时候会加载

## 加载顺序
会按照下面顺序依次查找，如果找到了变量名就会终止
```
1. process.env
2. .env.$(NODE_ENV).local
3. .env.local(当node_env是test的时候不会查找)
4. .env.$(NODE_ENV)
5. .env
```

### 浏览器端获取环境变量
如果浏览器端想通过process.env.name获取name值，需要加上前缀：NEXT_PUBLIC_
举个栗子：
`.env`
```
APP_HOST=localhost:3000
NEXT_PUBLIC_TEST1=this/is/test/1
```
`.login.tsx`
```
import React from 'react'

const Login = ({host}: {host: string}) => {
  console.log(process.env.APP_HOST)
  console.log(process.env.NEXT_PUBLIC_TEST1)
  console.log(host)
  return (
    <div>Login</div>
  )
}

export default Login

export const getStaticProps = async () => {
  return {
    props: {
      host: process.env.APP_HOST
    }
  }
}
```
输出结果
```
undefined
this/is/test/1
localhost:3000
```
如果没有NEXT_PUBLIC_前缀，浏览器端通过`process.env.APP_HOST` 得到的是undefined