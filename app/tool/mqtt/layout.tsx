import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'MQTT',
    description: '链接测试MQTT服务'
  }

  const layout = ({ children }: { children: any }) => {
    return (
      <>
          {children}
      </>
    )
  }
  
  export default layout