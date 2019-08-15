import { BaseRequestHandler, IExtendedHandlerInput, Intents } from "@corux/ask-extensions";
import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { getResponse } from "../utils";

@Intents("AMAZON.YesIntent")
export class AmazonYesIntentHandler extends BaseRequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    if (super.canHandle(handlerInput)) {
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      return !!attributes.proposedBpm;
    }

    return false;
  }

  public async handle(handlerInput: IExtendedHandlerInput): Promise<Response> {
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const bpm = attributes.proposedBpm;

    return (await getResponse(handlerInput, bpm))
      .getResponse();
  }
}
