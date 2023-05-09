import { html } from "../../utils";
import websiteTypes from "./website-types";
import { TextControl, Modal, SelectControl, Button, __experimentalText as Text } from '@wordpress/components';
import {
  useState,
  useEffect,
  useRef,
  createRef,
  Fragment,
  forwardRef,
  useImperativeHandle } from '@wordpress/element';
import { IconPicker } from "../../block-components";

const ContactListEdit = forwardRef((props, ref) => {
  let {
    modalTitle,
    onClose,
    emails,
    phones,
    websites,
    appointment,
    allowEmails,
    allowPhones,
    allowWebsites,
    allowAppointment,
    allowAdditionalText
  } = props;

  if ( !modalTitle ) modalTitle = 'Contact Information';
  if ( !emails ) emails = [];
  if ( !phones ) phones = [];
  if ( !websites ) websites = [];
  if ( !appointment ) appointment = '';
  allowEmails = allowEmails == false ? false : true;
  allowPhones = allowPhones == false ? false : true;
  allowWebsites = allowWebsites == false ? false : true;
  allowAppointment = allowAppointment == false ? false : true;
  allowAdditionalText = allowAdditionalText ? true : false;
  const onMainEleUpdated = (e) => {
    const propName = e.detail.propName;
    const propValue = e.detail.propValue;
    const newAttrs = {};
    newAttrs[propName] = propValue;
    setAttributes(newAttrs);
  }
  const baseContactStructure = (() => {
    const x = {value: '', label: ''};
    if ( allowAdditionalText ) x['additionalText'] = '';
    return x;
  })();

  const mainEleProps = () => {
    let p = {ref: mainEleRef};

    return p;
  }
  // modal state
  const [ isOpen, setOpen ] = useState( false );
  const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal
  }));

  const mainEleRef = useRef();
  const iconPickerRef = createRef();


  useEffect(() => {
    let mainEle = null;
    if ( mainEleRef.current ) {
      mainEleRef.current.addEventListener('updated', onMainEleUpdated);
      mainEleRef.current.addEventListener('icon-change', onIconChangeRequest);
      mainEle = mainEleRef.current;
    }
    return () => {
      if ( mainEle ) {
        mainEle.removeEventListener('updated', onMainEleUpdated);
        mainEle.removeEventListener('icon-change', onIconChangeRequest);
      }
    };
  });

  const onIconChangeRequest = () => {

    if ( iconPickerRef.current ){
      iconPickerRef.current.openModal();
    }
  }

  const addIconPicker = (v, website, i) => {

    if ( mainEleRef.current ) {
      mainEleRef.current.dispatchEvent(new CustomEvent('icon-change'));
    }


  };

  // phone setters
  const [_phones, setPhones] = useState(phones);
  const setPhone = (v, i, field) => {
    const before = _phones.slice(0, i);
    const after = _phones.slice(i+1);
    const phone = {..._phones[i]};
    if ( field == 'value' ) {
      v = v.replace(/\D/g,'');
      phone.value = v;
    } else {
      phone[field] = v;
    }
    setPhones([...before, phone, ...after]);
  };
  const addNewPhone = () => {
    setPhones( [..._phones, baseContactStructure])
  };
  const removePhone = (i) => {
    const before = _phones.slice(0, i);
    const after = _phones.slice(i+1);
    setPhones([...before, ...after]);
  };

  // apointment setters
  const [_appointment, setAppointment ] = useState(appointment);

  // email setters
  const [_emails, setEmails] = useState(emails);
  const setEmail = (v, i, field) => {
    const before = _emails.slice(0, i);
    const after = _emails.slice(i+1);
    const email = {..._emails[i]};
    email[field] = v;

    setEmails([...before, email, ...after]);
  };
  const addNewEmail = () => {
    setEmails([..._emails, baseContactStructure])
  };
  const removeEmail = (i) => {
    const before = _emails.slice(0, i);
    const after = _emails.slice(i+1);
    setEmails([...before, ...after]);
  };

  // website setters
  const [_websites, setWebsites] = useState(websites);
  const setWebsite = (v, i, field) => {
    const before = _websites.slice(0, i);
    const after = _websites.slice(i+1);
    const website = {..._websites[i]};
    website[field] = v;
    setWebsites([...before, website, ...after]);
  };
  const addNewWebsite = () => {
    setWebsites([..._websites, {...baseContactStructure, type: ''}]);
  };
  const removeWebsite = (i) => {
    const before = _websites.slice(0, i);
    const after = _websites.slice(i+1);
    setWebsites([...before, ...after]);
  };

  const _onClose = () => {

    closeModal();
    if ( onClose ) {
      const data = {};
      if ( allowEmails ) data['emails'] = _emails;
      if ( allowPhones ) data['phones'] = _phones;
      if ( allowWebsites ) data['websites'] = _websites;
      if ( allowAppointment ) data['appointment'] = _appointment;
      onClose(data);
    };
  }

  const modalSectionHeader = (title, onClick, buttonText="Add") => {
    return html`
      <div style=${{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px'}}>
        <h2>${title}</h2>
        <${Button} variant="primary" onClick=${onClick}>${buttonText}</${Button}>
      </div>
    `;
  }

  const phoneSection = () => html`
    <div>
    ${modalSectionHeader("Phone", addNewPhone)}
      ${_phones.length > 0 ? html`
        <div style=${{display: 'table'}}>
          <div style=${{display: 'table-header-group'}}>
            <div style=${{display: 'table-row', fontWeight: '700'}}>
              <div style=${{display: 'table-cell', paddingBottom: '10px'}}>Number</div>
              <div style=${{display: 'table-cell'}}>Link Label (optional)</div>
              ${allowAdditionalText && html`<div style=${{display: 'table-cell'}}>Additional Text (optional)</div>`}
              <div style=${{display: 'table-cell'}}></div>
            </div>
          </div>
          <div style=${{display: 'table-row-group'}}>
            ${_phones.map((phone, i) => html`
              <div style=${{display: 'table-row'}} key=${i}>
                <div style=${{display: 'table-cell', paddingRight: '15px'}}>
                  <${TextControl}
                    type="tel"
                    value=${phone.value}
                    onChange=${v => setPhone(v, i, 'value')}
                  />
                </div>
                <div style=${{display: 'table-cell', paddingRight: '15px'}}>
                  <${TextControl}
                    value=${phone.label}
                    onChange=${v => setPhone(v, i, 'label')}
                  />
                </div>
                ${allowAdditionalText && html`
                  <div style=${{display: 'table-cell', paddingRight: '15px'}}>
                    <${TextControl}
                      value=${phone.additionalText}
                      onChange=${v => setPhone(v, i, 'additionalText')}
                    />
                  </div>
                `}
                <div style=${{display: 'table-cell'}}>
                  <${Button} isDestructive=${true} onClick=${() => removePhone(i)} variant='link'>delete</${Button}>
                </div>
              </div>
            `)}
          </div>
        </div>
      ` : html`
      <div>
        <${Text} isBlock=${true} variant="muted" style=${{marginBottom: '15px'}}>
          You don't have any phone numbers listed. <${Button} onClick=${addNewPhone} variant='link'>Add one</${Button}>
        </${Text}>
      </div>
      `}
      <hr />
    </div>
  `;



  const emailSection = () => html`
  <div>
    ${modalSectionHeader("Email", addNewEmail)}
      ${_emails.length > 0 ? html`
        <div style=${{display: 'table'}}>
          <div style=${{display: 'table-header-group'}}>
            <div style=${{display: 'table-row', fontWeight: '700'}}>
              <div style=${{display: 'table-cell', paddingBottom: '10px'}}>Address</div>
              <div style=${{display: 'table-cell'}}>Link Label (optional)</div>
              ${allowAdditionalText && html`<div style=${{display: 'table-cell'}}>Additional Text (optional)</div>`}
              <div style=${{display: 'table-cell'}}></div>
            </div>
          </div>
          <div style=${{display: 'table-row-group'}}>
            ${_emails.map((email, i) => html`
              <div style=${{display: 'table-row'}} key=${i}>
                <div style=${{display: 'table-cell', paddingRight: '15px'}}>
                  <${TextControl}
                    type="email"
                    value=${email.value}
                    onChange=${v => setEmail(v, i, 'value')}
                  />
                </div>
                <div style=${{display: 'table-cell', paddingRight: '15px'}}>
                  <${TextControl}
                    value=${email.label}
                    onChange=${v => setEmail(v, i, 'label')}
                  />
                </div>
                ${allowAdditionalText && html`
                  <div style=${{display: 'table-cell', paddingRight: '15px'}}>
                    <${TextControl}
                      value=${email.additionalText}
                      onChange=${v => setEmail(v, i, 'additionalText')}
                    />
                  </div>
                `}
                <div style=${{display: 'table-cell'}}>
                  <${Button} isDestructive=${true} onClick=${() => removeEmail(i)} variant='link'>delete</${Button}>
                </div>
              </div>
            `)}
          </div>
        </div>
      ` : html`
      <div>
        <${Text} isBlock=${true} variant="muted" style=${{marginBottom: '15px'}}>
          You don't have any email addresses listed. <${Button} onClick=${ addNewEmail } variant='link'>Add one</${Button}>
        </${Text}>
      </div>
      `}
      <hr />
    </div>
    `;

