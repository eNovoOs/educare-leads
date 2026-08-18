import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { scenes } from "./script";
import { AvatarBubble } from "./AvatarBubble";
import { MusicBed } from "./MusicBed";
import {
  S01Hook,
  S02Agitate,
  S03Cost,
  S04Reframe,
  S05Inbox,
  S06Ai,
  S07Pipeline,
  S08Marketing,
  S09Savings,
  S10Specialist,
  S11Offer,
  S12Cta,
} from "./scenes";

const components: Record<string, React.FC> = {
  s01_hook: S01Hook,
  s02_agitate: S02Agitate,
  s03_cost: S03Cost,
  s04_reframe: S04Reframe,
  s05_inbox: S05Inbox,
  s06_ai: S06Ai,
  s07_pipeline: S07Pipeline,
  s08_marketing: S08Marketing,
  s09_savings: S09Savings,
  s10_specialist: S10Specialist,
  s11_offer: S11Offer,
  s12_cta: S12Cta,
};

/**
 * Educare CRM VSL.
 *
 * Each scene owns its own voiceover file (public/vo/crm/<id>.mp3) so scenes
 * stay independently re-recordable — change one line of the script and only
 * that scene's audio needs regenerating.
 *
 * `hasAudio` is false until the Higgsfield voiceover is generated; the
 * composition previews silently with estimated durations until then.
 */
export const CrmVSL: React.FC<{
  hasAudio?: boolean;
  /** Enable once a licensed track exists at public/vsl/music-bed.mp3 */
  hasMusic?: boolean;
}> = ({ hasAudio = false, hasMusic = false }) => (
  <AbsoluteFill style={{ backgroundColor: "#071a37" }}>
    {/* Music sits outside the scene sequences so it plays unbroken across cuts */}
    {hasMusic && <MusicBed />}

    {scenes.map((s) => {
      const Scene = components[s.id];
      return (
        <Sequence
          key={s.id}
          from={s.startFrame}
          durationInFrames={s.durationInFrames}
          name={s.id}
        >
          <Scene />
          {hasAudio && (
            <>
              <Audio src={staticFile(`vo/crm/${s.id}.mp3`)} />
              <AvatarBubble audioSrc={`vo/crm/${s.id}.mp3`} />
            </>
          )}
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
