angular.module('caelum.directives', [])

    .directive('caInplace', function($timeout) {

        return function(scope, element, attrs) {
            var text = element.find('div').eq(0);
            var input = element.find('input').eq(0);

            $timeout(function() {
                if (input.val()) {
                    hideInput(input, text);
                } else {
                    showInput(input, text);
                }
            });

            input.bind('blur', function() {
                hideInput(input, text);
                scope.$apply(attrs.caInplace);
            });

            input.bind('keydown', function(e) {
                if (e.which === 13 || e.which === 27) {
                    hideInput(input, text);
                    if (e.which === 13) {
                        scope.$apply(attrs.caInplace);
                    }
                }
            });

            text.bind('click', function() {
                showInput(input, text)
            })
        }

        function hideInput(input, text) {
            if (input.val()) {
                input.addClass('g-hidden');
                text.removeClass('g-hidden');
            }
        }

        function showInput(input, text) {
            text.addClass('g-hidden');
            input.removeClass('g-hidden');
            input[0].focus();
            input[0].select();
        }
    });

