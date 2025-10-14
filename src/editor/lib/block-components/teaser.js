import { html } from "../utils";
import { RichText } from '@wordpress/block-editor';

import classnames from 'classnames';

function Teaser({
  editable = false,
  imgSrc,
  hideImage = false,
  hideExcerpt = false,
  hideByline = false,
  hideCategories = false,
  categories = [],
  author = "",
  date = "",
  featured = false,
  color = "",
  title = "",
  excerpt = "",
  onChange
}) {

  const baseClasses = classnames({
    'vm-teaser': true,
    'vm-teaser--featured': featured,
    [`category-brand--${color}`]: color && featured ? true : false
  });


  return html`
    <article className=${baseClasses}>
      ${!hideImage && html`
      <div className="vm-teaser__figure category" style=${{width: '20%', maxWidth: '135px'}}>
        <a style=${{display: 'block', backgroundImage: `url(${imgSrc})`}} className="aspect--1x1 u-background-image">
        </a>
      </div>
      `}
      <div className="vm-teaser__body">
        <div className="vm-teaser__title">
          ${editable ? html`
            <${RichText}
              tagName="a"
              value=${title}
              withoutInteractiveFormatting
              allowedFormats=${[]}
              placeholder="Title..."
              onChange=${ ( text ) => onChange({ title: text }) }
            />
            ` : html`<a>${title}</a>`}
        </div>

        ${!hideByline && html`
          <ul className="vm-teaser__byline">
            ${!!author && html`
              <li><span className="byline">by ${author}</span></li>
            `}
            ${!!date && html`
              <li>${date}</li>
            `}
          </ul>
        `}

        ${(!hideCategories && !!categories?.length) && html`
          <ul className="vm-teaser__categories">
            ${(Array.isArray(categories) ? categories : []).map(c => html`
              <li className=${`vm-teaser__cat-marker ${c.color}`} key=${c.name}>
                <a>${c.name}</a>
              </li>
            `)}
          </ul>
        `}

        ${!hideExcerpt && html`
          <div className="vm-teaser__summary">
            ${editable ? html`
              <${RichText}
                tagName="span"
                value=${excerpt}
                withoutInteractiveFormatting
                allowedFormats=${[]}
                placeholder="Excerpt..."
                onChange=${ ( excerpt ) => onChange({ excerpt }) }
              />
              ` : html`<span>${excerpt}</span>`}
          </div>
        `}
      </div>

    </article>`;
}

export default Teaser;