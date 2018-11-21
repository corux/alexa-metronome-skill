import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { getBpmFromRequest, getLink } from "../utils";

export class AudioPlayerPlaybackNearlyFinishedHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "AudioPlayer.PlaybackNearlyFinished";
  }

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
