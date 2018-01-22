import React from 'react'
import ReactDom from 'react-dom'

import TD4Emurator from './component/TD4Emurator'

const app = document.getElementById('app')
if (app) {
  ReactDom.render(<TD4Emurator />, app)
}
else {
  console.error('fail to get app dom')
}