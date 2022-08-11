import { html } from "../../utils";
import "./ucd-wp-icon-picker";
import { Modal } from '@wordpress/components';
import { 
  useState, 
  Fragment, 
  forwardRef, 
  useRef,
  useEffect,
  useImperativeHandle } from '@wordpress/element';

const IconPicker = forwardRef((props, ref) => {
  const mainEleRef = useRef();
  const [ isOpen, setOpen ] = useState( false );
  const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal
  }));

  useEffect(() => {
    let mainEle = null;
    if ( mainEleRef.current ) {
      mainEleRef.current.addEventListener('icon-select', _onIconSelect);
      mainEle = mainEleRef.current;
    }
    return () => {
      if ( mainEle ) {
        mainEle.removeEventListener('icon-select', _onIconSelect);
      }
    };
  });

  const _onIconSelect = (e) => {
    closeModal();
    if ( props.onChange ) {
      props.onChange(e.detail);
    }
  }

  const mainEleProps = () => {
    let p = {ref: mainEleRef};
    if ( props.iconSets ){
      if ( Array.isArray(props.iconSets) ) {
        p['icon-sets'] = JSON.stringify(props.iconSets)
      } else {
        p['icon-sets'] = props.iconSets;
      }
    }
    if ( props.selectedIcon ){
      p['selected'] = props.selectedIcon;
    }

    return p;
  }


  return html`
    <${Fragment}>
      ${isOpen && html`
      <${Modal} isFullScreen title="Choose an Icon" onRequestClose=${ closeModal }>
        <ucd-wp-icon-picker ...${ mainEleProps() }></ucd-wp-icon-picker>
				</${Modal}>
      `}
    </${Fragment}>
  `;

})

export default IconPicker