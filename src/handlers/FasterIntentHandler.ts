import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { getBpmFromRequest, getFasterBpm, getResponse } from "../utils";

export class FasterIntentHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    const bpm = getBpmFromRequest(handlerInput);

    return request.type === "IntentRequest" && request.intent.name === "FasterIntent" && !!bpm;
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const bpm = getBpmFromRequest(handlerInput);
    const nextBpm = await getFasterBpm(bpm);
    return (await getResponse(handlerInput, nextBpm))
      .speak(`Erhöhe auf ${nextBpm} Schläge.`)
      .getResponse();
  }
}
