import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { getAvailableBpm } from "../utils";

export class AmazonHelpIntentHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest" && request.intent.name === "AMAZON.HelpIntent";
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const bpms = await getAvailableBpm();
    const helpText = `Das Metronom kann zwischen ${Math.min(...bpms)} und ${Math.max(...bpms)}
      Schläge pro Minute abspielen. Nenne mir dazu einfach das gewünschte Tempo.`;

    return handlerInput.responseBuilder
      .speak(helpText)
      .reprompt("Bitte wähle ein Tempo")
      .withShouldEndSession(false)
      .getResponse();
  }
}
