import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";
import { BaseIntentHandler, getResponse, Intents } from "../utils";

@Intents("MetronomeIntent")
export class MetronomeIntentHandler extends BaseIntentHandler {
  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const value = (handlerInput.requestEnvelope.request as IntentRequest).intent.slots.bpm.value;
    const bpm = parseInt(value, 10);

    return (await getResponse(handlerInput, bpm))
      .getResponse();
  }
}
