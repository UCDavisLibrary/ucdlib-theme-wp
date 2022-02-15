import { css } from "lit";

export default class StyleUtils {
  static extractStyleModifiers(classes){
    const customStyles = classes.split(" ").filter(c => c.startsWith('is-style')).map(c => c.replace("is-style-", ""));
    return customStyles.join(" ");
  }

  static CssUnstyledInput = css`
    input {
      border: none;
      text-align: inherit;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      color: inherit;
      background-color: inherit;
      padding: 0;
      margin: 0;
      width: 100%;
    }
    input:focus {
      border: none;
    }
  `;
}