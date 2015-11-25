import $ = require('jquery');

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

            var promise = $.Deferred();

            $html.find('.btn-info').click(() => promise.reject());
            $html.find('.btn-primary').click(() => promise.resolve());

            promise.always(() => {
                this.delay(1000).then(() => $html.remove());
            });

            return promise.promise();
        }
    }
}

export = new service.utils();