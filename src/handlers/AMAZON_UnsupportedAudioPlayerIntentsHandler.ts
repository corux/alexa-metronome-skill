import { BaseRequestHandler, IExtendedHandlerInput, Intents } from "@corux/ask-extensions";
import { Response } from "ask-sdk-model";

@Intents("AMAZON.LoopOffIntent",
  "AMAZON.LoopOnIntent",
  "AMAZON.RepeatIntent",
  "AMAZON.ShuffleOffIntent",
  "AMAZON.ShuffleOnIntent")
export class AmazonUnsupportedAudioPlayerIntentsHandler extends BaseRequestHandler {
  public handle(handlerInput: IExtendedHandlerInput): Response {
    const t = handlerInput.t;
    return handlerInput.getResponseBuilder()
      .speak(t("unsupported"))
      .withShouldEndSession(true)
      .getResponse();
  }
}
