import { Composition } from "remotion";
import { EducareIntro } from "./EducareIntro";
import { EducareVSL } from "./EducareVSL";
import { FPS, totalDurationInFrames } from "./narration";
import { CrmVSL } from "./crm/CrmVSL";
import {
  FPS as CRM_FPS,
  totalDurationInFrames as crmDuration,
} from "./crm/script";

import { BookedVideo } from "./booked/BookedVideo";
import { FPS as BK_FPS, totalDurationInFrames as bkDuration } from "./booked/script";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full narrated VSL — 16:9, synced to per-scene voiceover */}
      <Composition
        id="EducareVSL"
        component={EducareVSL}
        durationInFrames={totalDurationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Educare CRM VSL — 16:9, 12 scenes, screenshot-driven */}
      <Composition
        id="CrmVSL"
        component={CrmVSL}
        durationInFrames={crmDuration}
        fps={CRM_FPS}
        width={1920}
        height={1080}
        defaultProps={{ hasAudio: true, hasMusic: false }}
      />

      {/* /booked explainer — 16:9, 9 scenes, Zoe voiceover */}
      <Composition id="BookedVideo" component={BookedVideo} durationInFrames={bkDuration} fps={BK_FPS} width={1920} height={1080} />

      {/* Short branded intro — vertical 9:16 */}
      <Composition
        id="EducareIntro"
        component={EducareIntro}
        durationInFrames={12 * 30}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          headline: "We fill your programs to capacity in 90 days",
          subhead: "Done-for-you enrollment marketing for childcare & education",
          cta: "And we work for free until you get results",
        }}
      />
    </>
  );
};
