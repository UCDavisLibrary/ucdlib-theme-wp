import { html } from "../../utils";
import { Fragment } from "@wordpress/element";
import websiteTypes from "./website-types";


const ContactListDisplay = ( props ) => {
  let {
    phones,
    emails,
    websites,
    appointment,
    placeholderText,
    onClick
  } = props;

  if ( !placeholderText ) placeholderText = 'Enter Your Contact Info';
  if ( !emails ) emails = [];
  if ( !phones ) phones = [];
  if ( !websites ) websites = [];
  if ( !appointment ) appointment = '';

  const getLinkIcon = (t) => {
    if ( t === 'phone' ) return 'ucd-public:fa-phone';
    if ( t === 'email' ) return 'ucd-public:fa-envelope';
    if ( t === 'appointment' ) return 'ucd-public:fa-calendar-check';
    return (websiteTypes.find( ({ value }) => value === t )).icon;
  }
  const getPhoneLabel = (phone) => {
    if ( phone.label ) return phone.label;
    if ( phone.value.length == 10 ) {
      return `${phone.value.slice(0,3)}-${phone.value.slice(3,6)}-${phone.value.slice(6)}`
    }
    if ( phone.value.length == 7 ){
      return `${phone.value.slice(0,3)}-${phone.value.slice(3)}`
    }
    return phone.value;
  }
  const hasContactInfo = 
    phones.filter(x => x.value).length || 
    emails.filter(x => x.value).length || 
    appointment || 
    websites.filter(x => x.value).length;
  return html`
    <div onClick=${onClick}>
      ${hasContactInfo ? html`
        <ul className="list--pipe u-space-mb">
          ${emails.map(email => html`
            <${Fragment} key=${email.value}>
            ${email.value.length > 0 && html`
              <li><a className="icon-ucdlib">
                <ucdlib-icon icon=${ getLinkIcon('email')}></ucdlib-icon>
                <div>${email.label ? email.label : email.value}</div>
              </a>
                ${email.additionalText ? html`
                  <div className='additional-text'>(${email.additionalText})</div>
                ` : html``}
              </li>
              `}
            </${Fragment}>
          `)}
          ${phones.map(phone => html`
            <${Fragment} key=${phone.value}>
            ${phone.value.length > 0 && html`
              <li><a className="icon-ucdlib">
                <ucdlib-icon icon=${ getLinkIcon('phone')}></ucdlib-icon>
                <div>${getPhoneLabel(phone)}</div>
              </a>
                ${phone.additionalText ? html`
                  <div className='additional-text'>(${phone.additionalText})</div>
                ` : html``}
              </li>
              `}
            </${Fragment}>
          `)}
          ${appointment.length > 0 && html`
              <li><a className="icon-ucdlib">
                <ucdlib-icon icon=${ getLinkIcon('appointment')}></ucdlib-icon>
                <div>Book an Appointment</div>
              </a></li>
            `}
          ${websites.map(website => html`
            <${Fragment} key=${website.value}>
            ${website.value.length > 0 && html`
              <li><a className="icon-ucdlib">
                <ucdlib-icon icon=${ getLinkIcon(website.type)}></ucdlib-icon>
                <div>${website.label ? website.label : website.value}</div>
              </a>
                ${website.additionalText ? html`
                  <div className='additional-text'>(${website.additionalText})</div>
                ` : html``}
              </li>
              `}
            </${Fragment}>
          `)}
        </ul>
      ` : html`
        <ul className="list--pipe u-space-mb">
          <li className="icon icon--phone">${placeholderText}</li>
        </ul>
      `}
    </div>
  `
}

export default ContactListDisplay;