import { categoryBrands } from "@ucd-lib/theme-sass/colors";

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

  static getWatercolor(color="light-blue", pattern=1){
    console.log(color, pattern);
    if (!color || !pattern ) return "";
    return `${this.settings.watercolorBase}${color}--${pattern}.png`;
  }

  static getImageByAspectRatio(aspectRatio){
    let image;
    if ( this.settings.imgByAspectRatio && this.settings.imgByAspectRatio[aspectRatio]){
      image = this.settings.imgByAspectRatio[aspectRatio];
    }
    if ( !image ) return;
    if ( this.settings.imgBase ) image = `${this.settings.imgBase}${image}`;
    return image;
  }

  static getBlockColors(blockSlug) {
    if ( !blockSlug || !this.settings[`color--${blockSlug}`] ) return Object.values(categoryBrands);
    let colors = [];
    if ( Array.isArray(this.settings[`color--${blockSlug}`]) ) {
      colors = this.settings[`color--${blockSlug}`];
    } else {
      colors = this.settings[this.settings[`color--${blockSlug}`]];
      if ( !colors ) return Object.values(categoryBrands);
    }

    return Object.values(categoryBrands).filter(c => colors.includes(c.id));
    
  }
}