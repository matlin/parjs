"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var action_1 = require("../../../base/action");
var char_indicators_1 = require("../../../functions/char-indicators");
/**
 * Created by User on 24-Nov-16.
 */
var PrsNewline = (function (_super) {
    __extends(PrsNewline, _super);
    function PrsNewline(matchUnicode) {
        _super.call(this);
        this.matchUnicode = matchUnicode;
        this.displayName = "newline";
        this.isLoud = true;
        this.expecting = matchUnicode ? "a unicode newline string" : "a newline string";
    }
    PrsNewline.prototype._apply = function (ps) {
        var position = ps.position, input = ps.input;
        var matchUnicode = this.matchUnicode;
        if (position >= input.length) {
            ps.result = ResultKind.SoftFail;
            return;
        }
        var charAt = input.charCodeAt(position);
        if (matchUnicode && char_indicators_1.Codes.isUnicodeNewline(charAt)) {
            ps.position++;
            ps.value = input.charAt(position);
        }
        if (charAt === char_indicators_1.Codes.newline) {
            ps.position++;
            ps.value = '\n';
            ps.result = ResultKind.OK;
        }
        else if (charAt === char_indicators_1.Codes.carriageReturn) {
            position++;
            if (position < input.length && input.charCodeAt(position) === char_indicators_1.Codes.newline) {
                ps.position = position + 1;
                ps.value = '\r\n';
                ps.result = ResultKind.OK;
            }
            ps.position = position;
            ps.value = '\r';
            ps.result = ResultKind.OK;
        }
        ps.result = ResultKind.SoftFail;
    };
    return PrsNewline;
}(action_1.ParjsParserAction));
exports.PrsNewline = PrsNewline;
//# sourceMappingURL=newline.js.map