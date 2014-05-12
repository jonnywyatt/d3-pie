describe('adjust target retirement income', function () {

  'use strict';

  before(function (done) {
    var self = this;
    this.server = sinon.fakeServer.create();
    this.server.respondWith('GET', 'testpath',
      [200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(
        { 'description': 'test' }
      )]);

    requirejs(
        ['jquery', 'modules/adjust_income'],
        function ($, mod) {

          self.$html = $('<form action="testpath">' +
              '<select><option>1</option><option>2</option></select>' +
              '<div class="js-description"></div>' +
              '</form>');
          self.$select = self.$html.find('select');
          self.$description = self.$html.find('.js-description');
          $.fn.selectToUISlider = function () {
            return this;
          };
          mod.init(self.$select);
          done();
        }, done);
  });

  after(function () {
    this.server.restore();
  });

  describe('when initiated', function () {
    it('return false if no trigger elements in DOM', function () {
      this.$select.trigger('change');
      this.server.respond();
      assert.equal(this.$description.html(), 'test');
    });
  });

});

