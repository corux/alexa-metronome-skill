import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, getBpmFromRequest, getResponse, Intents } from "../utils";

@Intents("AMAZON.StartOverIntent", "AMAZON.ResumeIntent")
export class AmazonResumeIntentHandler extends BaseIntentHandler {
  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const bpm = getBpmFromRequest(handlerInput);

    if (bpm) {
      return (await getResponse(handlerInput, bpm))
        .getResponse();
    }

    return handlerInput.responseBuilder
      .speak("Es gibt nichts fortzusetzen. Wieviele Schläge pro Minute sollen gespielt werden?")
      .reprompt("Wieviele Schläge pro Minute sollen gespielt werden?")
      .getResponse();
  }
}
