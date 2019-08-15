import { BaseRequestHandler, IExtendedHandlerInput, Intents, Request } from "@corux/ask-extensions";
import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { getBpmFromRequest, getResponse, getSlowerBpm } from "../utils";

@Request("PlaybackController.PreviousCommandIssued")
@Intents("SlowerIntent", "AMAZON.PreviousIntent")
export class SlowerIntentHandler extends BaseRequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const bpm = getBpmFromRequest(handlerInput);
    return super.canHandle(handlerInput) && !!bpm;
  }

  public async handle(handlerInput: IExtendedHandlerInput): Promise<Response> {
    const t: any = handlerInput.t;
    const bpm = getBpmFromRequest(handlerInput);
    const nextBpm = await getSlowerBpm(bpm);

    let builder = (await getResponse(handlerInput, nextBpm));
    if (!handlerInput.requestEnvelope.request.type.startsWith("PlaybackController")) {
      builder = builder.speak(t("play.slower", nextBpm));
    }

    return builder.getResponse();
  }
}
