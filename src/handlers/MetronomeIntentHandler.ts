import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";
import { getResponse } from "../utils";

export class MetronomeIntentHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest" && request.intent.name === "MetronomeIntent";
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const value = (handlerInput.requestEnvelope.request as IntentRequest).intent.slots.bpm.value;
    const bpm = parseInt(value, 10);

    return (await getResponse(handlerInput, bpm))
      .getResponse();
  }
}
