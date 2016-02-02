define(["require", "exports", 'knockout', 'moment'], function (require, exports, ko, moment) {
    var bindingUtils = (function () {
        function bindingUtils() {
        }
        bindingUtils.prototype.dateTimeText = function (plainTextDate) {
            var time = moment(plainTextDate);
            var now = moment();
            var diffSec = now.diff(time, 'second');
            var diffMin = now.diff(time, 'minute');
            if (diffSec < 0)
                return time.format("YYYY-MM-DD hh:mm:ss");
            if (diffSec < 60)
                return diffSec + "\u79D2\u524D";
            else if (diffMin < 60)
                return diffMin + "\u5206\u949F\u524D";
            else
                return time.format("YYYY-MM-DD hh:mm:ss");
        };
        bindingUtils.prototype.fuck = function () {
        };
        return bindingUtils;
    })();
    var ko_binding = new bindingUtils();
    ko.bindingHandlers['dateTimeText'] = {
        init: function () { controlsDescendantBindings: true; },
        update: function (element, valueAccessor) {
            var plainText = ko.unwrap(valueAccessor());
            var finalText = ko_binding.dateTimeText(plainText);
            ko.utils.setTextContent(element, finalText);
        }
    };
    return ko_binding;
});
