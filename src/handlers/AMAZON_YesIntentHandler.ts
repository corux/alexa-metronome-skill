import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { getResponse } from "../utils";

export class AmazonYesIntentHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    const attributes = handlerInput.attributesManager.getSessionAttributes();

    return request.type === "IntentRequest" && request.intent.name === "AMAZON.YesIntent"
      && attributes.proposedBpm;
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const bpm = attributes.proposedBpm;

    return (await getResponse(handlerInput, bpm))
      .getResponse();
  }
}
