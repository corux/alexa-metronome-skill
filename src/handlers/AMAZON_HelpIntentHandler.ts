import { BaseRequestHandler, IExtendedHandlerInput, Intents } from "@corux/ask-extensions";
import { Response } from "ask-sdk-model";
import { getAvailableBpm } from "../utils";

@Intents("AMAZON.HelpIntent")
export class AmazonHelpIntentHandler extends BaseRequestHandler {
  public async handle(handlerInput: IExtendedHandlerInput): Promise<Response> {
    const t: any = handlerInput.t;
    const bpms = await getAvailableBpm();

    return handlerInput.getResponseBuilder()
      .speak(`${t("help.text", Math.min(...bpms), Math.max(...bpms))} ${t("help.reprompt")}`)
      .reprompt(t("help.reprompt"))
      .getResponse();
  }
}
