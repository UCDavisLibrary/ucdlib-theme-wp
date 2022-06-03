import { html } from '../../utils';
import {
  Button,
  TextControl,
  Modal,
  SelectControl,
  DatePicker
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export default ( props ) => {
  const { attributes, setAttributes } = props;

  // modal state
  const emptyModalData = {title: '', link: '', salaryMin: null, salaryMax: null, salaryFrequency: '', finalFilingDate: null};
  const [ modalIsOpen, setModalOpen ] = useState( false );
  const [ modalMode, setModalMode ] = useState( 'Add' );
  const [ modalData, setModalData ] = useState( emptyModalData );

  // modal validation
  const modalCanSave = (() => {
    if ( 
      !modalData || 
      !modalData.title || 
      !modalData.link || 
      !modalData.salaryMin ||
      !modalData.salaryMax ||
      !modalData.salaryFrequency ||
      !modalData.finalFilingDate
      ) {
        return false
      }
    return true;
  })();

  // dropdown options
  const salaryFreqencies = [
    {label: 'Hour', value: 'hour'},
    {label: 'Day', value: 'day'},
    {label: 'Week', value: 'week'},
    {label: 'Month', value: 'month'},
    {label: 'Year', value: 'year'}
  ];

  // currency formatter
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  const onCareerClicked = (e) => {
    setModalMode('Edit');
    setModalOpen(true);
  }

  // modal data change events
  const onModalTitleChange = (title) => {
    const data = {...modalData, title};
    setModalData(data);
  }
  
  const onModalUrlChange = (link) => {
    const data = {...modalData, link};
    setModalData(data);
  }

  const onModalSalaryStartChange = (salaryMin) => {
    const data = {...modalData, salaryMin};
    setModalData(data);
  }

  const onModalSalaryEndChange = (salaryMax) => {
    const data = {...modalData, salaryMax};
    setModalData(data);
  }

  const onModalSalaryFreqChange = (salaryFrequency) => {
    const data = {...modalData, salaryFrequency};
    setModalData(data);
  }

  const onModalFilingDateChange = (finalFilingDate) => {
    const data = {...modalData, finalFilingDate: new Date(finalFilingDate)};
    setModalData(data);
  }

  const closeModal = () => {
    setAttributes(modalData);
    setModalOpen(false);
  }

  const onModalSave = () => {
    setAttributes(modalData);
    setModalOpen(false);
  }

  return html`
    <div>
      <li onClick=${onCareerClicked} style=${{cursor: 'pointer' }}>
        <a href="${attributes.link}"><strong>${attributes.title}</strong></a><br/>
        <span style=${{ fontSize: '0.9em' }}><strong>Salary: </strong> ${currency.format(attributes.salaryMin)} - ${currency.format(attributes.salaryMax)}/<span style=${{ textTransform: 'capitalize'}}>${attributes.salaryFrequency}</span></span><br/>
        <span style=${{ fontSize: '0.9em' }}><strong>Final Filing Date:</strong> ${attributes.finalFilingDate ? attributes.finalFilingDate.toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) : ''}</span>  
      </li>

      ${modalIsOpen && html`
        <${Modal} title=${modalMode + " Career"} onRequestClose=${closeModal}>
          <div>
            <${TextControl} 
              label="Job Title"
              value=${modalData.title}
              onChange=${onModalTitleChange}
            />
            <${TextControl} 
              label="Url"
              value=${modalData.link}
              onChange=${onModalUrlChange}
              type="url"
            />
            <${TextControl} 
              label="Salary Start"
              value=${modalData.salaryMin}
              onChange=${onModalSalaryStartChange}
              type="number"
            />
            <${TextControl} 
              label="Salary End"
              value=${modalData.salaryMax}
              onChange=${onModalSalaryEndChange}
              type="number"
            />
            <${SelectControl} 
              label="Salary Frequency"
              value=${modalData.salaryFrequency}
              options=${salaryFreqencies}
              onChange=${onModalSalaryFreqChange}
            />
            <div>Final Filing Date</div>
            <${DatePicker} 
              currentDate=${modalData.finalFilingDate}
              onChange=${onModalFilingDateChange}
            />
            <${Button} 
              onClick=${onModalSave}
              variant='primary' 
              disabled=${!modalCanSave}>${modalMode == 'Add' ? 'Add Career' : 'Save Changes'}</${Button}>
          </div>
        </${Modal}>
      `}
    </div>
  `;
}
/*
capitalize frequency

p::first-letter {
  text-transform:capitalize;
}
*/