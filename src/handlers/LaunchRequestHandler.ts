import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export class LaunchRequestHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;

    return request.type === "LaunchRequest" ||
      (request.type === "IntentRequest"
        && [
          "FasterIntent",
          "SlowerIntent",
          "InfoIntent",
          "AMAZON.YesIntent",
        ].indexOf(request.intent.name) !== -1);
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const responseBuilder = handlerInput.responseBuilder;

    return responseBuilder
      .speak("Bitte wähle ein Tempo.")
      .reprompt("Wieviele Schläge pro Minute sollen gespielt werden?")
      .withShouldEndSession(false)
      .getResponse();
  }
}
