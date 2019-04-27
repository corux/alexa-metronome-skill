import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, getBpmFromRequest, Intents } from "../utils";

@Intents("InfoIntent")
export class InfoIntentHandler extends BaseIntentHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const bpm = getBpmFromRequest(handlerInput);
    return super.canHandle(handlerInput) && !!bpm;
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const t = handlerInput.attributesManager.getRequestAttributes().t;
    const bpm = getBpmFromRequest(handlerInput);
    return handlerInput.responseBuilder
      .speak(t("info", bpm))
      .withShouldEndSession(true)
      .getResponse();
  }
}
