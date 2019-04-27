import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, Intents } from "../utils";

@Intents("AMAZON.LoopOffIntent",
  "AMAZON.LoopOnIntent",
  "AMAZON.RepeatIntent",
  "AMAZON.ShuffleOffIntent",
  "AMAZON.ShuffleOnIntent")
export class AmazonUnsupportedAudioPlayerIntentsHandler extends BaseIntentHandler {
  public handle(handlerInput: HandlerInput): Response {
    const t = handlerInput.attributesManager.getRequestAttributes().t;
    return handlerInput.responseBuilder
      .speak(t("unsupported"))
      .withShouldEndSession(true)
      .getResponse();
  }
}
