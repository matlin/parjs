import {ParjsParserAction} from "../../../base/action";
import {Chars, Codes} from "../../../functions/char-indicators";
import {Parselets} from './parselets';
import {FastMath} from "../../../functions/math";
/**
 * Created by User on 28-Nov-16.
 */

/*
    Legal decimal integer format:
    (-|+)\d+
 */

export class PrsInt extends ParjsParserAction {
    displayName = "int";
    isLoud = true;
    expecting : string;
    constructor(private signed : boolean, private base : number) {
        super();
        if (base > 36) {
            throw new Error("invalid base");
        }
        this.expecting = `a ${signed ? "signed" : "unsigned"} integer in base ${base}`;
    }
    _apply(ps : ParsingState) {
        let {signed, base} = this;
        let {position, input} = ps;
        let sign = Parselets.parseSign(ps);
        sign = sign === 0 ? 1 : sign;
        let value = Parselets.parseDigits(ps, base, FastMath.PositiveExponents);
        ps.position = position;
        ps.value = value;
        ps.result = ResultKind.OK;
        return;
    }
}