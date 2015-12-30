import $ = require('jquery');
import koval = require('knockout.validation');
import router = require('plugins/router');

module service {
    export class utils {
        delay(timeMs: number) {
            let promise = $.Deferred();
            setTimeout(() => promise.resolve(), timeMs);
            return promise.promise();
        }

        confirm(text: string, title?: string) {
            let html = `<div class="modal fade confirm-modal" tabindex="-1" role="dialog" aria-labelledby="modal-sample">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title" id="modal-sample-label">
                                            ${title}
                                        </h4>
                                    </div>
                                    <div class="modal-body">
                                        ${text}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-info"
                                                data-dismiss="modal">
                                            取消
                                        </button>
                                        <button type="button" class="btn btn-primary">
                                            确定
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            let $html = $(html);
            $html.appendTo(document.body);
            $html.modal();

            var promise = $.Deferred<{ close(): void }>();
            var closeService = {
                close: () => $html.modal('hide')
            };

            $html.find('.btn-primary').click(() => promise.resolve(closeService));
            $html.on('hide.bs.modal', () => promise.reject());
            $html.on('hidden.bs.modal', () => $html.remove());

            return promise.promise();
        }

        urlQuery(query: string) {
            let normalizedQuery = query.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            let regex = new RegExp("[\\?&]" + query + "=([^&#]*)", 'i');
            let results = regex.exec(location.search);
            let final = results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            return final;
        }

        checkValid(vm: any) {
            let errors = koval.group(vm);
            errors.showAllMessages();
            return errors().length == 0;
        }

        navigateToCallbackOrHome() {
            return router.navigate(this.urlQuery('returnUrl') || '/');
        }

        navigateToLogin() {
            return router.navigate('/account/login');
        }
    }
}

export = new service.utils();