const websiteSection = () => {
  const hasIcon = (website) => {
    return website.icon && website.icon.iconSet && website.icon.icon;
  };

  const iconString = (website) => {
    if (hasIcon(website)) {
      return `${website.icon.iconSet}:${website.icon.icon}`;
    }
    return '';
  };
  return html`
<div>
${modalSectionHeader("Websites", addNewWebsite)}
  ${_websites.length > 0 ? html`
    <div style=${{display: 'table'}}>
      <div style=${{display: 'table-header-group'}}>
        <div style=${{display: 'table-row', fontWeight: '700'}}>
          <div style=${{display: 'table-cell'}}>Type</div>
          <div style=${{display: 'table-cell', paddingBottom: '10px'}}>URL</div>
          <div style=${{display: 'table-cell'}}>Link Label (optional)</div>
          ${allowAdditionalText && html`<div style=${{display: 'table-cell'}}>Additional Text (optional)</div>`}
          <div style=${{display: 'table-cell'}}></div>
        </div>
      </div>
      <div style=${{display: 'table-row-group'}}>
        ${_websites.map((website, i) => html`
          <div style=${{display: 'table-row'}} key=${i}>
            <div style=${{display: 'table-cell', paddingRight: '15px', verticalAlign: 'middle'}}>
              <${SelectControl}
                options=${websiteTypes}
                value=${website.type}
                onChange=${v => setWebsite(v, i, 'type')}
              />
            </div>
            <div style=${{display: 'table-cell', paddingRight: '15px'}}>
              <${TextControl}
                value=${website.value}
                onChange=${v => setWebsite(v, i, 'value')}
              />
            </div>
            <div style=${{display: 'table-cell', paddingRight: '15px'}}>
              <${TextControl}
                value=${website.label}
                onChange=${v => setWebsite(v, i, 'label')}
              />
            </div>
            ${allowAdditionalText && html`
              <div style=${{display: 'table-cell', paddingRight: '15px'}}>
                <${TextControl}
                  value=${website.additionalText}
                  onChange=${v => setWebsite(v, i, 'additionalText')}
                />
              </div>
            `}
            ${website.type == 'other' ? html`
              <div style=${{display: 'table-cell', paddingRight: '15px'}} ...${ mainEleProps() } >
                ${hasIcon(website) ? html`
                  <div onClick=${v => addIconPicker(v, website, i)}>
                    <ucdlib-icon icon=${iconString(website)} style=${{cursor: 'pointer'}}></ucdlib-icon>
                  </div>
                ` : html`
                  <${Button} variant="primary" onClick=${v => addIconPicker(v, website, i)}>Icon</${Button}>
                `}
                <${IconPicker}
                  ref=${iconPickerRef}
                  onChange=${v => setWebsite(v, i, 'icon')}
                  selectedIcon=${website.icon}
                ></${IconPicker}>
            </div>
            `: html``}
            <div style=${{display: 'table-cell'}}>
              <${Button} isDestructive=${true} onClick=${() => removeWebsite(i)} variant='link'>delete</${Button}>
            </div>

          </div>
        `)}
      </div>
    </div>
  ` : html`
  <div>
      <${Text} isBlock=${true} variant="muted" style=${{marginBottom: '15px'}}>
        You don't have any websites listed. <${Button} onClick=${ addNewWebsite } variant='link'>Add one</${Button}>
      </${Text}>
  </div>
  `}
</div>
`};

const appointmentSection = () => html`
  <div>
    <h2>Appointments</h2>
    <${TextControl}
      value=${_appointment}
      label="Appointment URL"
      onChange=${a => setAppointment(a)}
    />
    <hr />
  </div>
`;



  return html`
    <${Fragment}>
      ${isOpen && html`
      <${Modal} title=${modalTitle} onRequestClose=${ _onClose }>
        <div>
          ${allowPhones && phoneSection()}
          ${allowEmails && emailSection()}
          ${allowAppointment && appointmentSection()}
          ${allowWebsites && websiteSection()}
          <${Button} variant="primary" onClick=${ _onClose }>Close</${Button}>
        </div>
			</${Modal}>
      `}
    </${Fragment}>
  `;

})

export default ContactListEdit
