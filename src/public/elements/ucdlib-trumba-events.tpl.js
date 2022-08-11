import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
  `;

  return [elementStyles];
}

export function render() { 
return html`

<div class="trumba-spud" id="trumba_tabs_${this.uid}" data-trumba-spud="trumba_tabs_${this.uid}"></div>

<h2>Library Events</h2>
    
<div class="trumba-spud" id="trumba_main_${this.uid}" data-trumba-spud="trumba_main_${this.uid}"></div>

`;}