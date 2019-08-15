import { BaseRequestHandler, IExtendedHandlerInput, Request } from "@corux/ask-extensions";
import { Response } from "ask-sdk-model";
import { getBpmFromRequest, getLink } from "../utils";

@Request("AudioPlayer.PlaybackNearlyFinished")
export class AudioPlayerPlaybackNearlyFinishedHandler extends BaseRequestHandler {
  public handle(handlerInput: IExtendedHandlerInput): Response {
    const bpm = getBpmFromRequest(handlerInput);

    return handlerInput.getResponseBuilder()
      .addAudioPlayerPlayDirective("ENQUEUE", getLink(bpm), `${bpm}`, 0, `${bpm}`, {
        title: `${bpm} bpm`,
      })
      .withShouldEndSession(true)
      .getResponse();
  }
}
