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

        it('should set 00:00:00 for undefined', function() {
            expect( this.since() ).to.eql( '00:00:00' );
        });

        it('should set seconds in `0s` format', function() {
            expect( this.since( ms('2s') ) ).to.eql( '00:00:02' );
        });

        it('should set seconds in `ss` format', function() {
            expect( this.since( ms('47s') ) ).to.eql( '00:00:47' );
        });

        it('should fit seconds in 60', function() {
            expect( this.since( ms('72s') ) ).to.eql( '00:01:12' );
        });

        it('should set minutes in `0m` format', function() {
            expect( this.since( ms('2m') ) ).to.eql( '00:02:00' );
        });

        it('should set minutes in `mm` format', function() {
            expect( this.since( ms('47m') ) ).to.eql( '00:47:00' );
        });

        it('should fit minutes in 60', function() {
            expect( this.since( ms('72m') ) ).to.eql( '01:12:00' );
        });

        it('should set hours in `0h` format', function() {
            expect( this.since( ms('2h') ) ).to.eql( '02:00:00' );
        });

        it('should set hours in `hh` format', function() {
            expect( this.since( ms('13h') ) ).to.eql( '13:00:00' );
        });

        it('should show more than 24 hours', function() {
            expect( this.since( ms('72h') ) ).to.eql( '72:00:00' );
        });
    });

});
