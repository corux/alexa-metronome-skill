import { VirtualAlexa } from "virtual-alexa";
import { handler } from "../src";

describe("Integration", () => {
  let alexa: VirtualAlexa;
  beforeEach(() => {
    alexa = VirtualAlexa.Builder()
      .handler(handler)
      .interactionModelFile("models/de-DE.json")
      .create();
    alexa.context().device().audioPlayerSupported(true);
    alexa.filter((requestJSON) => {
      requestJSON.request.locale = "de-DE";
    });
  });

  test("Start metronome: unsupported bpm", async () => {
    let result = await alexa.launch();
    expect(result.response.outputSpeech.ssml).toContain("Wieviele Schläge pro Minute sollen gespielt werden?");
    expect(result.response.shouldEndSession).toBe(false);

    result = await alexa.intend("MetronomeIntent", { bpm: "10" });
    expect(result.response.outputSpeech.ssml).toContain("Das Tempo 10 wird noch nicht unterstützt.");
    expect(result.response.outputSpeech.ssml).toContain("Möchtest du stattdessen 30 verwenden?");
    expect(result.response.shouldEndSession).toBe(false);

    result = await alexa.intend("AMAZON.YesIntent");
    expect(result.response.outputSpeech.ssml).toContain("Metronom mit 30 Schlägen pro Minute wird gestartet.");
    expect(alexa.audioPlayer().isPlaying()).toBe(true);

    result = await alexa.intend("MetronomeIntent", { bpm: "80" });
    expect(result.response.outputSpeech.ssml).toContain("Metronom mit 80 Schlägen pro Minute wird gestartet.");
    expect(result.response.shouldEndSession).toBe(true);
    expect(alexa.audioPlayer().isPlaying()).toBe(true);
  });

  test("Start metronome: pause and resume", async () => {
    let result = await alexa.launch();
    expect(result.response.outputSpeech.ssml).toContain("Wieviele Schläge pro Minute sollen gespielt werden?");
    expect(result.response.shouldEndSession).toBe(false);

    result = await alexa.intend("MetronomeIntent", { bpm: "80" });
    expect(result.response.outputSpeech.ssml).toContain("Metronom mit 80 Schlägen pro Minute wird gestartet.");
    expect(result.response.shouldEndSession).toBe(true);
    expect(alexa.audioPlayer().isPlaying()).toBe(true);

    result = await alexa.intend("AMAZON.PauseIntent");
    expect(result.response.shouldEndSession).toBe(true);
    expect(alexa.audioPlayer().isPlaying()).toBe(false);

    result = await alexa.intend("AMAZON.ResumeIntent");
    expect(result.response.shouldEndSession).toBe(true);
    expect(alexa.audioPlayer().isPlaying()).toBe(true);
  });

  test("Start metronome: increase and decrease", async () => {
    let result = await alexa.launch();
    expect(result.response.outputSpeech.ssml).toContain("Wieviele Schläge pro Minute sollen gespielt werden?");
    expect(result.response.shouldEndSession).toBe(false);

    result = await alexa.intend("MetronomeIntent", { bpm: "80" });
    expect(result.response.outputSpeech.ssml).toContain("Metronom mit 80 Schlägen pro Minute wird gestartet.");
    expect(result.response.shouldEndSession).toBe(true);
    expect(alexa.audioPlayer().isPlaying()).toBe(true);

    result = await alexa.intend("FasterIntent");
    expect(result.response.outputSpeech.ssml).toContain("Erhöhe auf 84.");
    expect(result.response.shouldEndSession).toBe(true);
    expect(alexa.audioPlayer().isPlaying()).toBe(true);

    result = await alexa.intend("SlowerIntent");
    expect(result.response.outputSpeech.ssml).toContain("Verringere auf 80.");
    expect(result.response.shouldEndSession).toBe(true);
    expect(alexa.audioPlayer().isPlaying()).toBe(true);

    result = await alexa.intend("AMAZON.NextIntent");
    expect(result.response.outputSpeech.ssml).toContain("Erhöhe auf 84.");
    expect(result.response.shouldEndSession).toBe(true);
    expect(alexa.audioPlayer().isPlaying()).toBe(true);

    result = await alexa.intend("AMAZON.PreviousIntent");
    expect(result.response.outputSpeech.ssml).toContain("Verringere auf 80.");
    expect(result.response.shouldEndSession).toBe(true);
    expect(alexa.audioPlayer().isPlaying()).toBe(true);

    result = await alexa.intend("AMAZON.StopIntent");
    expect(alexa.audioPlayer().isPlaying()).toBe(false);
    expect(result.response.shouldEndSession).toBe(true);
  });
});
