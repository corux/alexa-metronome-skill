import { BaseRequestHandler, IExtendedHandlerInput, Intents, Request } from "@corux/ask-extensions";
import { Response } from "ask-sdk-model";

@Request("PlaybackController.PauseCommandIssued")
@Intents("AMAZON.CancelIntent", "AMAZON.StopIntent", "AMAZON.PauseIntent")
export class AmazonStopIntentHandler extends BaseRequestHandler {
  public handle(handlerInput: IExtendedHandlerInput): Response {
    let builder = handlerInput.getResponseBuilder();
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
