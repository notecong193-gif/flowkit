import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {FlowKitVideoProps, FlowKitScene} from './types';

const Scene: React.FC<{scene: FlowKitScene; durationInFrames: number; transitionFrames: number}> = ({
  scene,
  durationInFrames,
  transitionFrames,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const fade = Math.min(transitionFrames, Math.floor(durationInFrames / 2));
  const opacity = fade <= 0 ? 1 : Math.min(
    interpolate(frame, [0, fade], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    interpolate(frame, [Math.max(0, durationInFrames - fade), durationInFrames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  );

  return (
    <AbsoluteFill style={{opacity}}>
      <OffthreadVideo
        src={scene.src}
        startFrom={Math.max(0, Math.round((scene.startFromSeconds ?? 0) * fps))}
        volume={scene.volume ?? 1}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    </AbsoluteFill>
  );
};

export const FlowKitVideo: React.FC<FlowKitVideoProps> = ({
  scenes,
  transitionFrames = 8,
  backgroundColor = '#000000',
}) => {
  const {fps} = useVideoConfig();
  let cursor = 0;

  return (
    <AbsoluteFill style={{backgroundColor}}>
      {scenes.map((scene, index) => {
        const durationInFrames = Math.max(1, Math.round(scene.durationInSeconds * fps));
        const from = cursor;
        cursor += durationInFrames;
        return (
          <Sequence key={`${scene.src}-${index}`} from={from} durationInFrames={durationInFrames}>
            <Scene scene={scene} durationInFrames={durationInFrames} transitionFrames={transitionFrames} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
