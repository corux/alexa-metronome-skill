import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, getAvailableBpm, Intents } from "../utils";

@Intents("AMAZON.HelpIntent")
export class AmazonHelpIntentHandler extends BaseIntentHandler {
  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const t = handlerInput.attributesManager.getRequestAttributes().t;
    const bpms = await getAvailableBpm();

    return handlerInput.responseBuilder
      .speak(`${t("help.text", Math.min(...bpms), Math.max(...bpms))} ${t("help.reprompt")}`)
      .reprompt(t("help.reprompt"))
      .getResponse();
  }
}
