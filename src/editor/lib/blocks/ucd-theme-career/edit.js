import { html } from '../../utils';
import { useBlockProps } from '@wordpress/block-editor';
import {
  Button,
  TextControl,
  Modal,
  SelectControl,
  DatePicker
} from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  // const mainEleRef = useRef();
  const blockProps = useBlockProps();

  // modal state
  const startingModalData = {
    title: attributes.title || '', 
    link: attributes.link || '', 
    salaryMin: attributes.salaryMin || '', 
    salaryMax: attributes.salaryMax || '', 
    employmentType: attributes.employmentType || 'FULL_TIME',
    salaryFrequency: attributes.salaryFrequency || 'HOUR',
    finalFilingDate: attributes.finalFilingDate || ''
  };
  const [ modalIsOpen, setModalOpen ] = useState( false );
  const [ modalMode, setModalMode ] = useState( 'Add' );
  const [ modalData, setModalData ] = useState( startingModalData );

  // check if all data is empty
  const isEmpty = Object.values(startingModalData).every(x => x === null || x === '' || x === 'FULL_TIME' || x === 'HOUR');
  setAttributes({isEmpty});

  // get parent default no-job-listing text
  const { parent, parentAttributes } = useSelect(select => ({
    parent: select("core/block-editor").getBlockParents(props.clientId),
    parentAttributes: select('core/block-editor').getBlockAttributes(select("core/block-editor").getBlockParents(parent)),
  }));

  // const parent = select('core/block-editor').getBlockParents(clientId);
  // const parentAttributes = select('core/block-editor').getBlockAttributes(parent);
  console.log(parentAttributes); // Block Attributes
  console.log(props.attributes.label); // Passing Props


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
    {label: 'Hour', value: 'HOUR'},
    {label: 'Day', value: 'DAY'},
    {label: 'Week', value: 'WEEK'},
    {label: 'Month', value: 'MONTH'},
    {label: 'Year', value: 'YEAR'}
  ];

  const employmentTypes = [
    {label: 'Full-Time', value: 'FULL_TIME'},
    {label: 'Part-Time', value: 'PART_TIME'},
    {label: 'Contract', value: 'CONTRACT'},
    {label: 'Temporary', value: 'TEMPORARY'},
    {label: 'Internship', value: 'INTERNSHIP'},
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
    setAttributes({title});
  }
  
  const onModalUrlChange = (link) => {
    const data = {...modalData, link};
    setModalData(data);
    setAttributes({link});
  }

  const onModalSalaryStartChange = (salaryMin) => {
    const data = {...modalData, salaryMin};
    setModalData(data);
    setAttributes({salaryMin});
  }

  const onModalSalaryEndChange = (salaryMax) => {
    const data = {...modalData, salaryMax};
    setModalData(data);
    setAttributes({salaryMax});
  }

  const onModalSalaryFreqChange = (salaryFrequency) => {
    const data = {...modalData, salaryFrequency};
    setModalData(data);
    setAttributes({salaryFrequency});
  }

  const onModalEmploymentTypeChange = (employmentType) => {
    const data = {...modalData, employmentType};
    setModalData(data);
    setAttributes({employmentType});
  }

  const onModalFilingDateChange = (finalFilingDate) => {
    const data = {...modalData, finalFilingDate};
    setModalData(data);
    setAttributes({finalFilingDate});
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const onModalSave = () => {
    setModalOpen(false);
  }

  return html`
    <div ...${ blockProps }>
      <li onClick=${onCareerClicked} className="clickable">
        <a href="${attributes.link}"><strong>${attributes.title}</strong></a><br/>
        <span style=${{ fontSize: '0.9em' }}><strong>Salary: </strong> ${currency.format(attributes.salaryMin)} - ${currency.format(attributes.salaryMax)}/<span style=${{ textTransform: 'capitalize'}}>${attributes.salaryFrequency}</span></span><br/>
        <span style=${{ fontSize: '0.9em' }}><strong>Final Filing Date:</strong> ${attributes.finalFilingDate ? new Date(attributes.finalFilingDate).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) : ''}</span>
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
            <${SelectControl} 
              label="Employment Type"
              value=${modalData.employmentType}
              options=${employmentTypes}
              onChange=${onModalEmploymentTypeChange}
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