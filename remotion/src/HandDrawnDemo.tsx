import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const InkLine: React.FC<{d: string; delay?: number; width?: number}> = ({d, delay = 0, width = 7}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <path d={d} fill="none" stroke="#171717" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-progress}/>;
};

const Write: React.FC<{children: React.ReactNode; delay?: number; style?: React.CSSProperties}> = ({children, delay=0, style}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  const p=spring({frame:frame-delay,fps,config:{damping:18}});
  return <div style={{opacity:p,transform:`translateY(${(1-p)*18}px) rotate(${(1-p)*-1.5}deg)`,...style}}>{children}</div>;
};

const Board: React.FC = () => {
  const frame=useCurrentFrame();
  const pulse=1+Math.sin(frame/8)*0.025;
  return <AbsoluteFill style={{backgroundColor:'#fffdf5',fontFamily:'Comic Sans MS, Chalkboard, cursive',color:'#171717'}}>
    <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <InkLine d="M160 215 C430 175 690 190 925 215" delay={4}/>
      <InkLine d="M350 510 C520 430 680 430 825 510" delay={100}/>
      <InkLine d="M1090 510 C1250 430 1420 430 1570 510" delay={145}/>
      <InkLine d="M825 510 C930 590 1010 590 1090 510" delay={190}/>
      <InkLine d="M960 635 C960 710 960 750 960 820" delay={220}/>
      <circle cx="960" cy="525" r="110" fill="none" stroke="#171717" strokeWidth="7" strokeDasharray="8 11" style={{transformOrigin:'960px 525px',transform:`scale(${pulse})`}}/>
      <InkLine d="M900 520 q60 -80 120 0 q-60 85 -120 0" delay={60}/>
      <InkLine d="M915 500 l-30 -38 M1005 500 l30 -38 M925 550 q35 28 70 0" delay={76}/>
      <InkLine d="M885 820 q75 -70 150 0 q-15 120 -75 145 q-60 -25 -75 -145" delay={240}/>
      <InkLine d="M925 850 l35 35 l55 -75" delay={260} width={9}/>
    </svg>
    <Write delay={0} style={{position:'absolute',left:170,top:95,fontSize:76,fontWeight:700}}>AI Agent hoạt động thế nào?</Write>
    <Write delay={35} style={{position:'absolute',left:760,top:350,fontSize:46,fontWeight:700}}>AI AGENT</Write>
    <Write delay={105} style={{position:'absolute',left:270,top:535,fontSize:42}}>1. Nhận mục tiêu</Write>
    <Write delay={150} style={{position:'absolute',left:1260,top:535,fontSize:42}}>2. Lập kế hoạch</Write>
    <Write delay={195} style={{position:'absolute',left:780,top:690,fontSize:42}}>3. Dùng công cụ</Write>
    <Write delay={270} style={{position:'absolute',left:690,top:950,fontSize:44,fontWeight:700}}>Quan sát → Suy nghĩ → Hành động → Lặp lại</Write>
  </AbsoluteFill>;
};

const Ending: React.FC=()=> <AbsoluteFill style={{backgroundColor:'#fffdf5',alignItems:'center',justifyContent:'center',fontFamily:'Comic Sans MS, Chalkboard, cursive'}}><Write style={{fontSize:78,fontWeight:700,textAlign:'center'}}>AI Agent = AI biết tự hoàn thành công việc ✍️</Write></AbsoluteFill>;

export const HandDrawnDemo: React.FC=()=> <AbsoluteFill><Sequence durationInFrames={780}><Board/></Sequence><Sequence from={780} durationInFrames={120}><Ending/></Sequence></AbsoluteFill>;
