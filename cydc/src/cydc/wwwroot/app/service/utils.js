define(["require", "exports", 'jquery', 'knockout.validation'], function (require, exports, $, koval) {
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
                var html = "<div class=\"modal fade confirm-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modal-sample\">\n                            <div class=\"modal-dialog\" role=\"document\">\n                                <div class=\"modal-content\">\n                                    <div class=\"modal-header\">\n                                        <h4 class=\"modal-title\" id=\"modal-sample-label\">\n                                            " + title + "\n                                        </h4>\n                                    </div>\n                                    <div class=\"modal-body\">\n                                        " + text + "\n                                    </div>\n                                    <div class=\"modal-footer\">\n                                        <button type=\"button\" class=\"btn btn-info\"\n                                                data-dismiss=\"modal\">\n                                            \u53D6\u6D88\n                                        </button>\n                                        <button type=\"button\" class=\"btn btn-primary\">\n                                            \u786E\u5B9A\n                                        </button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>";
                var $html = $(html);
                $html.appendTo(document.body);
                $html.modal();
                var promise = $.Deferred();
                var closeService = {
                    close: function () { return $html.modal('hide'); }
                };
                $html.find('.btn-primary').click(function () { return promise.resolve(closeService); });
                $html.on('hide.bs.modal', function () { return promise.reject(); });
                $html.on('hidden.bs.modal', function () { return $html.remove(); });
                return promise.promise();
            };
            utils.prototype.urlQuery = function (query) {
                var normalizedQuery = query.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + query + "=([^&#]*)", 'i');
                var results = regex.exec(location.search);
                var final = results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                return final;
            };
            utils.prototype.checkValid = function (vm) {
                var errors = koval.group(vm);
                errors.showAllMessages();
                return errors().length == 0;
            };
            utils.prototype.navigateToCallbackOrHome = function () {
                location.assign(this.urlQuery('returnUrl') || '/');
            };
            utils.prototype.navigateToLogin = function () {
                location.assign('/account/login');
            };
            return utils;
        })();
        service.utils = utils;
    })(service || (service = {}));
    return new service.utils();
});
