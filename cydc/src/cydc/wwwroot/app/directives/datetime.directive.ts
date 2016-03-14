module Cydc.Directives {
    class DateTimeController {
        $inject = [];
        constructor() {
        }

        init(initVal: string) {
            this.val = this.diffTime(initVal);
        }

        diffTime(initVal: string) {
            let diff = moment.duration(moment().diff(initVal));
            if (diff.asSeconds() < 60) {
                return `${diff.asSeconds().toFixed(1)} 秒前`;
            } else if (diff.asMinutes() < 60) {
                return `${diff.asMinutes().toFixed(1)} 分钟前`;
            } else if (diff.asHours() < 24) {
                return `${diff.asHours().toFixed(1)} 小时前`;
            } else {
                return moment(initVal).format("YYYY/MM/DD HH:mm:ss");
            }
        }

        val = "";

        static template = `{{vm.val}}`;
    }

    class DateTimeDirective implements ng.IDirective {
        static instance() {
            return new DateTimeDirective();
        }

        restrict = "A";
        controller = DateTimeController;
        controllerAs = "vm";
        template = DateTimeController.template;

        link(
            scope: ng.IScope,
            element: ng.IAugmentedJQuery,
            attr: IDateTimeAttribute,
            controller: DateTimeController,
            transclude: ng.ITranscludeFunction
        ) {
            controller.init(attr.dateTime);
        }
    }

    interface IDateTimeAttribute extends ng.IAttributes {
        dateTime: string;
    }

    angular.module("Cydc.Directives", []).directive("dateTime", DateTimeDirective.instance);
}