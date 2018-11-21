import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { getBpmFromRequest, getResponse, getSlowerBpm } from "../utils";

export class SlowerIntentHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    const bpm = getBpmFromRequest(handlerInput);

    return request.type === "IntentRequest" && request.intent.name === "SlowerIntent" && !!bpm;
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const bpm = getBpmFromRequest(handlerInput);
    const nextBpm = await getSlowerBpm(bpm);
    return (await getResponse(handlerInput, nextBpm))
      .speak(`Verringere auf ${nextBpm} Schläge.`)
      .getResponse();
  }
}
