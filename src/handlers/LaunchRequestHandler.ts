import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, Intents, Request } from "../utils";

@Request("LaunchRequest")
@Intents("FasterIntent",
  "SlowerIntent",
  "InfoIntent",
  "AMAZON.YesIntent",
  "AMAZON.NoIntent",
  "AMAZON.FallbackIntent")
export class LaunchRequestHandler extends BaseIntentHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const session = handlerInput.requestEnvelope.session;
    return super.canHandle(handlerInput) || (session && session.new);
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const t = handlerInput.attributesManager.getRequestAttributes().t;
    const responseBuilder = handlerInput.responseBuilder;

    return responseBuilder
      .speak(t("help.reprompt"))
      .reprompt(t("help.reprompt"))
      .getResponse();
  }
}
