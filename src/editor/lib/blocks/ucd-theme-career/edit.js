import { html } from '../../utils';
import { useBlockProps } from '@wordpress/block-editor';
import {
  Button,
  TextControl,
  TextareaControl,
  Modal,
  SelectControl,
  DatePicker,
  CheckboxControl,
  __experimentalText as Text
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  // modal state
  const startingModalData = {
    title: attributes.title || '', 
    description: attributes.description || '',
    link: attributes.link || '', 
    salaryMin: attributes.salaryMin || '', 
    salaryMax: attributes.salaryMax || '', 
    employmentType: attributes.employmentType || 'FULL_TIME',
    salaryFrequency: attributes.salaryFrequency || 'HOUR',
    finalFilingDate: attributes.finalFilingDate || '',
    startFilingDateChecked: attributes.startFilingDateChecked || false,
    relatedMaterials: attributes.relatedMaterials || []
  };
  const [ modalIsOpen, setModalOpen ] = useState( false );
  const [ modalMode, setModalMode ] = useState( 'Add' );
  const [ modalData, setModalData ] = useState( startingModalData );

  // check if all data is empty (excluding default values)
  const isEmpty = Object.values(startingModalData).every(x => x === null || x === '' || x === 'FULL_TIME' || x === 'HOUR');
  setAttributes({isEmpty});

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

  const baseRelatedMaterialsStructure = (() => {
    return {value: '', label: ''};
  })();

  // currency formatter
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
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

  const onModalDescriptionChange = (description) => {
    const data = {...modalData, description};
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

  const onModalEmploymentTypeChange = (employmentType) => {
    const data = {...modalData, employmentType};
    setModalData(data);
  }

  const onModalFilingDateChange = (finalFilingDate) => {
    const data = {...modalData, finalFilingDate};
    setModalData(data);
  }

  const onStartFilingDateChange = (startFilingDateChecked) => {
    const data = {...modalData, startFilingDateChecked};
    setModalData(data);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const onModalSave = () => {
    setModalOpen(false);
    if ( !attributes.datePosted ) {
      setAttributes({datePosted: (new Date).toISOString().split('T')[0] })
    }
    setAttributes(modalData);
  }

  const setRelatedMaterial = (v, i, field) => {
    const before = modalData.relatedMaterials.slice(0, i);
    const after = modalData.relatedMaterials.slice(i+1);
    const relatedMaterial = {...modalData.relatedMaterials[i]};
    relatedMaterial[field] = v;
    const relatedMaterials = [...before, relatedMaterial, ...after];
    const data = {...modalData, relatedMaterials};
    setModalData(data);
  };

  const addRelatedMaterials = () => {
    const relatedMaterials = [...modalData.relatedMaterials, {...baseRelatedMaterialsStructure, type: ''}];
    const data = {...modalData, relatedMaterials};
    setModalData(data);
  }

  const removeRelatedMaterials = (i) => {
    const before = modalData.relatedMaterials.slice(0, i);
    const after = modalData.relatedMaterials.slice(i+1);
    const relatedMaterials = [...before, ...after];
    const data = {...modalData, relatedMaterials};
    setModalData(data);
  };

  const relatedMaterialsSection = () => html`
  <div style=${{paddingTop: '10px', paddingBottom: '20px'}}>
    <div style=${{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px'}}>
      <span>Related Materials (optional)</span>
      <${Button} variant="primary" onClick=${addRelatedMaterials}>Add</${Button}>
    </div>
    ${modalData.relatedMaterials.length > 0 ? html`
      <div style=${{display: 'table'}}>
        <div style=${{display: 'table-header-group'}}>
          <div style=${{display: 'table-row', fontWeight: '400'}}>
            <div style=${{display: 'table-cell', paddingBottom: '10px'}}>URL</div>
            <div style=${{display: 'table-cell'}}>Link Label (optional)</div>
            <div style=${{display: 'table-cell'}}></div>
          </div>
        </div>
        <div style=${{display: 'table-row-group'}}>
          ${modalData.relatedMaterials.map((relatedMaterials, i) => html`
            <div style=${{display: 'table-row'}} key=${i}>
              <div style=${{display: 'table-cell', paddingRight: '15px'}}>
                <${TextControl} 
                  value=${relatedMaterials.value}
                  onChange=${v => setRelatedMaterial(v, i, 'value')}
                />
              </div>
              <div style=${{display: 'table-cell', paddingRight: '15px'}}>
                <${TextControl} 
                  value=${relatedMaterials.label}
                  onChange=${v => setRelatedMaterial(v, i, 'label')}
                />
              </div>
              <div style=${{display: 'table-cell'}}>
                <${Button} isDestructive=${true} onClick=${() => removeRelatedMaterials(i)} variant='link'>delete</${Button}>
              </div>                
            </div>
          `)}
        </div>
      </div>
    ` : html`
    <div>
        <${Text} isBlock=${true} variant="muted" style=${{marginBottom: '15px'}}>
          You don't have any related materials listed.
        </${Text}>
    </div>
    `}
  </div>
  `;

  return html`
    <div ...${ blockProps }>
      <li onClick=${onCareerClicked} className="clickable job-posting">
        <a href="${attributes.link}"><strong>${attributes.title}</strong></a><br/>
        ${attributes.description.length > 0 && html`
          <span className="subtext">${attributes.description}</span><br/>
        `}
        <span className="subtext"><strong>Salary: </strong> ${currency.format(attributes.salaryMin)} - ${currency.format(attributes.salaryMax)}/<span style=${{ textTransform: 'capitalize' }}>${attributes.salaryFrequency.toLowerCase()}</span></span><br/>
        <span className="subtext"><strong>Final Filing Date:</strong> ${attributes.finalFilingDate ? new Date(attributes.finalFilingDate).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) : ''}</span><br/>

        ${attributes.relatedMaterials.length > 0 && html`
          <span className="subtext"><strong>Related Materials:</strong> 
            <ul className="list--pipe" style=${{ display: 'inline-block', paddingLeft: '.5em'}}>
            ${attributes.relatedMaterials.map((material, i) => html`
              <li key=${i}>
                <a href="${ material.value }">
                    ${ material.label || material.value }
                </a>
              </li>
            `)}
            </ul>
          </span>
        `}
      </li>

      ${modalIsOpen && html`
        <${Modal} title=${modalMode + " Career"} onRequestClose=${closeModal}>
          <div>
            <${TextControl} 
              label="Job Title"
              value=${modalData.title}
              onChange=${onModalTitleChange}
            />
            <${TextareaControl}
                label="Description (optional)"
                value=${modalData.description} 
                onChange=${onModalDescriptionChange}
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
            
            ${relatedMaterialsSection()}
            
            <div style=${{ height: '2rem' }}>
              <span>Filing Date</span>
              <div style=${{ display: 'inline-block', float: 'right' }}>
                <${CheckboxControl}
                    label="Open until filled"
                    checked=${ modalData.startFilingDateChecked }
                    onChange=${ onStartFilingDateChange }
                />
              </div>
            </div>

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