var Cydc;
(function (Cydc) {
    var Directives;
    (function (Directives) {
        var DateTimeController = (function () {
            function DateTimeController() {
                this.$inject = [];
                this.val = "";
            }
            DateTimeController.prototype.init = function (initVal) {
                this.val = this.diffTime(initVal);
            };
            DateTimeController.prototype.diffTime = function (initVal) {
                var diff = moment.duration(moment().diff(initVal));
                if (diff.asSeconds() < 60) {
                    return diff.asSeconds().toFixed(1) + " \u79D2\u524D";
                }
                else if (diff.asMinutes() < 60) {
                    return diff.asMinutes().toFixed(1) + " \u5206\u949F\u524D";
                }
                else if (diff.asHours() < 24) {
                    return diff.asHours().toFixed(1) + " \u5C0F\u65F6\u524D";
                }
                else {
                    return moment(initVal).format("YYYY/MM/DD HH:mm:ss");
                }
            };
            DateTimeController.template = "{{vm.val}}";
            return DateTimeController;
        }());
        var DateTimeDirective = (function () {
            function DateTimeDirective() {
                this.restrict = "A";
                this.controller = DateTimeController;
                this.controllerAs = "vm";
                this.template = DateTimeController.template;
            }
            DateTimeDirective.instance = function () {
                return new DateTimeDirective();
            };
            DateTimeDirective.prototype.link = function (scope, element, attr, controller, transclude) {
                controller.init(attr.dateTime);
            };
            return DateTimeDirective;
        }());
        angular.module("Cydc.Directives", []).directive("dateTime", DateTimeDirective.instance);
    })(Directives = Cydc.Directives || (Cydc.Directives = {}));
})(Cydc || (Cydc = {}));
