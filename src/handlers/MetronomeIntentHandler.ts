import { BaseRequestHandler, IExtendedHandlerInput, Intents } from "@corux/ask-extensions";
import { IntentRequest, Response } from "ask-sdk-model";
import { getResponse } from "../utils";

@Intents("MetronomeIntent")
export class MetronomeIntentHandler extends BaseRequestHandler {
  public async handle(handlerInput: IExtendedHandlerInput): Promise<Response> {
    const value = (handlerInput.requestEnvelope.request as IntentRequest).intent.slots.bpm.value;
    const bpm = parseInt(value, 10);

    return (await getResponse(handlerInput, bpm))
      .getResponse();
  }
}
