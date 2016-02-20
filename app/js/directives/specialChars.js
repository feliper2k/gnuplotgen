'use strict';

let symbolLibrary = {
    characters: [
        "Γ", "Δ", "Θ", "Π", "Σ", "Ψ", "Ω", "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "λ", "μ", "π", "ρ",
        "ℝ", "ℤ", "∈", "∉", "∋", "∌", "∀", "∃", "∑", "∞", "∫", "⊂", "⊃", "–", "—"
    ],
    controls: {
        'sup': '^{2}',       // superscript
        'sub': '_{2}',       // subscript
        'phn': '@',         // phantom block
        'ovr': '~x{0.8—}',       // overscript
        'spc': '&{abc}'        // spacing
    }
};

function SpecialChars($compile) {
    'ngInject';

    let frameTemplate = `
    <md-whiteframe class="md-whiteframe-z4 special__chars-selector" ng-show="frame.show">
        <h4>Symbols</h4>
        <div class="row">
            <md-button ng-click="textfield.insert(char)" class="md-icon-button" md-no-ink ng-repeat="char in library.characters">{{ char }}</md-button>
        </div>
        <h4>Controls</h4>
        <div class="row">
            <md-button ng-click="textfield.insert(value)" md-no-ink class="md-mini" ng-repeat="(name, value) in library.controls">{{ name }}</md-button>
        </div>
    </md-whiteframe>`;

    let $ = require('jquery');

    function controller($scope, $element, $attrs) {
        'ngInject';

        $scope.frame = {
            show: true
        }

        let $textfield = $($element);

        $scope.library = symbolLibrary;
        $scope.textfield = {
            insert: function (str) {
                let caretPosition = $textfield.prop('selectionStart');
                var v = $textfield.val();
                var textBefore = v.substring(0, caretPosition);
                var textAfter  = v.substring(caretPosition, v.length);

                $textfield.val(textBefore + str + textAfter);
            }
        };
    }

    function link(scope, element, attrs) {
        let $elem = $(element);
        let frameElement = $compile(frameTemplate)(scope);

        $('body').append(frameElement);

        $elem.on('focus', function () {
            scope.frame.show = true;
            scope.$apply();

            $(frameElement).css({
                top: ($elem.offset().top + $elem.height()) + 'px',
                left: $elem.offset().left + 'px'
            });
        });

        $elem.on('blur', function () {
            scope.frame.show = false;
            scope.$apply();
        });
    }

    return {
        restrict: 'A',
        link,
        controller
    };
}

export default {
    name: 'specialChars',
    require: 'ngModel',
    fn: SpecialChars
};
