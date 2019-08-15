import { BaseRequestHandler, IExtendedHandlerInput, Intents } from "@corux/ask-extensions";
import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { getBpmFromRequest } from "../utils";

@Intents("InfoIntent")
export class InfoIntentHandler extends BaseRequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const bpm = getBpmFromRequest(handlerInput);
    return super.canHandle(handlerInput) && !!bpm;
  }

  public async handle(handlerInput: IExtendedHandlerInput): Promise<Response> {
    const t: any = handlerInput.t;
    const bpm = getBpmFromRequest(handlerInput);
    return handlerInput.getResponseBuilder()
      .speak(t("info", bpm))
      .withShouldEndSession(true)
      .getResponse();
  }
}
