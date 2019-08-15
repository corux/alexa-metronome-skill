import { BaseRequestHandler, IExtendedHandlerInput, Intents, Request } from "@corux/ask-extensions";
import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { getBpmFromRequest, getFasterBpm, getResponse } from "../utils";

@Request("PlaybackController.NextCommandIssued")
@Intents("FasterIntent", "AMAZON.NextIntent")
export class FasterIntentHandler extends BaseRequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const bpm = getBpmFromRequest(handlerInput);
    return super.canHandle(handlerInput) && !!bpm;
  }

  public async handle(handlerInput: IExtendedHandlerInput): Promise<Response> {
    const t: any = handlerInput.t;
    const bpm = getBpmFromRequest(handlerInput);
    const nextBpm = await getFasterBpm(bpm);

    let builder = (await getResponse(handlerInput, nextBpm));
    if (!handlerInput.requestEnvelope.request.type.startsWith("PlaybackController")) {
      builder = builder.speak(t("play.faster", nextBpm));
    }

    return builder.getResponse();
  }
}
