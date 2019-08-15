import { BaseRequestHandler, IExtendedHandlerInput, Intents, Request } from "@corux/ask-extensions";
import { Response } from "ask-sdk-model";
import { getBpmFromRequest, getResponse } from "../utils";

@Request("PlaybackController.PlayCommandIssued")
@Intents("AMAZON.StartOverIntent", "AMAZON.ResumeIntent")
export class AmazonResumeIntentHandler extends BaseRequestHandler {
  public async handle(handlerInput: IExtendedHandlerInput): Promise<Response> {
    const t = handlerInput.t;
    const bpm = getBpmFromRequest(handlerInput);

    if (bpm) {
      return (await getResponse(handlerInput, bpm))
        .getResponse();
    }

    // Only occurs, if "resume" is requested while skill session is open and playback has not started
    return handlerInput.getResponseBuilder()
      .speak(`${t("resume.text")} ${t("help.reprompt")}`)
      .reprompt(t("help.reprompt"))
      .getResponse();
  }
}
