var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function (path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start,
  paths: {
    jquery: 'vendor/assets/components/jquery/dist/jquery',
    jqueryui: 'vendor/assets/javascripts/jqueryui/jquery-ui-1.10.4.custom',
    selectToSlider: 'vendor/assets/javascripts/select_to_slider/selectToUISlider.jQuery',
    'modules/adjust_income': 'app/assets/javascripts/pensions_calculator/modules/adjust_income'
  }

});
