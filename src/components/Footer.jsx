import React from 'react'
import { footerLinks } from '../constants'
const Footer = () => {
  return (
    <footer>
      <div className='info'>
        <p>© Apple Inc. All rights reserved.</p>
        <img src="/logo.svg" alt="Apple logo" />
      </div>
      <hr />
      <div className='links'>
        <p>Quick Links</p>
        <ul>
          {footerLinks.map(({link,label}) => (
            <li key={label}>
              <a href={link}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
