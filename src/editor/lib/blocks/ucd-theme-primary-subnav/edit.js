import { html } from "../../utils";
import { useBlockProps } from '@wordpress/block-editor';

export default ( ) => {
  const blockProps = useBlockProps();
  return html`
  <div ...${ blockProps }>
    <nav className='sub-nav'>
      <h2 className="sub-nav__title">Autogenerated Sidenav</h2>
    <ul className='sub-nav__menu'>
      <li><a >Links will be autogenerated</a></li>
      <li><a>from the primary nav</a></li>
      <li><a>based on the current page</a></li>
    </ul>
    </nav>
  </div>
  `
}