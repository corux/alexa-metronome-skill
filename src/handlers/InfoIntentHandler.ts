import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { getBpmFromRequest } from "../utils";

export class InfoIntentHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    const bpm = getBpmFromRequest(handlerInput);

    return request.type === "IntentRequest" && request.intent.name === "InfoIntent" && !!bpm;
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const bpm = getBpmFromRequest(handlerInput);
    return handlerInput.responseBuilder
      .speak(`Aktuell werden ${bpm} Schläge pro Minute gespielt.`)
      .withShouldEndSession(true)
      .getResponse();
  }
}
