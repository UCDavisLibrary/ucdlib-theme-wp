import { html } from "lit";
import { renderIconSet } from "@ucd-lib/theme-elements/ucdlib/ucdlib-icons/utils.js";

const template = html`
  
  <svg><defs>
    <g id="button" viewBox="0 0 24 24">
  <path d="M2,8.63v8H22v-8Zm4.65,4.16L4.87,14.57a.23.23,0,0,1-.31,0l-.21-.21a.21.21,0,0,1,0-.31l1.41-1.42L4.35,11.21a.21.21,0,0,1,0-.31l.21-.21a.23.23,0,0,1,.31,0l1.78,1.78A.22.22,0,0,1,6.65,12.79Z"/>
</g>
<g id="code" viewBox="0 0 24 24">
  <path d="M14.52,6.28l-3.4,11.9a.85.85,0,1,1-1.64-.46l3.4-11.9a.85.85,0,0,1,1.64.46Zm2.76,2.14,3,3a.85.85,0,0,1,0,1.2l-3,3a.85.85,0,1,1-1.2-1.21L18.45,12,16.08,9.63a.85.85,0,0,1,1.2-1.21ZM7.93,9.63,5.55,12l2.38,2.37a.86.86,0,0,1-1.21,1.21l-3-3a.85.85,0,0,1,0-1.2l3-3A.86.86,0,0,1,7.93,9.63Z"/>
</g>
<g id="columns" viewBox="0 0 24 24">
  <rect x="9.33" y="9.33" width="5.33" height="5.33"/>
  <rect x="16.67" y="9.33" width="5.33" height="5.33"/>
  <rect x="2" y="9.33" width="5.33" height="5.33"/>
  <rect x="7.5" y="16.67" width="3.5" height="5.33"/>
  <rect x="2" y="16.67" width="3.5" height="5.33"/>
  <rect x="18.5" y="16.67" width="3.5" height="5.33"/>
  <rect x="13" y="16.67" width="3.5" height="5.33"/>
  <rect x="2" y="2" width="9" height="5.33"/>
  <rect x="13" y="2" width="9" height="5.33"/>
</g>
<g id="container" viewBox="0 0 24 24">
  <path d="M21,8v8H3V8H21m1-1H2V17H22V7Z"/>
  <rect x="2" y="2" width="20" height="4"/>
  <polygon points="5.6 9.79 5.6 11.53 5.6 15 18.4 15 18.4 11.53 18.4 9.79 18.4 9 5.6 9 5.6 9.79"/>
  <polygon points="2 18.53 2 19.68 2 22 22 22 22 19.68 22 18.53 22 18 2 18 2 18.53"/>
</g>
<g id="content-with-sidebar" viewBox="0 0 24 24">
  <rect x="16.67" y="2" width="5.33" height="20"/>
  <polygon points="13 2 9.33 2 2 2 2 22 9.33 22 13 22 14.67 22 14.67 2 13 2"/>
</g>
<g id="faq-section" viewBox="0 0 24 24">
  <path d="M2,4V20H22V4ZM8,6.37,6.24,8.15a.21.21,0,0,1-.31,0L4.15,6.37a.21.21,0,0,1,0-.31l.2-.21a.22.22,0,0,1,.32,0L6.08,7.26,7.5,5.85a.21.21,0,0,1,.31,0L8,6.06A.23.23,0,0,1,8,6.37ZM21,19H3V10H21Z"/>
  <rect x="4.34" y="12.21" width="15" height="1.6"/>
  <rect x="4.34" y="15.21" width="8" height="1.6"/>
</g>
<g id="focal-link" viewBox="0 0 24 24">
  <path d="M5.16,8a4,4,0,1,0,4,4A4,4,0,0,0,5.16,8Zm2.17,3.62-.89.87.21,1.22a.27.27,0,0,1-.39.29l-1.1-.58L4.06,14a.28.28,0,0,1-.39-.29l.21-1.22L3,11.62a.27.27,0,0,1,.14-.46L4.37,11l.55-1.11a.28.28,0,0,1,.49,0L6,11l1.23.18A.27.27,0,0,1,7.33,11.62Z"/>
  <rect x="11.84" y="11.36" width="11" height="1.6"/>
</g>
<g id="heading-fancy" viewBox="0 0 24 24">
  <path d="M15,10.26H9v5.32H6.31V2.91H9v5h6v-5h2.72V15.58H15Z"/>
  <circle cx="6.53" cy="20.06" r="1.03"/>
  <circle cx="10.18" cy="20.06" r="1.03"/>
  <circle cx="13.82" cy="20.06" r="1.03"/>
  <circle cx="17.47" cy="20.06" r="1.03"/>
</g>
<g id="heading" viewBox="0 0 24 24">
  <path d="M15,13H9v5.32H6.31V5.66H9v5h6v-5h2.72V18.34H15Z"/>
</g>
<g id="list" viewBox="0 0 24 24">
  <rect x="1.96" y="3" width="3" height="3" rx="1.5"/>
  <rect x="6.49" y="3.69" width="15.55" height="1.6"/>
  <rect x="6.49" y="8" width="3" height="3" rx="1.5"/>
  <rect x="11.02" y="8.69" width="11.02" height="1.6"/>
  <rect x="1.96" y="13" width="3" height="3" rx="1.5"/>
  <rect x="6.49" y="13.69" width="15.55" height="1.6"/>
  <rect x="1.96" y="18" width="3" height="3" rx="1.5"/>
  <rect x="6.49" y="18.69" width="15.55" height="1.6"/>
</g>
<g id="marketing-highlight-hor" viewBox="0 0 24 24">
  <rect x="2" y="17.07" width="20" height="4"/>
  <path d="M2,2.93v13H22v-13Zm14.34,6-1.78,1.73L15,13.11a.54.54,0,0,1-.78.57L12,12.52,9.8,13.68A.54.54,0,0,1,9,13.11l.42-2.45L7.66,8.93A.54.54,0,0,1,8,8l2.46-.36,1.1-2.22a.53.53,0,0,1,1,0l1.1,2.22L16,8A.54.54,0,0,1,16.34,8.93Z"/>
</g>
<g id="marketing-highlight" viewBox="0 0 24 24">
  <rect x="2" y="19.17" width="10" height="3"/>
  <rect x="2" y="16.31" width="20" height="1.6"/>
  <polygon points="14.22 15 22 15 22 12.5 15.17 12.5 14.22 15"/>
  <path d="M2,2V15H13.15L14,12.66l-2-1.07L9.8,12.74A.54.54,0,0,1,9,12.18l.42-2.45L7.66,8A.54.54,0,0,1,8,7.08l2.46-.36,1.1-2.23a.54.54,0,0,1,1,0l1.1,2.23L16,7.08a.54.54,0,0,1,.3.92L14.56,9.73l.3,1.77H22V2Z"/>
</g>
<g id="media-link" viewBox="0 0 24 24">
  <path d="M1.16,8v8h8V8Zm6.17,3.62-.89.87.21,1.22a.27.27,0,0,1-.39.29l-1.1-.58L4.06,14a.28.28,0,0,1-.39-.29l.21-1.22L3,11.62a.27.27,0,0,1,.14-.46L4.37,11l.55-1.11a.28.28,0,0,1,.49,0L6,11l1.23.18A.27.27,0,0,1,7.33,11.62Z"/>
  <rect x="10.84" y="13.36" width="12" height="1.6"/>
  <rect x="10.84" y="9.5" width="8.16" height="2.5"/>
</g>
<g id="object-box" viewBox="0 0 24 24">
  <path d="M5.6,8v8H3V8H5.6m1-1H2V17H6.6V7Z"/>
  <rect x="2" y="2" width="20" height="4"/>
  <rect x="7.6" y="7" width="14.4" height="10"/>
  <polygon points="2 18.53 2 19.68 2 22 22 22 22 19.68 22 18.53 22 18 2 18 2 18.53"/>
</g>
<g id="panel-with-icon" viewBox="0 0 24 24">
  <path d="M3.76,1.83,3,3.31l-1.64.24a.36.36,0,0,0-.2.61L2.38,5.32,2.1,7a.36.36,0,0,0,.52.38l1.46-.77,1.47.77A.36.36,0,0,0,6.07,7L5.79,5.32,7,4.16a.35.35,0,0,0-.2-.61L5.14,3.31,4.4,1.83a.35.35,0,0,0-.64,0Z"/>
  <rect x="8.92" y="3.99" width="13.84" height="1.6"/>
  <rect x="1.92" y="19.08" width="3" height="3" rx="1.5"/>
  <rect x="1.92" y="9.12" width="21" height="7.79"/>
  <rect x="6.45" y="19.79" width="7.47" height="1.6"/>
</g>
<g id="paragragh" viewBox="0 0 24 24">
  <path d="M18.19,5.85a.88.88,0,0,1-.88.9h-.87V18.12a.87.87,0,0,1-.85.88.91.91,0,0,1-.9-.88V6.75H12.81V18.12A.87.87,0,0,1,12,19a.91.91,0,0,1-.9-.88V13.75h-.68A4.51,4.51,0,0,1,5.83,9.8,4.37,4.37,0,0,1,10.16,5h7.13A.87.87,0,0,1,18.19,5.85Z"/>
</g>
<g id="poster-list" viewBox="0 0 24 24">
  <path d="M1,2v6.5H11V2ZM8.17,5l-.89.87.21,1.23a.27.27,0,0,1-.39.28L6,6.76l-1.1.58a.27.27,0,0,1-.39-.28l.21-1.23L3.83,5A.26.26,0,0,1,4,4.51l1.23-.18.55-1.12a.27.27,0,0,1,.48,0l.55,1.12L8,4.51A.26.26,0,0,1,8.17,5Z"/>
  <path d="M1,9v2H11V9Zm1.38,1.71v-.5H1.53V9.83h.85V9.32l1,.71Z"/>
  <path d="M13,2v6.5H23V2Zm7.17,3-.89.87.21,1.23a.27.27,0,0,1-.39.28L18,6.76l-1.1.58a.27.27,0,0,1-.39-.28l.21-1.23L15.83,5A.26.26,0,0,1,16,4.51l1.23-.18.55-1.12a.27.27,0,0,1,.48,0l.55,1.12L20,4.51A.26.26,0,0,1,20.17,5Z"/>
  <path d="M13,9v2H23V9Zm1.38,1.71v-.5h-.85V9.83h.85V9.32l1,.71Z"/>
  <path d="M1,13v6.5H11V13Zm7.17,3-.89.87.21,1.23a.27.27,0,0,1-.39.28L6,17.76l-1.1.58a.27.27,0,0,1-.39-.28l.21-1.23L3.83,16A.26.26,0,0,1,4,15.51l1.23-.18.55-1.12a.27.27,0,0,1,.48,0l.55,1.12L8,15.51A.26.26,0,0,1,8.17,16Z"/>
  <path d="M1,20v2H11V20Zm1.38,1.71v-.5H1.53v-.41h.85v-.51l1,.71Z"/>
  <path d="M13,13v6.5H23V13Zm7.17,3-.89.87.21,1.23a.27.27,0,0,1-.39.28L18,17.76l-1.1.58a.27.27,0,0,1-.39-.28l.21-1.23L15.83,16a.26.26,0,0,1,.15-.45l1.23-.18.55-1.12a.27.27,0,0,1,.48,0l.55,1.12,1.23.18A.26.26,0,0,1,20.17,16Z"/>
  <path d="M13,20v2H23V20Zm1.38,1.71v-.5h-.85v-.41h.85v-.51l1,.71Z"/>
</g>
<g id="poster" viewBox="0 0 24 24">
  <path d="M2,2.93v13H22v-13Zm14.34,6-1.78,1.73L15,13.11a.54.54,0,0,1-.78.57L12,12.52,9.8,13.68A.54.54,0,0,1,9,13.11l.42-2.45L7.66,8.93A.54.54,0,0,1,8,8l2.46-.36,1.1-2.22a.53.53,0,0,1,1,0l1.1,2.22L16,8A.54.54,0,0,1,16.34,8.93Z"/>
  <path d="M2,17.07v4H22v-4Zm2.77,3.42v-1H3.06v-.81H4.77v-1l2,1.42Z"/>
</g>
<g id="prefixed-icon-link" viewBox="0 0 24 24">
  <path d="M3.84,9.2l-.73,1.49-1.64.24a.36.36,0,0,0-.2.61l1.19,1.15-.28,1.64a.36.36,0,0,0,.52.37l1.46-.77,1.47.77a.36.36,0,0,0,.52-.37l-.28-1.64,1.19-1.15a.36.36,0,0,0-.2-.61l-1.64-.24L4.49,9.2a.37.37,0,0,0-.65,0Z"/>
  <rect x="9" y="11.36" width="13.84" height="1.6"/>
</g>
<g id="priority-link" viewBox="0 0 24 24">
  <rect x="4.5" y="19.29" width="15" height="1.6"/>
  <path d="M11.93,3.11a6.5,6.5,0,1,0,6.5,6.5A6.5,6.5,0,0,0,11.93,3.11Zm3.86,5.8-1.58,1.54.37,2.18a.48.48,0,0,1-.69.5l-2-1-1.95,1a.47.47,0,0,1-.69-.5l.37-2.18L8.08,8.91a.47.47,0,0,1,.26-.81l2.19-.32,1-2a.48.48,0,0,1,.86,0l1,2,2.18.32A.47.47,0,0,1,15.79,8.91Z"/>
</g>
<g id="quad-layout" viewBox="0 0 24 24">
  <rect x="2" y="3.83" width="9" height="7.33"/>
  <rect x="13" y="3.83" width="9" height="7.33"/>
  <rect x="2" y="12.83" width="9" height="7.33"/>
  <rect x="13" y="12.83" width="9" height="7.33"/>
</g>
<g id="quote" viewBox="0 0 24 24">
  <path d="M11,8.25A6.55,6.55,0,0,0,8,11.83a1.76,1.76,0,0,1,.75-.11,2.56,2.56,0,0,1,2.57,2.71,3,3,0,0,1-3,3C6.58,17.42,5,16,5,13.57a8.61,8.61,0,0,1,3.89-7Zm7.7,0a6.38,6.38,0,0,0-2.94,3.58,1.76,1.76,0,0,1,.75-.11A2.55,2.55,0,0,1,19,14.43a3,3,0,0,1-3,3c-1.78,0-3.32-1.4-3.32-3.85a8.57,8.57,0,0,1,3.85-7Z"/>
</g>
<g id="spacer" viewBox="0 0 24 24">
  <rect x="10.98" y="5.65" width="2.05" height="3.44"/>
  <rect x="10.98" y="14.92" width="2.05" height="3.44"/>
  <rect x="2" y="11" width="20" height="2"/>
  <polygon points="15.57 6.11 12 1.08 8.43 6.11 15.57 6.11"/>
  <polygon points="8.43 17.89 12 22.92 15.57 17.89 8.43 17.89"/>
</g>
<g id="table" viewBox="0 0 24 24">
  <path d="M20.4,5.6V18.4H3.6V5.6H20.4M22,4H2V20H22V4Z"/>
  <line x1="12" y1="9" x2="12" y2="19.58" style="stroke:#000;stroke-miterlimit:10;stroke-width:1.6px"/>
  <line x1="22" y1="14.4" x2="2" y2="14.4" style="stroke:#000;stroke-miterlimit:10;stroke-width:1.6px"/>
  <line x1="22" y1="9.6" x2="2" y2="9.6" style="stroke:#000;stroke-miterlimit:10;stroke-width:1.6px"/>
</g>
<g id="teaser" viewBox="0 0 24 24">
  <path d="M1.16,8v8h8V8Zm6.17,3.62-.89.87.21,1.22a.27.27,0,0,1-.39.29l-1.1-.58L4.06,14a.28.28,0,0,1-.39-.29l.21-1.22L3,11.62a.27.27,0,0,1,.14-.46L4.37,11l.55-1.11a.28.28,0,0,1,.49,0L6,11l1.23.18A.27.27,0,0,1,7.33,11.62Z"/>
  <rect x="10.84" y="11.36" width="12" height="1.6"/>
  <rect x="10.84" y="8.36" width="12" height="1.6"/>
  <rect x="10.84" y="14.36" width="8.16" height="1.6"/>
</g>
  </defs></svg>`;

renderIconSet(template, "blocks", 24, "Blocks");