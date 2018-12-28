import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, getResponse, Intents } from "../utils";

@Intents("AMAZON.YesIntent")
export class AmazonYesIntentHandler extends BaseIntentHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    if (super.canHandle(handlerInput)) {
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      return !!attributes.proposedBpm;
    }

    return false;
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const bpm = attributes.proposedBpm;

    return (await getResponse(handlerInput, bpm))
      .getResponse();
  }
}
