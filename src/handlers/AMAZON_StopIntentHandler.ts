import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, Intents, Request } from "../utils";

@Request("PlaybackController.PauseCommandIssued")
@Intents("AMAZON.CancelIntent", "AMAZON.StopIntent", "AMAZON.PauseIntent")
export class AmazonStopIntentHandler extends BaseIntentHandler {
  public handle(handlerInput: HandlerInput): Response {
    let builder = handlerInput.responseBuilder;
    const audioPlayer = handlerInput.requestEnvelope.context.AudioPlayer;
    const isMetronomePlaying = audioPlayer && audioPlayer.token;
    if (isMetronomePlaying) {
      builder = builder.addAudioPlayerStopDirective();
    }

    return builder
      .withShouldEndSession(true)
      .getResponse();
  }
}
