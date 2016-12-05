import {ParjsParserAction, ParjsBaseParserAction} from "../../../base/action";
/**
 * Created by User on 22-Nov-16.
 */
export class PrsResult extends ParjsBaseParserAction {
    displayName ="result";
    isLoud = true;
    expecting = "anything";
    constructor(private result : any) {super()}
    _apply(ps : ParsingState) {
        let {result} = this;
        ps.value = result;
        ps.result = ResultKind.OK;
    }
}