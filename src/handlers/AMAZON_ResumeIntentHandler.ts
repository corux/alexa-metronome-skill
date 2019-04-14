import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, getBpmFromRequest, getResponse, Intents, Request } from "../utils";

@Request("PlaybackController.PlayCommandIssued")
@Intents("AMAZON.StartOverIntent", "AMAZON.ResumeIntent")
export class AmazonResumeIntentHandler extends BaseIntentHandler {
  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const bpm = getBpmFromRequest(handlerInput);

    if (bpm) {
      return (await getResponse(handlerInput, bpm))
        .getResponse();
    }

    // Only occurs, if "resume" is requested while skill session is open and playback has not started
    return handlerInput.responseBuilder
      .speak("Es gibt nichts fortzusetzen. Wieviele Schläge pro Minute sollen gespielt werden?")
      .reprompt("Wieviele Schläge pro Minute sollen gespielt werden?")
      .getResponse();
  }
}
