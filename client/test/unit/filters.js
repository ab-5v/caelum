describe('filters', function() {

    beforeEach(angular.mock.module('caelum'));

    describe('since', function() {

        beforeEach(function() {
            var that = this;

            angular.mock.inject(function($filter) {
                that.since = $filter('since');
            });
        });

        it('should be defined', function() {
            expect(this.since).not.to.equal(null);
        });

        it('should set 00:00 for undefined', function() {
            expect( this.since() ).to.eql( '00:00' );
        });

    });

});
