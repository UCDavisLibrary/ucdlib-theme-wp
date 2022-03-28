import { html, css } from 'lit';

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    .iconset {
      margin-bottom: 1rem;
    }
    .icons {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
    }
    ucdlib-icon {
      width: 24px;
      height: 24px;
      min-width: 24px;
      min-height: 24px;
      transition: .2s;
    }
    .icon-wrapper:hover {
      color: var(--wp-admin-theme-color);
    }
    .icon-wrapper.selected {
      color: var(--wp-admin-theme-color);
    }
    .icon-wrapper {
      text-align: center;
      width: 9em;
      min-width: 9em;
      margin: 1em 0.5em;
      display: flex;
      flex-flow: column;
      align-items: center;
      cursor: pointer;
    }
    .icon-label {
      margin-top: 0.5em;
      font-size: 10px;
    }
    .search-container {
      display: flex;
      justify-content: center;
    }
    .search-container label {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
      text-align: center;
    }
  `;

  return [elementStyles];
}

export function render() { 
return html`
  <div class="search-container">
    <div>
      <label for="search">Search Icons</label>
      <input 
        .name="search"
        @input=${this._onSearch}
        .value=${this.searchTerm}>
    </div>
  </div>
  ${this._displayedIcons.map(iconSet => html`
  <div class="iconset">
    <h2>${iconSet.title}</h2>
    <div class="icons">
      ${iconSet.icons.map(icon => html`
        <a 
          @click=${e => this._onIconClick(icon, iconSet.name) } 
          class="icon-wrapper ${this._iconIsSelected(icon, iconSet.name) ? 'selected' : ''}">
          <ucdlib-icon icon="${iconSet.name}:${icon}"></ucdlib-icon>
          <div class="icon-label">${icon}</div>
        </a>
      `)}
    </div>
  </div>
  `)}

`;}