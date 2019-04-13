import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, getBpmFromRequest, getResponse, getSlowerBpm, Intents } from "../utils";

@Intents("SlowerIntent", "AMAZON.PreviousIntent")
export class SlowerIntentHandler extends BaseIntentHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const bpm = getBpmFromRequest(handlerInput);
    return super.canHandle(handlerInput) && !!bpm;
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const bpm = getBpmFromRequest(handlerInput);
    const nextBpm = await getSlowerBpm(bpm);
    return (await getResponse(handlerInput, nextBpm))
      .speak(`Verringere auf ${nextBpm} Schläge.`)
      .getResponse();
  }
}
