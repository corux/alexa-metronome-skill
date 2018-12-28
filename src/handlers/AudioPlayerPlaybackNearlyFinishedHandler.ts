import { HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { BaseIntentHandler, getBpmFromRequest, getLink, Request } from "../utils";

@Request("AudioPlayer.PlaybackNearlyFinished")
export class AudioPlayerPlaybackNearlyFinishedHandler extends BaseIntentHandler {
  public handle(handlerInput: HandlerInput): Response {
    const bpm = getBpmFromRequest(handlerInput);

    return handlerInput.responseBuilder
      .addAudioPlayerPlayDirective("ENQUEUE", getLink(bpm), `${bpm}`, 0, `${bpm}`, {
        title: `${bpm} bpm`,
      })
      .withShouldEndSession(true)
      .getResponse();
  }
}
