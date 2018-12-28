import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, getBpmFromRequest, getFasterBpm, getResponse, Intents } from "../utils";

@Intents("FasterIntent")
export class FasterIntentHandler extends BaseIntentHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const bpm = getBpmFromRequest(handlerInput);
    return super.canHandle(handlerInput) && !!bpm;
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const bpm = getBpmFromRequest(handlerInput);
    const nextBpm = await getFasterBpm(bpm);
    return (await getResponse(handlerInput, nextBpm))
      .speak(`Erhöhe auf ${nextBpm} Schläge.`)
      .getResponse();
  }
}
