import { SkillBuilders } from "ask-sdk-core";
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
    SessionEndedHandler,
    SlowerIntentHandler,
} from "./handlers";
import { LocalizationInterceptor, LogInterceptor } from "./interceptors";

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
        new LocalizationInterceptor(),
    )
    .addResponseInterceptors(
        new LogInterceptor(),
    )
    .lambda();
