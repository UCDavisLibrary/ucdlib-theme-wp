export default class BlockSettings {
  static settings = window.UCDBlockSettings;

  static get(key) {
    if ( key ) return this.settings[key];
  }

  static getImage(imageKey) {
    let image = this.settings[`img--${imageKey}`];
    if ( !image ) return; 
    if ( this.settings.imgBase ) image = `${this.settings.imgBase}${image}`;
    return image;
  }
}