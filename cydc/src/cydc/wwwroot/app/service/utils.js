define(["require", "exports", 'jquery'], function (require, exports, $) {
    var service;
    (function (service) {
        var utils = (function () {
            function utils() {
            }
            utils.prototype.delay = function (timeMs) {
                var promise = $.Deferred();
                setTimeout(function () { return promise.resolve(); }, timeMs);
                return promise.promise();
            };
            utils.prototype.confirm = function (text, title) {
                var _this = this;
                var html = "<div class=\"modal fade confirm-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modal-sample\">\n                            <div class=\"modal-dialog\" role=\"document\">\n                                <div class=\"modal-content\">\n                                    <div class=\"modal-header\">\n                                        <h4 class=\"modal-title\" id=\"modal-sample-label\">\n                                            " + title + "\n                                        </h4>\n                                    </div>\n                                    <div class=\"modal-body\">\n                                        " + text + "\n                                    </div>\n                                    <div class=\"modal-footer\">\n                                        <button type=\"button\" class=\"btn btn-info\"\n                                                data-dismiss=\"modal\">\n                                            \u53D6\u6D88\n                                        </button>\n                                        <button type=\"button\" class=\"btn btn-primary\">\n                                            \u786E\u5B9A\n                                        </button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>";
                var $html = $(html);
                $html.appendTo(document.body);
                $html.modal();
                var promise = $.Deferred();
                $html.find('.btn-info').click(function () { return promise.reject(); });
                $html.find('.btn-primary').click(function () { return promise.resolve(); });
                promise.always(function () {
                    _this.delay(1000).then(function () { return $html.remove(); });
                });
                return promise.promise();
            };
            return utils;
        })();
        service.utils = utils;
    })(service || (service = {}));
    return new service.utils();
});
//# sourceMappingURL=utils.js.map