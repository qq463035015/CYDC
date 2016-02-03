import ko = require('knockout');
import $ = require('jquery');
import moment = require('moment');

class bindingUtils {
    dateTimeText(plainTextDate: string) {
        let time = moment(plainTextDate);
        let now = moment();

        let diffSec = now.diff(time, 'second');
        let diffMin = now.diff(time, 'minute');
        
        if (diffSec < 0)
            return time.format("YYYY-MM-DD HH:mm:ss");
        if (diffSec < 60)
            return `${diffSec}秒前`;
        else if (diffMin < 60)
            return `${diffMin}分钟前`;
        else
            return time.format("YYYY-MM-DD HH:mm:ss");
    }
    
    fuck() {
    }
}

let ko_binding = new bindingUtils();

ko.bindingHandlers['dateTimeText'] = {
    init: () => { controlsDescendantBindings: true },
    update: (element, valueAccessor) => {
        let plainText = ko.unwrap(valueAccessor());
        let finalText = ko_binding.dateTimeText(plainText);
        ko.utils.setTextContent(element, finalText);
    }
}

export = ko_binding;