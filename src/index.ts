import { LocalizationInterceptor, LogInterceptor, SessionEndedHandler } from "@corux/ask-extensions";
import { SkillBuilders } from "ask-sdk-core";
import * as path from "path";
import {
    AmazonHelpIntentHandler,
    AmazonResumeIntentHandler,
    AmazonStopIntentHandler,
    AmazonUnsupportedAudioPlayerIntentsHandler,
    AmazonYesIntentHandler,
    AudioPlayerPlaybackNearlyFinishedHandler,
    AudioPlayerUnsupportedHandler,
    CustomErrorHandler,
    FasterIntentHandler,
    InfoIntentHandler,
    LaunchRequestHandler,
    MetronomeIntentHandler,
    SlowerIntentHandler,
} from "./handlers";

export const handler = SkillBuilders.custom()
    .addRequestHandlers(
        new AudioPlayerPlaybackNearlyFinishedHandler(),
        new AudioPlayerUnsupportedHandler(),
        new AmazonUnsupportedAudioPlayerIntentsHandler(),
        new AmazonStopIntentHandler(),
        new AmazonResumeIntentHandler(),
        new AmazonHelpIntentHandler(),
        new AmazonYesIntentHandler(),
        new FasterIntentHandler(),
        new SlowerIntentHandler(),
        new MetronomeIntentHandler(),
        new InfoIntentHandler(),
        new LaunchRequestHandler(),
        new SessionEndedHandler(),
    )
    .addErrorHandlers(
        new CustomErrorHandler(),
    )
    .addRequestInterceptors(
        new LogInterceptor(),
        new LocalizationInterceptor(path.join(__dirname, "i18n/{{lng}}.json")),
    )
    .addResponseInterceptors(
        new LogInterceptor(),
    )
    .lambda();
