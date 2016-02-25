'use strict';

module.exports = function(verb) {
  verb.preLayout(/\.verb\.md/, function(view, next) {
    if (typeof view.layout === 'undefined' && typeof verb.options.layout !== 'undefined') {
      view.layout = verb.options.layout;
    }
    next();
  });
  verb.extendWith('verb-generator-readme');
};
