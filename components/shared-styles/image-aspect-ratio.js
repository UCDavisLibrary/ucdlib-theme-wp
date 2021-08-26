import { css } from "lit";

/** 
const ratios = [
  {name: css`1x1`, padding: css`100%`},
  {name: css`4x3`, padding: css`75%`},
  {name: css`3x2`, padding: css`66.67%`},
  {name: css`16x9`, padding: css`56.25%`}
];
*/

export default css`
  .aspect--1x1 {
    position: relative;
    width: 100%;
    padding-top: 100%;
  }
  .aspect--1x1 img {
    position: absolute;
    top: 0;
  }
  .aspect--4x3 {
    position: relative;
    width: 100%;
    padding-top: 75%;
  }
  .aspect--4x3 img {
    position: absolute;
    top: 0;
  }
  .aspect--16x9 {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
  }
  .aspect--16x9 img {
    position: absolute;
    top: 0;
  }
`;