import { HandlerInput, ResponseBuilder } from "ask-sdk-core";
import * as AWS from "aws-sdk";

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const supportedBpm: number[] = [];

export async function getAvailableBpm(): Promise<number[]> {
  if (!supportedBpm.length) {
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

export async function isBpmSupported(bpm: number): Promise<boolean> {
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

export async function getResponse(handlerInput: HandlerInput, bpm: number): Promise<ResponseBuilder> {
  const attributes = handlerInput.attributesManager.getSessionAttributes();

  if (!await isBpmSupported(bpm)) {
    const proposedBpm = await getClosestBpm(bpm);
    attributes.proposedBpm = proposedBpm;
    console.log(`Unsupported BPM ${bpm} redirected to ${proposedBpm}.`);
    return handlerInput.responseBuilder
      .speak(`Das Tempo ${bpm} wird noch nicht unterstützt.
        Möchtest du stattdessen ${proposedBpm} verwenden?`)
      .reprompt("Wieviele Schläge pro Minute sollen gespielt werden?")
      .withShouldEndSession(false);
  }

  attributes.bpm = bpm;

  return handlerInput.responseBuilder
    .speak(`Metronom mit ${bpm} Schlägen pro Minute wird gestartet.`)
    .addAudioPlayerPlayDirective("REPLACE_ALL", getLink(bpm), `${bpm}`, 0, undefined, {
      title: `${bpm} bpm`,
    })
    .withShouldEndSession(true);
}

export function getBpmFromRequest(handlerInput: HandlerInput): number {
  if (handlerInput.requestEnvelope.session) {
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    if (attributes.bpm) {
      return attributes.bpm;
    }
  }
  if (handlerInput.requestEnvelope.context.AudioPlayer) {
    const token = handlerInput.requestEnvelope.context.AudioPlayer.token;
    return parseInt(token, 10);
  }

  return undefined;
}

const recommendedBpmList = [
  70, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120,
];

export async function getFasterBpm(bpm: number): Promise<number> {
  const next = recommendedBpmList.filter((item) => item > bpm).sort();
  if (next.length) {
    return next[0];
  }

  return await getClosestBpm(bpm + 5);
}

export async function getSlowerBpm(bpm: number): Promise<number> {
  const next = recommendedBpmList.filter((item) => item < bpm).sort().reverse();
  if (next.length) {
    return next[0];
  }

  return await getClosestBpm(bpm - 5);
}
