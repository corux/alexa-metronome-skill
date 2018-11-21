import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { getBpmFromRequest, getResponse } from "../utils";

export class AmazonResumeIntentHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;

    return request.type === "IntentRequest" &&
      [
        "AMAZON.StartOverIntent",
        "AMAZON.ResumeIntent",
        "AMAZON.NextIntent",
      ].indexOf(request.intent.name) !== -1;
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const bpm = getBpmFromRequest(handlerInput);

    if (bpm) {
      return (await getResponse(handlerInput, bpm))
        .getResponse();
    }

    return handlerInput.responseBuilder
      .speak("Es gibt nichts fortzusetzen. Bitte wähle ein Tempo.")
      .reprompt("Wähle ein Tempo")
      .withShouldEndSession(false)
      .getResponse();
  }
}
