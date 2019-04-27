import { VirtualAlexa } from "virtual-alexa";
import { handler } from "../src";

describe("InfoIntent", () => {
  let alexa: VirtualAlexa;
  beforeEach(() => {
    alexa = VirtualAlexa.Builder()
      .handler(handler)
      .interactionModelFile("models/de-DE.json")
      .create();
  });

  it("Provide currently playing bpm", async () => {
    await alexa.intend("MetronomeIntent", { bpm: "80" });

    const result: any = await alexa.intend("InfoIntent");
    expect(result.response.outputSpeech.ssml).toContain("Aktuell werden 80 Schläge pro Minute gespielt");
    expect(result.response.shouldEndSession).toBe(true);
  });
});
