import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, getBpmFromRequest, getFasterBpm, getResponse, Intents, Request } from "../utils";

@Request("PlaybackController.NextCommandIssued")
@Intents("FasterIntent", "AMAZON.NextIntent")
export class FasterIntentHandler extends BaseIntentHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const bpm = getBpmFromRequest(handlerInput);
    return super.canHandle(handlerInput) && !!bpm;
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const t = handlerInput.attributesManager.getRequestAttributes().t;
    const bpm = getBpmFromRequest(handlerInput);
    const nextBpm = await getFasterBpm(bpm);

    let builder = (await getResponse(handlerInput, nextBpm));
    if (!handlerInput.requestEnvelope.request.type.startsWith("PlaybackController")) {
      builder = builder.speak(t("play.faster", nextBpm));
    }

    return builder.getResponse();
  }
}
