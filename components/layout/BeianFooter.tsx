import React from 'react'

const BeianFooter = () => {
  return (
    <div style={{textAlign: 'center', position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, -50%)'}}>
      <a href="https://beian.miit.gov.cn/" target="_blank" style={{color:'gray', textDecoration: 'none'}}>
      湘ICP备20002140号-2
      </a>
      <img style={{verticalAlign: 'middle', marginLeft: '1rem', height: '1rem', width: '1rem'}} src='/icon-wa.png' />
      <a href="https://beian.mps.gov.cn/#/query/webSearch?code=43112402000142" style={{color:'gray', textDecoration: 'none'}} rel="noreferrer" target="_blank">湘公网安备43112402000142号</a>
    </div>
  )
}

export default BeianFooter
