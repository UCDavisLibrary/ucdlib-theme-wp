import missingGuide from './missing-guide.js'
import contra from './contra.js'

/**
 * Register your scripts here.  Should be a regex pattern to a script
 */

const registration = {
  missingGuide : {
    exec : missingGuide,
    regex : /^\/guide-missing(\?|\/).*/
  },
  contra : {
    exec : contra,
    regex : /^\/directory\/online-strategy\/?/
  }
}

class PageScriptExecutor {

  constructor() {
    this.loaded = {};
  }


  async load() {
    for( let key in registration ) {
      let script = registration[key];

      // check if script should run on page
      if( window.location.pathname.match(script.regex) ) {
        
        // check if we are dynamic loading or just executing
        if( typeof script.exec === 'string' ) {
          let exec = await this.loadScript(script.exec);
          exec();
        } else {
          script.exec();
        }
      }
    }
  }

  loadScript(scriptName) {
    if( typeof scriptName !== 'string' ) return;
    if( this.loaded[scriptName] ) return this.loaded[scriptName];

    // Do dynamic loading there, ex:
    // if( scriptName === 'lodash' ) {
    //  this.loaded[scriptName] = import(/* webpackChunkName: "lodash" */ 'lodash');
    // }
    
    return this.loaded[scriptName]
  }

}

let instance = new PageScriptExecutor();

if( document.readyState === 'complete' ) {
  instance.load();
} else {
  window.addEventListener('load', () => {
    instance.load();
  });
}