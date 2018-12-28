import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, getAvailableBpm, Intents } from "../utils";

@Intents("AMAZON.HelpIntent")
export class AmazonHelpIntentHandler extends BaseIntentHandler {
  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const bpms = await getAvailableBpm();
    const helpText = `Das Metronom kann zwischen ${Math.min(...bpms)} und ${Math.max(...bpms)}
      Schläge pro Minute abspielen. Wieviele Schläge pro Minute sollen gespielt werden?`;

    return handlerInput.responseBuilder
      .speak(helpText)
      .reprompt("Wieviele Schläge pro Minute sollen gespielt werden?")
      .getResponse();
  }
}
