import { IExtendedHandlerInput } from "@corux/ask-extensions";
import { HandlerInput, ResponseBuilder } from "ask-sdk-core";
import * as AWS from "aws-sdk";

export const supportedBpm: number[] = [];

export async function getAvailableBpm(): Promise<number[]> {
  if (!supportedBpm.length) {
    const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
    const result = await s3.listObjectsV2({
      Bucket: "alexa-metronome-skill",
      Prefix: "audio/",
    }).promise();
    supportedBpm.push(...result.Contents
      .filter((item) => item.Key.endsWith(".mp3"))
      .map((item) => item.Key.substring(item.Key.lastIndexOf("/") + 1, item.Key.lastIndexOf(".")))
      .map((item) => parseInt(item, 10)));
  }

  return supportedBpm;
}

async function isBpmSupported(bpm: number): Promise<boolean> {
  const bpms = await getAvailableBpm();
  return bpms.indexOf(bpm) !== -1;
}

export function getLink(bpm: number): string {
  return `https://s3-eu-west-1.amazonaws.com/alexa-metronome-skill/audio/${bpm}.mp3`;
}

async function getClosestBpm(bpm: number): Promise<number> {
  const bpms = await getAvailableBpm();
  bpms.sort((a, b) => Math.abs(a - bpm) - Math.abs(b - bpm));
  return bpms[0];
}

export async function getResponse(handlerInput: IExtendedHandlerInput, bpm: number): Promise<ResponseBuilder> {
  const t = handlerInput.t;

  if (!await isBpmSupported(bpm)) {
    const reprompt = t("help.reprompt");
    if (bpm > 0) {
      const proposedBpm = await getClosestBpm(bpm);
      const attributes = handlerInput.attributesManager.getSessionAttributes();
      attributes.proposedBpm = proposedBpm;
      console.log(`Unsupported BPM ${bpm} redirected to ${proposedBpm}.`);

      return handlerInput.responseBuilder
        .speak(`${t("play.redirect", { requested: bpm, suggested: proposedBpm })}`)
        .reprompt(reprompt);
    } else {
      return handlerInput.responseBuilder
        .speak(`${t("play.unsupported")} ${reprompt}`)
        .reprompt(reprompt);
    }
  }

  let builder = handlerInput.responseBuilder;
  if (!handlerInput.requestEnvelope.request.type.startsWith("PlaybackController")) {
    builder = builder.speak(t("play.started", { bpm }));
  }

  return builder
    .addAudioPlayerPlayDirective("REPLACE_ALL", getLink(bpm), `${bpm}`, 0, undefined, {
      title: `${bpm} bpm`,
    })
    .withShouldEndSession(true);
}

export function getBpmFromRequest(handlerInput: HandlerInput): number {
  if (handlerInput.requestEnvelope.context.AudioPlayer) {
    const token = handlerInput.requestEnvelope.context.AudioPlayer.token;
    const bpm = parseInt(token, 10);
    if (bpm > 0) {
      return bpm;
    }
  }

  return undefined;
}

const recommendedBpmList = [
  70, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120,
];

export async function getFasterBpm(bpm: number): Promise<number> {
  const next = recommendedBpmList.filter((item) => item > bpm);
  let nextBpm = bpm + 10;
  if (next.length) {
    nextBpm = Math.min(nextBpm, next[0]);
  }

  return await getClosestBpm(nextBpm);
}

export async function getSlowerBpm(bpm: number): Promise<number> {
  const next = recommendedBpmList.filter((item) => item < bpm).reverse();
  let nextBpm = bpm - 10;
  if (next.length) {
    nextBpm = Math.max(nextBpm, next[0]);
  }

  return await getClosestBpm(nextBpm);
}
