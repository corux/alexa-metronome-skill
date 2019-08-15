import { BaseRequestHandler, IExtendedHandlerInput, Intents, Request } from "@corux/ask-extensions";
import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

@Request("LaunchRequest")
@Intents("FasterIntent",
  "SlowerIntent",
  "InfoIntent",
  "AMAZON.YesIntent",
  "AMAZON.NoIntent",
  "AMAZON.FallbackIntent")
export class LaunchRequestHandler extends BaseRequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const session = handlerInput.requestEnvelope.session;
    return super.canHandle(handlerInput) || (session && session.new);
  }

  public async handle(handlerInput: IExtendedHandlerInput): Promise<Response> {
    const t = handlerInput.t;

    return handlerInput.getResponseBuilder()
      .speak(t("help.reprompt"))
      .reprompt(t("help.reprompt"))
      .getResponse();
  }
}
